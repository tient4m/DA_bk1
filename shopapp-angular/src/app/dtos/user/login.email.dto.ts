import {
    IsString,
    IsNotEmpty,
    IsPhoneNumber,
    IsDate,
    IsEmail
} from 'class-validator';

export class LoginEmailDTO {
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    role_id: number;

    constructor(data: any) {
        this.email = data.email;
        this.password = data.password;
        this.role_id = data.role_id
    }
}