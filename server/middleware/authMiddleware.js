const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', ''); // Obtener el token del header

    if (!token) {
        return res.status(401).json({ message: 'Acceso denegado, no se proporcionó token' });
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET); // Verificar el token
        req.user = verified; // Almacenar el usuario verificado en la solicitud
        next(); // Continuar a la siguiente función o ruta
    } catch (error) {
        res.status(400).json({ message: 'Token no válido' });
    }
};

module.exports = authMiddleware;