export interface IPost {
    publishDate: Date,
    postId: string,
    title: string,
    image: {
        url: string,
        tags: string[]
    },
    likes: {
        amount: number,
        users: string[]
    },
    location: {
        lat: string,
        lon: string
    },
    text: string,
    tags: string[],
    username?: string,
    userId?: string,
    email?: string
}

