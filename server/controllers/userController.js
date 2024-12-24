const User = require('../models/User');

// Registro de un nuevo usuario
const registerUser = async (req, res) => {
    const { email, password, name } = req.body;

    try {
        const newUser = new User({ email, password, name });
        const savedUser = await newUser.save();

        res.status(201).json({
            message: 'Usuario creado exitosamente',
            user: { id: savedUser._id, email: savedUser.email, name: savedUser.name },
        });
    } catch (error) {
        res.status(400).json({ message: 'Error al crear el usuario', error });
    }
};

// Inicio de sesión de un usuario
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Usuario no encontrado' });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Contraseña incorrecta' });
        }

        // Generar un token JWT
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ token, user: { id: user._id, email: user.email, name: user.name } });
    } catch (error) {
        res.status(500).json({ message: 'Error al iniciar sesión', error });
    }
};

// Obtener perfil de usuario
const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password'); // No incluir la contraseña
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener perfil de usuario', error });
    }
};

module.exports = { registerUser, loginUser, getUserProfile };