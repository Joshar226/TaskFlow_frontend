import { TaskProject } from "../../types"

type TaskListProps = {
  tasks: TaskProject[]
}

export default function TaskList({tasks} : TaskListProps) {

  console.log(tasks);
  

  return (
    <div className="task-list">
      <h2>Tasks</h2>
      <div className="task-card">
        <p>hola</p>
      </div>
    </div>
  )
}
