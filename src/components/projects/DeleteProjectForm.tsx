import { useForm } from "react-hook-form";
import ErrorMessage from "../ErrorMessage";
import { CheckPasswordForm } from "../../types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { checkPassword } from "../../api/AuthAPI";
import { toast } from "react-toastify";
import { deleteProject } from "../../api/ProjectAPI";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

type DeleteProjectFormProps = {
    canEdit: boolean
}

export default function DeleteProjectForm({canEdit} : DeleteProjectFormProps) {
    const queryClient = useQueryClient()
    const navigate = useNavigate()
    
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const projectId = queryParams.get('deleteProject')!

    useEffect(() => {
        if (!canEdit) {
            navigate('/404')
        }
    }, [canEdit, navigate]);

    const initialValues : CheckPasswordForm = {
        password: ''
    }

    const {register, handleSubmit, reset, formState: {errors}} = useForm({defaultValues : initialValues})

    const checkUserPasswordMutation = useMutation({
        mutationFn: checkPassword,
        onError: (error) => toast.error(error.message)
    })

    const deleteProjectMutation = useMutation({
        mutationFn: deleteProject,
        onError: (error) => toast.error(error.message),
        onSuccess: (data) => {
            toast.success(data)
            queryClient.invalidateQueries({queryKey: ['projects']})
            navigate(location.pathname, {replace: true})
            reset()
        }
    })

    const handleDeleteProject = async (formData: CheckPasswordForm) => {
        await checkUserPasswordMutation.mutateAsync(formData)
        await deleteProjectMutation.mutateAsync(projectId)
    }


  return (
    <>
        <h1 className="project-form-title">Delete Project</h1>
        <form 
            onSubmit={handleSubmit(handleDeleteProject)}
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
                value='Delete Project'
                className="submit-form delete-project-form"
            />
        </form>
    </>
  )
}
