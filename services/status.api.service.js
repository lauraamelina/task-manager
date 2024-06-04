import connectToDatabase from './connection.js';

const getAllStatus = async () => {
    try {
        const connection = await connectToDatabase();
        const [rows] = await connection.execute('SELECT * FROM status');
        await connection.end();
        return rows;
    } catch (error) {
        console.error('Error al obtener todos los estados: ', error);
        throw error;
    }
};

const findStatusById = async (id) => {
    try {
        const connection = await connectToDatabase();
        const [status] = await connection.execute("SELECT * FROM status WHERE status_id = ?", [id])
        if (!status.length) {
            throw new Error('No se encontró el estado');
        }
        await connection.end();
        return status
    } catch (err) {
        console.error("Error al encontrar el estado: ", err)
        throw err;
    }
}

export {
    getAllStatus,
    findStatusById,
};
