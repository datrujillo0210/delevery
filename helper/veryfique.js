const jwt = require('jsonwebtoken');
const config = require('../config/config'); // Asegúrate de tener la configuración adecuada

function verifyToken(token) {
    try {
        const decoded = jwt.verify(token, config.secretOrKey);
        return decoded;
    } catch (error) {
        throw error;
    }
}

function getUserFromToken(token) {
    try {
        const decodedToken = verifyToken(token);
        // Aquí puedes acceder a la información del usuario desde el token decodificado
        const userId = decodedToken.id;
        const userEmail = decodedToken.email;
        // ... otras propiedades del usuario que estén en el token

        // Por ejemplo, podrías devolver un objeto con la información del usuario
        return {
            id: userId,
            email: userEmail,
            // ... otras propiedades del usuario
        };
    } catch (error) {
        // Manejo de errores si el token no es válido
        console.error('Error decoding token:', error.message);
        return null;
    }
}

// Ejemplo de uso:
const token = '...'; // Aquí debes poner el token que quieres decodificar
const user = getUserFromToken(token);
console.log('User:', user);
