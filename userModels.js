const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
    const userSchema = mongoose.Schema(
        {
         firstName: { 
         type: String,
         required: true, 
         minlength: 5,
         maxlength:30  },
          lastName: { 
            type: String, 
            required: true, 
            minlength: 5,
            maxlength:30 },
          email: { type: String, 
            required: true, 
            unique: true},
          password: { 
            type: String, 
            required: true, 
            minlength: 8 },
        },
)
// Middleware pour hacher le mot de passe avant de sauvegarder l'utilisateur
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    const salt = await bcrypt.genSalt (10);
    this.password = await bcrypt.hash(this.password,salt);
    next()
})
// Méthode pour comparer les mots de passe
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this. password);
    };
    const User = mongoose.model ('User', userSchema);
    
    module. exports = User;