import connectToDatabase from './connection.js';

const getAllTasks = async () => {
    try {
        const connection = await connectToDatabase();
        const [rows] = await connection.execute('SELECT * FROM tasks');
        await connection.end();
        return rows;
    } catch (error) {
        console.error('Error al obtener todas las tareas: ', error);
        throw error;
    }
};

const create = async (newTask) => {
    try {
        const connection = await connectToDatabase();
        await connection.execute('INSERT INTO tasks (user_id, task_name, description, due_date, status_id) VALUES (?, ?, ?, ?, ?)', [newTask.user_id, newTask.task_name, newTask.description, newTask.due_date, newTask.status_id]);

        await connection.end();
        console.log("Tarea creada exitosamente");
    } catch (error) {
        console.error('Error al crear la tarea: ', error);
        throw error;
    }
};


const findTaskById = async (id) => {
    try {
        const connection = await connectToDatabase();
        const [task] = await connection.execute("SELECT * FROM tasks WHERE task_id = ?", [id])
        if (!task.length) {
            throw new Error('No se encontró la tarea');
        }
        await connection.end();
        return task
    } catch (err) {
        console.error("Error al encontrar la tarea: ", err)
        throw err;
    }
}

const update = async (id, task) => {
    try {
        const connection = await connectToDatabase();
        const [taskOld] = await connection.execute("SELECT * FROM tasks WHERE task_id = ? ", [id]);
        if (!taskOld.length) {
            throw new Error('No se encontró la tarea');
        } else {
            await connection.execute('UPDATE tasks SET user_id = ?, task_name = ?, description = ?, due_date = ?, status_id = ? WHERE task_id = ?', [task.user_id, task.task_name, task.description, task.due_date, task.status_id, id]);
        }
        await connection.end();
        console.log("Tarea actualizada exitosamente");
    } catch (err) {
        console.error("Error al actualizar la tarea: ", err);
        throw err;
    }
};

const deleteTask = async (id) => {
    try {
        const connection = await connectToDatabase();
        const [task] = await connection.execute("SELECT * FROM tasks WHERE task_id = ? ", [id]);
        if (!task || !task.length) {
            throw new Error('No se encontró la tarea');
        } else {
            await connection.execute("DELETE FROM tasks WHERE task_id = ?", [id]);
        }
        await connection.end();
        console.log("Tarea eliminada exitosamente");
    } catch (err) {
        console.error("Error al eliminar la tarea: ", err);
        throw err;
    }
};

const changeTaskStatus = async (taskId, newStatusId) => {
    try {
        const connection = await connectToDatabase();
        const [task] = await connection.execute("SELECT * FROM tasks WHERE task_id = ?", [taskId]);

        if (!task.length) {
            throw new Error('No se encontró la tarea');
        } else {
            await connection.execute("UPDATE tasks SET status_id = ? WHERE task_id = ?", [newStatusId, taskId]);
        }

        await connection.end();
        console.log("Estado de la tarea cambiado exitosamente");
    } catch (error) {
        console.error("Error al cambiar el estado de la tarea: ", error);
        throw error;
    }
};



export {
    getAllTasks,
    create,
    findTaskById,
    update,
    deleteTask,
    changeTaskStatus
};
