module.exports = (sql, connectionString, mongoose) => {

    function addPost(post, callback) {
        console.log("dbManeger: addPost call()");

        post.post_id = new mongoose.Types.ObjectId();
        post.date = formatDate(new Date());
        
        const query = `INSERT INTO Posts VALUES( '${post.post_id}','${post.user._id}','${post.img}', '${post.text}' , '${post.date}' ,
           '${post.locationLocationLat}' , '${post.locationLocationLng}' , '${post.title}' , '0')`;
         
        sql.add(connectionString, query, success => {
            if (success) {
                callback(post)
            }
            else {
                callback(undefined)
            }
        });
    }
    function addPost_Tag(post_tag, callback) {
        console.log("dbManeger: Post_Tag call()");

        const query = `INSERT INTO Post_Tag VALUES( '${post_tag.post_id}', '${post_tag.tag_id}')`;

        sql.add(connectionString, query, callback);
    }
    function getFilterPosts(filters, callback) {

        console.log("dbmaneger: getFilterPosts call()");
        filterQuery = getFilterQuery(filters);

        const query = `select DISTINCT Posts.*,Users.name
                          from Posts 
                          LEFT JOIN Post_Tag on Posts.post_id = Post_Tag.post_id
                          LEFT JOIN Tags on Tags.tag_id = Post_Tag.tag_id
                          INNER JOIN Users on Users._id = Posts.publisher_id
                          
                          ${filterQuery}`;

        sql.getMany(connectionString, query, callback);
    }
    function getAllPosts(callback) {

        console.log("dbmaneger: getAllPost call()");

        const query = `select DISTINCT Posts.*,Users.name
                        from Posts 
                        LEFT JOIN Post_Tag on Posts.post_id = Post_Tag.post_id
                        LEFT JOIN Tags on Tags.tag_id = Post_Tag.tag_id
                        INNER JOIN Users on Users._id = Posts.publisher_id`;

        sql.getMany(connectionString, query, callback);
    }
    function updateLikes(post, callback) {
        const query = `
            UPDATE Posts
            SET likes = ${post.likes}
            WHERE post_id = '${post.post_id}';
          `;

        sql.update(connectionString, query, callback);
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
function getFilterQuery(filters) {
    const { fromFilter, ToFilter, publisher, radiusFrom, location, imageTags, userTags } = filters;
    filterQuery = ["Where"];

    if (fromFilter) {
        filterQuery.push(`CAST(Posts.date as datetime2)>='${fromFilter}'`)
        filterQuery.push(`And `)
    }

    if (ToFilter) {
        filterQuery.push(`CAST(Posts.date as datetime2)<='${ToFilter}'`)
        filterQuery.push(`And`)
    }

    if (publisher) {
        filterQuery.push(`Users.name = '${publisher}'`)
        filterQuery.push(`And`)
    }
    ///by km
    if (radiusFrom && location) {
        filterQuery.push(`POWER((
            POWER( ( 53.0 * ( Posts.longitude - ${location.longitude} ) ) , 2 )
             + POWER( ( 69.1 * ( Posts.latitude - ${location.latitude} ) ) , 2 )
            ),0.5)*1.609344  < 1 * ${radiusFrom} `)
        filterQuery.push(`And`)
    }

    if (imageTags) {
        //not implamented
    }

    if (userTags) {
        filterQuery.push(`Tags.text = '${userTags}'`)
        filterQuery.push(`And`)
    }

    filterQuery.pop();

    return filterQuery.join(" ");
}

