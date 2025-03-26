import { useForm } from "react-hook-form"
import { ResetPasswordForm } from "../../types"
import ErrorMessage from "../ErrorMessage"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { findCollaborator } from "../../api/TeamAPI"
import { toast } from "react-toastify"
import SearchCollaboratorResult from "./SearchCollaboratorResult"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect } from "react"
import { useStore } from "../../store"



export default function AddCollaboratorForm() {
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

  const initialValues : ResetPasswordForm = {
    email: ''
  }

  const {register, handleSubmit, reset, formState: {errors}} = useForm({defaultValues : initialValues})

  const mutation = useMutation({
    mutationFn: findCollaborator,
    onError: error => toast.error(error.message),
    onSuccess: () => {
      reset()
      queryClient.invalidateQueries({queryKey: ['collaborators']})
    }
  })

  const handleAddCollaborator = (formData : ResetPasswordForm) => {
    const data = {
      projectId,
      formData
    }
    mutation.mutate(data)
  }  

  return (
    <>
      <h1 className="project-form-title">Add Collaborator</h1>
      <form 
          onSubmit={handleSubmit(handleAddCollaborator)}
          className="project-form"
      >
          <div className="form-div">
              <input
                  type="email"
                  placeholder="Collaborator email"
                  className="form-input"
                  {...register('email', {
                    required: 'An email is required',
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: "E-mail no válido",
                  }
                  })}
              />
              {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
          </div>

          <input
              type="submit"
              value='Search Collaborator'
              className="submit-form add-collaborator-project-form"
          />
      </form>

      <div>
        {mutation.data && <SearchCollaboratorResult user={mutation.data}/>}
      </div>
    </>
  )
}
