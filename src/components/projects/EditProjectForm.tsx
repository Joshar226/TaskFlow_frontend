import { useForm } from "react-hook-form"
import { Project, ProjectForm } from "../../types"
import ErrorMessage from "../ErrorMessage"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateProject } from "../../api/ProjectAPI"
import { toast } from "react-toastify"
import { useStore } from "../../store"

type EditProjectFormProps = {
    data: Project
}

export default function EditProjectForm({data} : EditProjectFormProps) {

    const projectId = data._id
    const queryClient = useQueryClient()

    const hideModal = useStore((store) => store.hideModal)

    const initialValues : ProjectForm = {
        title: data.title,
        description: data.description
    }

    const {register, handleSubmit, reset, formState: {errors}} = useForm({defaultValues: initialValues})

    const {mutate} = useMutation({
        mutationFn: updateProject,
        onError: error => toast.error(error.message),
        onSuccess: (data) => {
            toast.success(data)
            queryClient.invalidateQueries({queryKey: ['project']})
            hideModal()
            reset()

        }
    })

    const handleEditProject = (formData : ProjectForm) => {
        const data = {
            formData,
            projectId
        }
        mutate(data)
    }

  return (
    <>
        <h1 className="project-form-title">Edit Project</h1>
            <form 
                onSubmit={handleSubmit(handleEditProject)}
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
                    value='Edit Project'
                    className="submit-form"
                />
            </form>
    </>
  )
}
