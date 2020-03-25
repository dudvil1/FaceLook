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

    function addPost_Tag(post_tag, callback) {
        callback(false)
    }
    function getFilterPosts(filters, callback) {

        callback([])
    }
    async function getAllPosts(callback) {
        callback([])
    }
    function updateLikes(post, callback) {
        callback(false)
    }

    return {
        getFilterPosts,
        addPost,
        addPost_Tag,
        getAllPosts,
        updateLikes
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


