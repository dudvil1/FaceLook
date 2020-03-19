module.exports = (dbManager) => {
    return (socket) => {
        listeningAddPost(socket);
        listeningUpdateLike(socket);
    }

    function listeningAddPost(socket) {
        socket.on('addPost', () => {
            dbManager.getAllPosts((posts) => {
                socket.broadcast.emit('addPostChange', posts)
            })
        });
    }

    function listeningUpdateLike(socket) {
        socket.on('updateLike', (post) => {
            socket.broadcast.emit('updateLikeChange', post)
        });
    }
}

