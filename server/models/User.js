import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true, // El correo debe ser único
        lowercase: true, // Asegúrate de que el correo esté en minúsculas
    },
    password: {
        type: String,
        required: true,
        unique: false,
        maxlength: 60,
    },
    // Puedes añadir más campos como nombre, dirección, etc.
    name: {
        type: String,
        required: true,
    },
}, { timestamps: true }); // Agrega timestamps para saber cuándo se creó y actualizó el usuario

const User = mongoose.model('User', UserSchema);
export default User;