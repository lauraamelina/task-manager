import mysql from 'mysql2/promise';

const connectToDatabase = async () => {
    try {
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'tasks'
        });

        console.log('Conexión a la base de datos establecida');

        return connection;
    } catch (error) {
        console.error('Error al conectar a la base de datos: ', error);
        throw error;
    }
};

export default connectToDatabase;
