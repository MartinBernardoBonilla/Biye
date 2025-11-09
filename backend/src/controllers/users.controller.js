// src/controllers/users.controller.js
// Lógica para las rutas de usuarios.
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

/**
 * @route   POST /api/v1/users/register
 * @desc    Registrar un nuevo usuario
 * @access  Public
 */
const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Verificar si el usuario ya existe
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ success: false, error: 'El usuario ya existe' });
        }

        // Crear una instancia de usuario
        user = new User({
            username,
            email,
            password
        });

        // Encriptar la contraseña
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        // Crear token JWT
        const payload = {
            user: {
                id: user.id
            }
        };

        const token = jwt.sign(
            payload,
            'mySecretToken', // Debería ser una variable de entorno
            { expiresIn: '1h' }
        );

        res.status(201).json({ success: true, token, user: { id: user.id, username, email } });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Error del servidor' });
    }
};

/**
 * @route   POST /api/v1/users/login
 * @desc    Autenticar usuario y obtener token
 * @access  Public
 */
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Verificar si el usuario existe
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, error: 'Credenciales inválidas' });
        }

        // Comparar contraseñas
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, error: 'Credenciales inválidas' });
        }

        // Crear token JWT
        const payload = {
            user: {
                id: user.id,
                isAdmin: user.isAdmin,
            }
        };

        const token = jwt.sign(
            payload,
            'mySecretToken', // Debería ser una variable de entorno
            { expiresIn: '1h' }
        );

        res.status(200).json({ success: true, token, user: { id: user.id, username: user.username, email: user.email, isAdmin: user.isAdmin } });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Error del servidor' });
    }
};

/**
 * @route   GET /api/v1/users/me
 * @desc    Obtener el perfil del usuario autenticado
 * @access  Private
 */
const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (user) {
            res.status(200).json({
                _id: user._id,
                username: user.username,
                email: user.email,
                isAdmin: user.isAdmin
            });
        } else {
            res.status(404).json({ success: false, error: 'Usuario no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: 'Error del servidor' });
    }
};

/**
 * @route   PUT /api/v1/users/:id
 * @desc    Actualizar un usuario por ID (solo para administradores)
 * @access  Private/Admin
 */
const updateUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (user) {
            user.username = req.body.username || user.username;
            user.email = req.body.email || user.email;
            user.isAdmin = req.body.isAdmin !== undefined ? req.body.isAdmin : user.isAdmin;

            const updatedUser = await user.save();
            res.status(200).json({
                _id: updatedUser._id,
                username: updatedUser.username,
                email: updatedUser.email,
                isAdmin: updatedUser.isAdmin,
            });
        } else {
            res.status(404).json({ success: false, error: 'Usuario no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: 'Error del servidor' });
    }
};

/**
 * @route   DELETE /api/v1/users/:id
 * @desc    Eliminar un usuario por ID (solo para administradores)
 * @access  Private/Admin
 */
const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (user) {
            await user.deleteOne();
            res.status(200).json({ success: true, message: 'Usuario eliminado' });
        } else {
            res.status(404).json({ success: false, error: 'Usuario no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: 'Error del servidor' });
    }
};

/**
 * @route   GET /api/v1/users
 * @desc    Obtener todos los usuarios (solo para administradores)
 * @access  Private/Admin
 */
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}).select('-password');
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ success: false, error: 'Error del servidor' });
    }
};

module.exports = {
    registerUser,
    loginUser,
    getMe,
    updateUser,
    deleteUser,
    getAllUsers,
};
