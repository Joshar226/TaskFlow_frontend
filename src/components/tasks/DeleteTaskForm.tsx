import { useForm } from "react-hook-form"
import ErrorMessage from "../ErrorMessage"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-toastify"
import { checkPassword } from "../../api/AuthAPI"
import { deleteTask } from "../../api/TaskAPI"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { CheckPasswordForm } from "../../types"
import { useEffect } from "react"
import { useStore } from "../../store"


export default function DeleteTaskForm() {

    const location = useLocation()
    const navigate = useNavigate()
    const queryParams = new URLSearchParams(location.search)
    const params = useParams()
    const projectId = params.projectId!
    const taskId = queryParams.get('deleteTask')!
    const queryClient = useQueryClient()

    const manager = useStore((store) => store.manager)

    useEffect(() => {
        if(!manager) {
            navigate('/404')
        }
    }, [manager, navigate])

    const initialValues = {
        password: ''
    }

    const {register, handleSubmit, reset, formState: {errors}} = useForm({defaultValues: initialValues})

    const checkUserPasswordMutation = useMutation({
        mutationFn: checkPassword,
        onError: (error) => toast.error(error.message)
    })

    const deleteProjectMutation = useMutation({
        mutationFn: deleteTask,
        onError: (error) => toast.error(error.message),
        onSuccess: (data) => {
            toast.success(data)
            queryClient.invalidateQueries({queryKey: ['project']})
            queryClient.invalidateQueries({queryKey: ['task']})
            navigate(location.pathname, {replace: true})
            reset()
        }
    })

    const handleDeleteTask = async (formData : CheckPasswordForm) => {
        await checkUserPasswordMutation.mutateAsync(formData)
        await deleteProjectMutation.mutateAsync({projectId, taskId})
    }

  return (
    <>
        <h1 className="project-form-title">Delete Task</h1>
        <form 
            onSubmit={handleSubmit(handleDeleteTask)}
            className="project-form"
        >
            <div className="form-div">
                <input
                    type="password"
                    placeholder="Your password"
                    className="form-input"
                    {...register('password', {
                        required: 'Your password is required',
                    })}
                />
                {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
            </div>

            <input
                type="submit"
                value='Delete Task'
                className="submit-form delete-project-form"
            />
        </form>
    </>
  )
}
