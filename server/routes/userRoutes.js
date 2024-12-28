import express from 'express';
import User from '../models/User.js'; // Asegúrate de que este modelo esté correctamente definido
import bcrypt from 'bcrypt'; // Para hash de contraseñas
import jwt from 'jsonwebtoken'; // Para la creación de tokens
import auth from '../middleware/authMiddleware.js'; // Middleware de autenticación
const router = express.Router();

// Registro de un nuevo usuario
router.post('/register', async (req, res) => {
    const { email, password, name } = req.body;

    try {
        // Verificar si el usuario ya existe
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'El usuario ya existe' });
        }

        console.log("register", { email, password, name });
        // Hash de la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear un nuevo usuario
        const user = new User({ email, password: hashedPassword, name });
        await user.save();

        res.status(201).json({ message: 'Usuario registrado exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Hubo un error durante el registro' });
    }
});

// Inicio de sesión de un usuario
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Verificar si el usuario existe
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Credenciales inválidas 1', email, password });
        }

        // Verificar la contraseña
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Credenciales inválidas 2', email, password, isPasswordValid });
        }

        // Crear un token JWT
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ token, userId: user._id, name: user.name });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Hubo un error durante el inicio de sesión' });
    }
});

// Obtener perfil de usuario (ruta protegida)
router.get('/profile', auth, async (req, res) => {
    try {
        // Obtener el usuario a partir del ID del token
        const user = await User.findById(req.user.userId).select('-password'); // No enviar la contraseña

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        res.json(user); // Enviar el perfil del usuario
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Hubo un error al obtener el perfil' });
    }
});

export default router;