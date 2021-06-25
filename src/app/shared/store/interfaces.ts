export interface IUser {
    id: number,
    password: string
    name: string,
    username: string,
    email: string,
    address: {
        street: string,
        suite: string,
        city: string,
        zipcode: string,
    },
    phone: string,
    website: string | null,
    company: {
        name: string,
        catchPhrase: string,
        bs: string
    } | null
}

export interface IToken {
    token: string | boolean,
    expireIn: string | number
}

export interface INew {
    userId: number,
    id: number,
    title: string
    body: string
}
