import { useForm } from "react-hook-form"
import { TeamMember } from "../../types"
import { useParams } from "react-router-dom"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { removeProjectCollaborator } from "../../api/TeamAPI"
import { toast } from "react-toastify"
import { useStore } from "../../store"

type RemoveCollaboratorResultProps = {
  collaborator : TeamMember
}

export default function RemoveCollaboratorResult({collaborator} : RemoveCollaboratorResultProps) {

  const params = useParams()
  const projectId = params.projectId!
  const hideModal = useStore((store) => store.hideModal)
  const queryClient = useQueryClient()

  const {handleSubmit} = useForm()

  const {mutate} = useMutation({
    mutationFn: removeProjectCollaborator,
    onError: error => toast.error(error.message),
    onSuccess: (data) => {
      toast.success(data)
      hideModal()
      queryClient.invalidateQueries({queryKey: ['collaborators']})
    }
  })

  const handleRemoveCollaborator = () => {
    const data = {
      projectId,
      id: collaborator._id
    }
    mutate(data)
  }

  return (
    <form
      onSubmit={handleSubmit(handleRemoveCollaborator)}
      className="manage-collaborator-form"
    >
      <div className="collaborator-info">
        <p className="search-collaborator-info">{collaborator.name}</p>

        <input
          type="submit"
          value='Remove Collaborator'
          className="remove-collaborator-btn"
        />
      </div>
    </form>
  )
}
