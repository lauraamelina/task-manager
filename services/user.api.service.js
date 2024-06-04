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
        if (!user.length) {
            throw new Error('No se encontró el usuario');
        }
        await connection.end();
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
        await connection.end();
        return user
    } catch (err) {
        console.error("Error al encontrar el usuario: ", err)
        throw err;
    }
}

const update = async (id, user) => {
    try {
        const connection = await connectToDatabase();
        const [userOld] = await connection.execute("SELECT * FROM users WHERE user_id = ? ", [id])
        if (!userOld.length) {
            throw new Error('No se encontró el usuario');
        } else {
            await connection.execute('UPDATE users SET email = ?, name = ? WHERE user_id = ?', [user.email, user.name, id]);
        }
        await connection.end();
        console.log("Usuario actualizado exitosamente")
    } catch (err) {
        console.error("Error al actualizar el usuario: ", err)
        throw err;
    }
}

const login = async (email, password) => {
    try {
        const connection = await connectToDatabase();
        const [users] = await connection.execute('SELECT * FROM users WHERE email = ?', [email]);
        await connection.end();

        if (!users.length) {
            return null;
        }

        const user = users[0];
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return null;
        }

        return { id: user.user_id, email: user.email };
    } catch (error) {
        console.error('Error al autenticar usuario: ', error);
        throw error;
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
