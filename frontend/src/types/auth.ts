export interface Credentials {
    email: string
    password: string
}

export interface RegisterData extends Credentials {
    name: string
    password_confirmation: string
}

export interface ApiValidationErrors {
    [field: string]: string[]
}