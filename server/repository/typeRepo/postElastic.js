const PostModule = require('../../models/elasticsearch/post')

module.exports = (sql, nodeServices, logger) => {
    const { mongoose } = nodeServices


    function addPost(post, callback) {
        try {
            post.post_id = new mongoose.Types.ObjectId();
            post.date = formatDate(post.date);

            const newPost = new PostModule(post.user.name, post.user._id, post.post_id, post.title, post.date, post.locationLocationLat,
                post.locationLocationLng, post.text, post.img, post.tags, post.imageTags)

            const query = {
                index: 'posts',
                routing: newPost.post_user.parent,
                id: post.post_id.toString(),
                body: newPost
            }
            logInfo(logger, query, "addPost")
            sql.add(query, (success) => {
                callback(success ? newPost : undefined)
            });
        } catch (error) {
            logError(logger, error, "getFilterPosts")
            callback(undefined)
        }
    }
    function getFilterPosts(filters, callback) {
        try {
            const body = getQueryByFilters(filters)
            const query = getBaseQuery(body)
            logInfo(logger, query, "getFilterPosts")
            sql.getMany(query, (posts) => {
                callback(posts ? posts : [])
            });
        } catch (error) {
            logError(logger, error, "getFilterPosts")
            callback([])
        }
    }
    function getAllPosts(callback) {
        try {
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
            logInfo(logger, query, "getAllPosts")
            sql.getMany(query, (posts) => {
                callback(posts ? posts : [])
            });
        } catch (error) {
            logError(logger, error, "getAllPosts")
            callback([])
        }
    }
    function addLike(data, callback) {
        try {
            const body = {
                script: sql.createScript().pushToArray('likes.users', data.userId)
                    .increment('likes.amount', 1).script
            }
            const query = getBaseQuery(body, data.post.postId, '_doc')
            logInfo(logger, query, "addLike")
            sql.update(query, (success) => {
                returnPostOnSuccess(success, query, sql, callback);
            });
        } catch (error) {
            logError(logger, error, "addLike")
            callback(undefined)
        }

    }
    function removeLike(data, callback) {
        try {
            const body = {
                script: sql.createScript().popFromArray('likes.users', data.userId)
                    .decrement('likes.amount', 1).script
            }
            const query = getBaseQuery(body, data.post.postId, '_doc')
            logInfo(logger, query, "removeLike")
            sql.update(query, (success) => {
                returnPostOnSuccess(success, query, sql, callback);
            });
        } catch (error) {
            logError(logger, error, "removeLike")
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
function logInfo(logger, query, funcName) {
    query = typeof (query) == 'object' ? JSON.stringify(query) : query
    logger.info(`Success in PostRepo query ${query}`, { data: { function: funcName } });
}

function logError(logger, error, funcName) {
    logger.error(`Error in PostRepo`, { err: error, data: { function: funcName } });
}

function getQueryByFilters(filters) {
    let allFilters = [
        filters.fromFilter ? { "range": { "publishDate": { "gte": filters.fromFilter } } } : undefined,
        filters.toFilter ? { "range": { "publishDate": { "lte": filters.toFilter } } } : undefined,
        filters.publisher ? { "has_parent": { "parent_type": 'user', "query": { "term": { "username": filters.publisher } } } } : undefined,
        (filters.location && filters.radiusFrom) ? { "geo_distance": { "distance": `${filters.radiusFrom}km`, "location": { "lat": filters.location.latitude, "lon": filters.location.longitude } } } : undefined
    ]

    allFilters = allFilters.filter(o => o != undefined)
    allArrayFilters = addTagsQuery(filters)
    allFilters = addTagQuery(filters, allFilters)

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
        query = query.concat(filters.userTags
            .filter(tag => tag.length > 0)
            .map(tag => ({ "match": { "tags": tag } })))
    }
    if (filters.imageTags && Array.isArray(filters.imageTags)) {
        query = query.concat(filters.imageTags
            .filter(tag => tag.length > 0)
            .map(tag => ({ "match": { "image.tags": tag } })))
    }
    return query
}
function addTagQuery(filters, existQuery) {
    let query = existQuery || []
    if (filters.userTags && Array.isArray(filters.userTags)) {
        if (filters.userTags.length > 0)
            query.push({ "match": { "tags": filters.userTags[0] } })
    }
    else if (filters.userTags) {
        query.push({ "match": { "tags": filters.userTags } })
    }
    if (filters.imageTags && Array.isArray(filters.imageTags)) {
        if (filters.imageTags.length > 0)
            query.push({ "match": { "image.tags": filters.imageTags[0] } })
    }
    else if (filters.imageTags) {
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
function formatDate(date) {
    var d = new Date(date)
    var tzoffset = (d).getTimezoneOffset() * 60000; //offset in milliseconds
    var localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0, -1);

    return localISOTime
}


