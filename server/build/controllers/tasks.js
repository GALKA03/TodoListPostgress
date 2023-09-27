import TasksModel from "../models/tasksModel.js";
export const createNewTask = async (req, res) => {
    try {
        const { title, text, status } = req.body;
        if (!title || !text) {
            return res
                .status(400)
                .json({ error: "Both title and text are required." });
        }
        const newTask = await TasksModel.create({ title, text, status });
        return res.status(201).json(newTask);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};
export const getTasks = async (req, res) => {
    try {
        const tasks = await TasksModel.findAll();
        return res.status(200).json(tasks);
    }
    catch (error) {
        console.error(error);
        return res.sendStatus(400);
    }
};
export const getTaskId = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const task = await TasksModel.findByPk(id);
        if (!task)
            return res.status(404).json({ error: "Task not found" });
        return res.json(task);
    }
    catch (error) {
        console.error(error);
        return res.sendStatus(400);
    }
};
export const deleteTask = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        await TasksModel.destroy({ where: { id } });
        return res.json({ message: "Task deleted successfully" });
    }
    catch (error) {
        console.error(error);
        return res.sendStatus(400);
    }
};
export const updateTask = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { title, text } = req.body;
        const task = await TasksModel.findByPk(id);
        if (!task)
            return res.status(404).json({ error: "Task not found" });
        task.title = title;
        task.text = text;
        await task.save();
        return res.status(200).json(task);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};
//# sourceMappingURL=tasks.js.map