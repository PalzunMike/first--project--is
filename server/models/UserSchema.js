import mongoose from 'mongoose';

const User = new mongoose.Schema(
    {
        dateOfBirthday: { type: Date, required: false },
        dateRegister: { type: Date, required: true },
        firstName: { type: String, required: true },
        login: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        phone: { type: String, required: true },
        secondName: { type: String, required: true },
        sex: { type: String, required: false },
        posts: { type: Array, required: false },
        hasToken: { type: String, required: false }
    },
    { versionKey: false }
)

export default mongoose.model('User', User);