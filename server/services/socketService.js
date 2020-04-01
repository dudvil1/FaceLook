module.exports = () => {
    return (socket) => {
        listeningAddPost(socket);
        listeningUpdateLike(socket);
    }

    function listeningAddPost(socket) {
        socket.on('addPost', (post) => {
            socket.broadcast.emit('addPostChange', post)
        });
    }

    function listeningUpdateLike(socket) {
        socket.on('updateLike', (post) => {
            socket.broadcast.emit('updateLikeChange', post)
        });
    }
}

