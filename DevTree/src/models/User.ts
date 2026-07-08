import mongoose, { Schema, Document } from 'mongoose'

export interface IUser extends Document {
    handle: string
    name: string
    email: string
    password: string
    description: string
    image: string
    links: string
    theme: string
}

const DEFAULT_THEME = JSON.stringify({
    backgroundType: 'gradient',
    backgroundColor: '#0f172a',
    gradientFrom: '#581c87',
    gradientTo: '#1e3a8a',
    backgroundImage: '',
    font: 'sans',
    buttonStyle: 'shadow'
})

const userSchema = new Schema({
    handle: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        default: ''
    },
    image: {
        type: String,
        default: ''
    },
    links: {
        type: String,
        default: '[]'
    },
    theme: {
        type: String,
        default: DEFAULT_THEME
    }
})

const User = mongoose.model<IUser>('User', userSchema)
export default User