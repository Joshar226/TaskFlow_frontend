import { useForm } from "react-hook-form"
import { ProjectForm, Task, TaskForm } from "../../types"
import ErrorMessage from "../ErrorMessage"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateTask } from "../../api/TaskAPI"
import { toast } from "react-toastify"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { useStore } from "../../store"
import { useEffect } from "react"

type EditTaskFormProps = {
    task: Task
}

export default function EditTaskForm({task} : EditTaskFormProps) {


    const location = useLocation()
    const navigate = useNavigate()
    const params = useParams()
    const projectId = params.projectId!
    const queryClient = useQueryClient()
    const manager = useStore((store) => store.manager)

    useEffect(() => {
        if(!manager) {
            navigate('/404')
        }
    }, [manager, navigate])
    
    const initialValues : TaskForm = {
        title: task.title,
        description: task.description
    }

    const {register, handleSubmit, formState: {errors}} = useForm({defaultValues: initialValues})

    const {mutate} = useMutation({
        mutationFn: updateTask,
        onError: error => toast.error(error.message),
        onSuccess: (data) => {
            queryClient.invalidateQueries({queryKey: ['project']})
            queryClient.invalidateQueries({queryKey: ['task']})
            toast.success(data)
            navigate(location.pathname, {replace: true})
        }
    })

    const handleEditTask = (formData : ProjectForm) => {
        const data = {
            projectId,
            taskId: task._id,
            formData
        }
        mutate(data)
    }

  return (
    <>
        <h1 className="project-form-title">Edit Task</h1>
        <form 
            onSubmit={handleSubmit(handleEditTask)}
            className="project-form"
        >
            <div className="form-div">
                <input
                    type="text"
                    placeholder="Project title"
                    className="form-input"
                    {...register('title', {
                        required: 'A title is required',
                    })}
                />
                {errors.title && <ErrorMessage>{errors.title.message}</ErrorMessage>}
            </div>

            <div className="form-div">
                <textarea
                    className="form-textarea"
                    placeholder="Project description"
                    {...register('description', {
                        required: 'A description is required'
                    })}
                ></textarea>
                {errors.description && <ErrorMessage>{errors.description.message}</ErrorMessage>}
            </div>

            <input
                type="submit"
                value='Edit Task'
                className="submit-form"
            />
        </form>
    </>
  )
}
