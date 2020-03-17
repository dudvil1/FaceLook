export interface IPost {
    post_id: string,
    publisher_id: string,
    image: string,
    text: string,
    date: string,
    latitude: string,
    longitude: string,
    title: string,
    likes: number,
    name?: string,
    tags?: string[],
}
