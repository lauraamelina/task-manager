import * as userService from './../services/user.api.service.js';
import jwt from 'jsonwebtoken'

const getAllUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        return res.status(200).json({ status: true, data: users });
    } catch (err) {
        return res.status(500).json({ status: false, error: err.message });
    }
};

const create = async (req, res) => {
    try {
        const user = await userService.create(req.body);
        return res.status(201).json({
            status: true,
            message: "Usuario creado"
        });
    } catch (err) {
        return res.status(500).json({ status: false, error: err.message });
    }
};

const findUserByEmail = async (req, res) => {
    try {
        const user = await userService.findUserByEmail(req.body.email)
        return res.status(200).json({
            status: true,
            data: user
        });
    } catch (err) {
        return res.status(500).json({ status: false, error: err.message })
    }
}

const findUserById = async (req, res) => {
    try {
        const user = await userService.findUserById(req.params.id)
        return res.status(200).json({
            status: true,
            data: user
        });
    } catch (err) {
        return res.status(500).json({ status: false, error: err.message })
    }
}

const update = async (req, res) => {
    try {
        const user = await userService.update(req.params.id, req.body)
        return res.status(200).json({ status: true, message: "Usuario actualizado" })
    } catch (err) {
        return res.status(500).json({ status: false, error: err.message })
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userService.login(email, password);
        if (!user) {
            return res.status(401).json({ status: false, message: 'Credenciales inválidas' });
        }
        const token = jwt.sign({ userId: user.id }, 'secreto_del_token', { expiresIn: '1h' });
        res.status(200).json({ status: true, token, user });
    } catch (error) {
        console.error('Error en el login: ', error);
        res.status(500).json({ status: false, error: error.message });
    }
};

export {
    getAllUsers,
    create,
    findUserByEmail,
    findUserById,
    update,
    login
};
