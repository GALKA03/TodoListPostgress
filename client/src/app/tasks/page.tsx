import Task from "@/components/Task"
import TodoList from "@/components/TodoList"
import { getAllTasks } from "../api"
import Header from "@/components/Header"
const TasksPage = async() => {
    const tasks = await getAllTasks()
    return (
        <div className="py-10 px-20 mx-auto"> 
<Header/>
            <TodoList tasks={tasks} />
        </div> 
    )
}
export default TasksPage