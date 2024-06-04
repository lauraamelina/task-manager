import connectToDatabase from './connection.js';

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

export {
    getAllUsers,
};
