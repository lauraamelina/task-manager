import * as userService from './../services/user.api.service.js';

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
        return res.status(200).json({
            status: true,
            message: "Usuario creado"
        });
    } catch (err) {
        return res.status(500).json({ status: false, error: err.message });
    }
};

export {
    getAllUsers,
    create
};
