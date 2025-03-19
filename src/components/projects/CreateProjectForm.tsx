import { useForm } from "react-hook-form"
import { ProjectForm } from "../../types"
import ErrorMessage from "../ErrorMessage"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createProject } from "../../api/ProjectAPI"
import { toast } from "react-toastify"
import { useStore } from "../../store"

export default function CreateProjectForm() {

    const hideModal = useStore((store) => store.hideModal)
    const queryClient = useQueryClient()

    const initialValues : ProjectForm = {
        title: '',
        description: ''
    }

    const {register, handleSubmit, reset, formState: {errors}} = useForm({defaultValues: initialValues})

    const {mutate} = useMutation({
        mutationFn: createProject,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({queryKey: ['projects']})
            toast.success(data)
            reset()
            hideModal()
        }
    })

    const handleCreateProject = (formData : ProjectForm) => mutate(formData)

  return (
    <>
        <h1 className="project-form-title">Create Project</h1>
        <form 
            onSubmit={handleSubmit(handleCreateProject)}
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
                value='Create Project'
                className="submit-form"
            />
        </form>
    </>
  )
}
