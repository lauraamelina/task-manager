import * as taskService from './../services/task.api.service.js';

const getAllTasks = async (req, res) => {
    try {
        const tasks = await taskService.getAllTasks();
        return res.status(200).json({ status: true, data: tasks });
    } catch (err) {
        return res.status(500).json({ status: false, error: err.message });
    }
};

const create = async (req, res) => {
    try {
        const task = await taskService.create(req.body);
        return res.status(200).json({
            status: true,
            message: "Tarea creada"
        });
    } catch (err) {
        return res.status(500).json({ status: false, error: err.message });
    }
};

const findTaskById = async (req, res) => {
    try {
        const task = await taskService.findTaskById(req.params.id)
        return res.status(200).json({
            status: true,
            data: task
        });
    } catch (err) {
        return res.status(500).json({ status: false, error: err.message })
    }
}

const update = async (req, res) => {
    try {
        const user = await taskService.update(req.params.id, req.body)
        return res.status(200).json({ status: true, message: "Tarea actualizada" })
    } catch (err) {
        return res.status(500).json({ status: false, error: err.message })
    }
}

const deleteTask = async (req, res) => {
    try {
        const task = await taskService.deleteTask(req.params.id)
        return res.status(200).json({ status: true, message: "Tarea eliminada" })
    } catch (err) {
        return res.status(500).json({ status: false, error: err.message })
    }
}

const changeTaskStatus = async (req, res) => {
    try {
        const task = await taskService.changeTaskStatus(req.params.id, req.body.status_id)
        return res.status(200).json({ status: true, message: "Estado de tarea actualizado" })
    } catch (err) {
        return res.status(500).json({ status: false, error: err.message })
    }
}

export {
    getAllTasks,
    create,
    findTaskById,
    update,
    deleteTask,
    changeTaskStatus
};
