import { Project, TaskProject, taskStatus } from "../../types"
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import DropTask from "./DropTask";
import TaskCard from "./TaskCard";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateStatus } from "../../api/TaskAPI";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

type TaskListProps = {
  tasks: TaskProject[]
}

type GroupedTasks = {
  [key: string] : TaskProject[]
}

const initialStatusGroups : GroupedTasks = {
  pending: [],
  inProgress: [],
  underReview: [],
  completed: []
}

export default function TaskList({tasks} : TaskListProps) {

  const params = useParams()
  const projectId = params.projectId!
  const queryClient = useQueryClient()
  
  const {mutate} = useMutation({
    mutationFn: updateStatus,
    onError: error => toast.error(error.message),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["project"] })
      toast.success(data)
    }
  })

  const groupedTasks = tasks.reduce((acc, task) => {
    return { 
      ...acc, 
      [task.status]: [...acc[task.status], task] 
    }
  }, initialStatusGroups)

  const handleDragEnd = (e: DragEndEvent ) => {

    const {over, active} = e

    if(over && over.id) {
      const taskId = active.id.toString()
      const status = over.id as taskStatus

      queryClient.setQueryData(['project'], (prevData : Project) => {
        const updatedTask  = prevData.tasks.map((task) => {
          if(task._id === taskId) {
            return {
              ...task,
              status
            }
          }
          return task
        })
        return {
          ...prevData,
          updatedTask
        }
      })

      mutate({projectId, taskId, status})
    }
  }

  return (
    <>
      <h2 className="task-title">Tasks</h2>
      <div className="tasks-content">
        <DndContext onDragEnd={handleDragEnd}>
          {Object.entries(groupedTasks).map(([status, tasks]) => (
            <div key={status} className="task-content">
              <h3 className={`task-status-title title-bg-${status}`}>{status}</h3>
              <DropTask status={status}/>
              <ul className="tasks-list">
                {!tasks ? (
                  <li className="">
                    The are not tasks
                  </li>
                ) : (
                  tasks.map( (task) => <TaskCard key={task._id} task={task}/>)
                )}
              </ul>
            </div>
          ) )}
        </DndContext>
      </div>
    </>
  )
}
