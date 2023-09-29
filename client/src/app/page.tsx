import TodoList from '@/components/TodoList'
import{getAllTasks} from "./api"
import LoginPage from './auth/login/page'
export default async function Home() {

  // const tasks = await getAllTasks()
 
  return (
   <main className="h-screen" >
       <LoginPage />
     
          </main>
 )
}
