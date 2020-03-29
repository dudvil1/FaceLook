const PostModule = require('../../models/elasticsearch/post')

module.exports = (sql, mongoose) => {

    function addPost(post, callback) {
        post.post_id = new mongoose.Types.ObjectId();
        post.date = formatDate(post.date);

        const newPost = new PostModule(post.user._id, post.post_id, post.title, post.date, post.locationLocationLat,
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
        callback([])
    }
    function getAllPosts(callback) {
        const query = {
            index: 'posts',
            body: {
                query: {
                    exists: {
                        field: "postId"
                    }
                }
            }
        }

        sql.getMany(query, (posts) => {
            callback(posts ? posts : [])
        });
    }
    function addLike(data, callback) {
        try {
            const query = {
                index: 'posts',
                id: data.post.postId,
                type: '_doc',
                body: {
                    script: sql.createScript().scriptAppendArray('likes.users', { userId: data.userId })
                        .scriptIncrement('likes.amount', { amount: 1 }).script
                }
            }
            
            sql.update(query, (success) => {
                returnPostOnSuccess(success, query, sql, callback);
            });
        } catch (error) {
            console.log(error);

        }

    }

    function removeLike(data, callback) {
        try {
            const query = {
                index: 'posts',
                id: data.post.postId,
                type: '_doc',
                body: {
                    script: sql.createScript().scriptRemove('likes.users', { userId: data.userId })
                        .scriptDecrement('likes.amount', { amount: 1 }).script
                }
            }
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
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}


