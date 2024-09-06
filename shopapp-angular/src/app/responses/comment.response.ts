import { UserResponse } from "./user/user.response";

export interface CommentResponse {
    id: number;
    user: UserResponse;
    product_id: number;
    content: string;
    created_at: Date;
    updated_at: Date;
}