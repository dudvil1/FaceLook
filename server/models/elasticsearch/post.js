module.exports = class Post {
    constructor(userId, postId, title, date, lat, lon, text, imageUrl, tags, imageTags) {
        this.publishDate = date;
        this.location = {
            "lat": lat,
            "lon": lon
        };
        this.post_user = {
            "name": "post",
            "parent": userId
        };
        this.postId = postId;
        this.title = title;
        this.image = {
            url: imageUrl,
            tags: imageTags ? (Array.isArray(imageTags) ? imageTags : [imageTags]) : []
        };
        this.likes = {
            amount: 0,
            users: []
        };
        this.text = text
        this.tags = tags ? (Array.isArray(tags) ? tags : [tags]) : []
    }
}