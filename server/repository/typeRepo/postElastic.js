const PostModule = require('../../models/elasticsearch/post')

module.exports = (sql, nodeServices) => {
    const { mongoose } = nodeServices


    function addPost(post, callback) {
        post.post_id = new mongoose.Types.ObjectId();
        post.date = formatDate(post.date);

        const newPost = new PostModule(post.user.name, post.user._id, post.post_id, post.title, post.date, post.locationLocationLat,
            post.locationLocationLng, post.text, post.img, post.tags)

        const query = {
            index: 'posts',
            routing: newPost.post_user.parent,
            id: post.post_id.toString(),
            body: newPost
        }

        sql.add(query, (success) => {
            callback(success ? newPost : undefined)
        });
    }
    function getFilterPosts(filters, callback) {
        const body = getQueryByFilters(filters)
        const query = getBaseQuery(body)
        sql.getMany(query, (posts) => {
            callback(posts ? posts : [])
        });
    }
    function getAllPosts(callback) {
        const body = {
            sort: [
                { "publishDate": { "order": "asc" } },
                "_score"
            ],
            query: {
                exists: {
                    field: 'postId'
                }
            }
        }
        const query = getBaseQuery(body)

        sql.getMany(query, (posts) => {
            callback(posts ? posts : [])
        });
    }
    function addLike(data, callback) {
        try {
            const body = {
                script: sql.createScript().scriptAppendArray('likes.users', { userId: data.userId })
                    .scriptIncrement('likes.amount', { amount: 1 }).script
            }
            const query = getBaseQuery(body, data.post.postId, '_doc')
            sql.update(query, (success) => {
                returnPostOnSuccess(success, query, sql, callback);
            });
        } catch (error) {
            console.log(error);

        }

    }
    function removeLike(data, callback) {
        try {
            const body = {
                script: sql.createScript().scriptRemove('likes.users', { userId: data.userId })
                    .scriptDecrement('likes.amount', { amount: 1 }).script
            }
            const query = getBaseQuery(body, data.post.postId, '_doc')

            sql.update(query, (success) => {
                returnPostOnSuccess(success, query, sql, callback);
            });
        } catch (error) {
            callback(undefined)
        }

    }
    return {
        getFilterPosts,
        addPost,
        getAllPosts,
        addLike,
        removeLike
    }
}

function getQueryByFilters(filters) {
    console.log(filters)
    let allFilters = [
        filters.fromFilter ? { "range": { "publishDate": { "gte": filters.fromFilter } } } : undefined,
        filters.toFilter ? { "range": { "publishDate": { "lte": filters.toFilter } } } : undefined,
        (filters.userTags && Array.isArray(filters.userTags)) ? { "match": { "tags": filters.userTags[0] } } : (filters.userTags ? { "match": { "tags": filters.userTags } } : undefined),
        (filters.imageTags && Array.isArray(filters.imageTags)) ? { "match": { "image.tags": filters.imageTags[0] } } : (filters.imageTags ? { "match": { "tags": filters.imageTags } } : undefined),
        filters.publisher ? { "has_parent": { "parent_type": 'user', "query": { "term": { "username": filters.publisher } } } } : undefined,
        (filters.location && filters.radiusFrom) ? { "geo_distance": { "distance": `${filters.radiusFrom}km`, "location": { "lat": filters.location.latitude, "lon": filters.location.longitude } } } : undefined
    ]
    allArrayFilters = addTagsQuery(filters)
    allFilters = allFilters.filter(o => o != undefined)
    allArrayFilters = allArrayFilters.filter(o => o != undefined)

    console.log(allFilters)
    return {
        "query": {
            "bool": {
                "must": allFilters.length > 0 ? allFilters : { exists: { field: 'postId' } },
                "should": allArrayFilters.length > 0 ? allArrayFilters : undefined
            }
        }
    }
}
function addTagsQuery(filters) {
    let query = []
    if (filters.userTags && Array.isArray(filters.userTags)) {
        query = query.concat(filters.userTags.map(tag => { return tag.length > 0 ? { "match": { "tags": tag } } : undefined }))
    }
    else if (filters.userTags && filters.userTags.length > 0) {
        query.push({ "match": { "tags": filters.userTags } })
    }

    if (filters.imageTags && Array.isArray(filters.imageTags)) {
        query = query.concat(filters.imageTags.map(tag => { return tag.length > 0 ? { "match": { "image.tags": tag } } : undefined }))
    }
    else if (filters.imageTags && filters.imageTags.length > 0) {
        query.push({ "match": { "image.tags": filters.imageTags } })
    }

    return query
}

function getBaseQuery(body, id = undefined, doc = undefined) {
    return {
        index: 'posts',
        id: id,
        type: doc,
        body: body
    }
}

function returnPostOnSuccess(success, query, sql, callback) {
    if (success) {
        query.body = undefined;
        sql.getOne(query, (post) => {
            callback(post);
        });
    }
    else {
        callback(undefined);
    }
}

///private methods
function formatDate(date) {
    var d = new Date(date)
    var tzoffset = (d).getTimezoneOffset() * 60000; //offset in milliseconds
    var localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0, -1);

    return localISOTime
}

