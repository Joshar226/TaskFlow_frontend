import { useForm } from "react-hook-form"
import { User } from "../../types"
import { useMutation } from "@tanstack/react-query"
import { addCollaborator } from "../../api/TeamAPI"
import { toast } from "react-toastify"
import { useStore } from "../../store"
import { useParams } from "react-router-dom"

type SearchCollaboratorResultProps = {
  user: User
}

export default function SearchCollaboratorResult({user} : SearchCollaboratorResultProps) {

  const params = useParams()
  const projectId = params.projectId!

  const hideModal = useStore((store) => store.hideModal)
  const {handleSubmit} = useForm()

  const {mutate} = useMutation({
    mutationFn: addCollaborator,
    onError: error => toast.error(error.message),
    onSuccess: (data) => {
      hideModal()
      toast.success(data)
    }
  }) 

  const handleAddCollaborator = () => {
    const data = {
      projectId,
      id: user._id
    }
    mutate(data)
  }

  return (
    <div className="search-collaborator-div">

        <p className="search-collaborator-info">{user.name}</p>

        <form
          onSubmit={handleSubmit(handleAddCollaborator)}
        >
            <input 
                type="submit" 
                value='Add Collaborator'
                className="project-btn add-collaborator-btn"
            />
        </form>
    </div>
  )
}
