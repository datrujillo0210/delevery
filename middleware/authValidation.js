const jwt = require("jsonwebtoken")
const { config } = require("../config/config")
// const { forbidden } = require("../helpers/sendStatus");


function verifyToken(token) {
    try {
        const decoded = jwt.verify(token, config.secretOrKey);
        return decoded;
    } catch (error) {
        throw error;
    }
}

function validateToken(req, res, next) {
    const bearer = req.headers.authorization;

    if (bearer && bearer.startsWith('Bearer')) {
        const [, token] = bearer.split("Bearer ");

        if (token) {
            try {
                const decodedToken = verifyToken(token);
                req.user = decodedToken;
                return next();
            } catch ({ message, name }) {
                return res.status(403).json({
                    error: true,
                    message,
                    type: name
                });
            }
        }
    }
    return res.status(403).json({
        error: true,
        message: "Insufficient permissions"
    });
}

function roleValidation(requiredRoles) {
    return (req, res, next) => {
        const userRole = req.user.role;

        if (requiredRoles.includes(userRole)) { //si el rol del usuario esta incluido en los roles requeridos
            return next();
        } else {
            return res.status(403).json({
                error: true,
                message: `Insufficient permissions for ${userRole}`
            });
        }
    };
}

// Ejemplo de uso: 
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











const superAdminValidation = roleValidation(["superAdmin"]);
const adminValidation = roleValidation(["admin", "superAdmin"]);
const gestorValidation = roleValidation(["gestor", "superAdmin"]);
const gestorAdminValidation = roleValidation(["gestor", "admin", "superAdmin"]);

function authMiddleware(roles) {
    const middlewareFunctions = {
        gestorAdmin: gestorAdminValidation,
        admin: adminValidation,
        gestor: gestorValidation,
        superAdmin: superAdminValidation
    };
    const selectedMiddlewares = roles.map(role => middlewareFunctions[role]).filter(Boolean);
    return [validateToken, ...selectedMiddlewares];
}

module.exports = { authMiddleware, validateToken, verifyToken, getUserFromToken }