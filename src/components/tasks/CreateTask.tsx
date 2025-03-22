import { useForm } from "react-hook-form"
import ErrorMessage from "../ErrorMessage"
import { ProjectForm } from "../../types"
import { useParams } from "react-router-dom"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createTask } from "../../api/TaskAPI"
import { toast } from "react-toastify"
import { useStore } from "../../store"


export default function CreateTask() {

    const params = useParams()
    const projectId = params.projectId!
    const hideModal = useStore((store) => store.hideModal)

    const queryClient = useQueryClient()

    const initialValues : ProjectForm = {
        title: '',
        description: ''
    }

    const {register, handleSubmit, reset, formState: {errors}} = useForm({defaultValues: initialValues})

    const {mutate} = useMutation({
        mutationFn: createTask,
        onError: error => toast.error(error.message),
        onSuccess: (data) => {
            toast.success(data)
            hideModal()
            queryClient.invalidateQueries({queryKey: ['tasks']})
            reset()
        }
    })

    const handleCreateTask = (formData : ProjectForm) => {
        const data = {
            projectId,
            formData
        }

        mutate(data)
        
    }

  return (
    <>
        <h1 className="project-form-title">Create Task</h1>
        <form 
            onSubmit={handleSubmit(handleCreateTask)}
            className="project-form" 
        >
            <div className="form-div">
                <input
                    type="text"
                    placeholder="Task title"
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
                    placeholder="Task description"
                    {...register('description', {
                        required: 'A description is required'
                    })}
                ></textarea>
                {errors.description && <ErrorMessage>{errors.description.message}</ErrorMessage>}
            </div>

            <input
                type="submit"
                value='Create Task'
                className="submit-form"
            />
        </form>
    </>
  )
}
