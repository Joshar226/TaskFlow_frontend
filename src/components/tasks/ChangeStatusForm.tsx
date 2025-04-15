import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Task, taskStatus } from "../../types"
import { updateStatus } from "../../api/TaskAPI"
import { toast } from "react-toastify"
import { useLocation, useNavigate } from "react-router-dom"

type ChangeStatusFormProps = {
  task: Task
}

export default function ChangeStatusForm({task} : ChangeStatusFormProps) {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const location = useLocation()
  
  const status = {
    pending: 'Pending',
    inProgress: 'In Progress',
    underReview: 'Under Review',
    completed: 'Completed' 
  }
  
  const {mutate} = useMutation({
    mutationFn: updateStatus,
    onError: error => toast.error(error.message),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["project"] })
      navigate(location.pathname, {replace: true})
      toast.success(data)
    }
  })

  const handleChangeStatus = (e : React.ChangeEvent<HTMLSelectElement>) => {
    const status = e.target.value as taskStatus
    const data = {
      projectId: task.project,
      taskId: task._id,
      status
    }
    mutate(data)
  }

  return (
    <div
      className="notes-form"
    >
      <div className="notes-form-div">
        <select 
          className="form-input"
          defaultValue={task.status}  
          onChange={handleChangeStatus}
        >
          {Object.entries(status).map(([ key, value ]) => (
            <option key={key} value={key} >{value}</option>
          ))}
        </select>
      </div>
    </div>
  )
}
