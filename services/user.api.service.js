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

const findUserByEmail = async (email) => {
    try {
        const connection = await connectToDatabase();
        const [user] = await connection.execute("SELECT * FROM users WHERE email = ?", [email])
        if (user.length === 0) {
            throw new Error('No se encontró el usuario');
        }
        return user
    } catch (err) {
        console.error("Error al encontrar el usuario: ", err)
        throw err;
    }
}

const findUserById = async (id) => {
    try {
        const connection = await connectToDatabase();
        const [user] = await connection.execute("SELECT * FROM users WHERE user_id = ?", [id])
        if (!user.length) {
            throw new Error('No se encontró el usuario');
        }
        return user
    } catch (err) {
        console.error("Error al encontrar el usuario: ", err)
        throw err;
    }
}


export {
    getAllUsers,
    create,
    findUserByEmail,
    findUserById
};
