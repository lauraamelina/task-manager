import connectToDatabase from './connection.js';
import bcrypt from 'bcrypt'

const getAllUsers = async () => {
    try {
        const connection = await connectToDatabase();
        const [rows] = await connection.execute('SELECT * FROM users');
        await connection.end();
        return rows;
    } catch (error) {
        console.error('Error al obtener todos los usuarios: ', error);
        throw error;
    }
};

const create = async (newUser) => {
    try {
        const connection = await connectToDatabase();
        const [users] = await connection.execute('SELECT * FROM users WHERE email = ?', [newUser.email])
        if (users.length > 0) {
            throw new Error('Ya existe un usuario con este email');
        }
        const passwordHash = await bcrypt.hash(newUser.password, 10)
        await connection.execute('INSERT INTO users (email, password, name) VALUES (?, ?, ?)', [newUser.email, passwordHash, newUser.name]);

        await connection.end();
        console.log("Usuario creado exitosamente")
    } catch (error) {
        console.error('Error al crear el usuario: ', error);
        throw error;
    }
};

export {
    getAllUsers,
    create
};
