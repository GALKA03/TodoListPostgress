import { createNewTask, getTasks, getTaskId, deleteTask, updateTask, } from "../controllers/tasks.js";
export default (router) => {
    router.post("/tasks/", createNewTask);
    router.get("/tasks/", getTasks);
    router.get("/tasks/:id", getTaskId);
    router.delete("/tasks/:id", deleteTask);
    router.put("/tasks/:id", updateTask);
};
//# sourceMappingURL=tasksRouter.js.map