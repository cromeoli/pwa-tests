export interface Welcome {
    posts: Post[];
}

export interface Post {
    id:           number;
    post_content: string;
    type:         number;
    in_heaven:    number;
    circle_id:    number;
    user_id:      number;
    created_at:   Date;
    updated_at:   Date;
}
