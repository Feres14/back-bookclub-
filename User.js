import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "Le prénom est requis"],
        minlength: 2,
        maxlength: 30
    },
    lastName: {
        type: String,
        required: [true, "Le nom est requis"],
        minlength: 2,
         maxlength: 30
    },
    email: {
        type: String,
        required: [true, "L'email est requis"],
        unique: true,
        match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Email invalide"],
    },
    password: {
        type: String,
        required: [true, "Le mot de passe est requis"],
        minlength: 8,
    },
}, { timestamps: true });


userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;