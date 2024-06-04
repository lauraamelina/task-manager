import * as statusService from './../services/status.api.service.js';

const getAllStatus = async (req, res) => {
    try {
        const status = await statusService.getAllStatus();
        return res.status(200).json({ status: true, data: status });
    } catch (err) {
        return res.status(500).json({ status: false, error: err.message });
    }
};

const findStatusById = async (req, res) => {
    try {
        const status = await statusService.findStatusById(req.params.id)
        return res.status(200).json({
            status: true,
            data: status
        });
    } catch (err) {
        return res.status(500).json({ status: false, error: err.message })
    }
}

export {
    getAllStatus,
    findStatusById,
};
