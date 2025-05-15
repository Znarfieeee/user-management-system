import { Role } from "./role"

export class Account {
    id!: string
    title!: string
    firstName!: string
    lastName!: string
    email!: string
    role!: Role
    status!: string
    jwtToken?: string
    refreshTokens?: string[]
    isVerified!: boolean
    isActive!: boolean
    verificationToken?: string
    resetTokens?: string
    resetTokenExpires?: string
    password?: string
    confirmPassword?: string
    dateCreated?: string
    dateUpdated?: string
}
