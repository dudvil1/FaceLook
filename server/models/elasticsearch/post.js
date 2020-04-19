module.exports = class Post {
    constructor(username, userId, postId, title, date, lat, lon, text, imageUrl, tags, imageTags) {
        this.publishDate = date;
        this.location = {
            "lat": lat,
            "lon": lon
        };
        this.post_user = {
            "name": "post",
            "parent": userId
        };
        this.username = username
        this.postId = postId;
        this.title = title;
        this.image = {
            url: imageUrl,
            tags: returnElasticArray(imageTags)
        };
        this.likes = {
            amount: 0,
            users: []
        };
        this.text = text
        this.tags = returnElasticArray(tags)
    }
}

function returnElasticArray(arr) {
    if (arr && Array.isArray(arr)) {
        return arr
    }
    else if (arr) {
        if (typeof arr === 'string' && arr.includes(',')) {
            return arr.split(',')
        }
        return [arr]
    }
    return []
}
