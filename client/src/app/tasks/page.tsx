import Task from "@/components/Task"
import TodoList from "@/components/TodoList"
import { getAllTasks } from "../api"
import Header from "@/components/Header"
const TasksPage = async() => {
    const tasks = await getAllTasks()
    return ( 
        <>
    <Header/>
        <main>
          
            <TodoList tasks={tasks} />

            </main>
            </>
    )
}
export default TasksPage