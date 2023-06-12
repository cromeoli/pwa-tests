export interface Welcome {
    circles: Circle[];
}

export interface Circle {
    id:          number;
    name:        string;
    description: string;
    creator_id:  number;
    is_private:  number;
    created_at:  Date;
    updated_at:  Date;
}
