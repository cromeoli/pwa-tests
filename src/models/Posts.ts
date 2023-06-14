export interface _Post {
    id: number;
    post_content: string;
    type: number;
    in_heaven: number;
    circle_id: number;
    user_id: number;
    created_at: Date;
    updated_at: Date;
    user: _User; // Agrega esta propiedad para almacenar los datos del autor
}

export interface _User {
    id: number;
    nickname: string;
    description: string | null;
    email: string;
    email_verified_at: Date;
    avatar: string | null;
    created_at: Date;
    updated_at: Date;
}