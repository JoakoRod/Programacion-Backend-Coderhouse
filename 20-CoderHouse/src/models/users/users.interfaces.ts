export interface UserI {
    _id?: string;
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    address: string,
    age: number,
    phone: string,
    role: string
}

export interface UserQuery {
    email?: string;
    firstName?: string;
    lastName?: string;
    address?: string;
    age?: number;
    phone?: string;
    role?: string;
}

export interface UserBaseClass {
    get(id?: string): Promise<UsersDTO[] | UsersDTO>;
    add(data: UserI): Promise<UsersDTO>;
    update(id: string, newUserData: UserI): Promise<UsersDTO>;
    delete(id: string): Promise<void>;
    query(options: UserQuery): Promise<UsersDTO[]>;
    validate(email: string, phone: string): Promise<UsersDTO[]>;
}

export class UsersDTO {
    id: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    address: string;
    age: number;
    phone: string;
    role: string;

    constructor(data: UserI) {
        this.email = data.email;
        this.password = data.password;
        this.firstName = data.firstName;
        this.lastName = data.lastName;
        this.address = data.address;
        this.age = data.age || 0;
        this.phone = data.phone;
        this.role = data.role;
        this.id = data._id || '';
    }
}
