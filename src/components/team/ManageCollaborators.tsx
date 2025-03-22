import { useQuery } from "@tanstack/react-query";
import RemoveCollaboratorResult from "./RemoveCollaboratorResult";
import { getProjectCollaborators } from "../../api/TeamAPI";
import { Navigate, useParams } from "react-router-dom";

export default function ManageCollaborators() {

  const params = useParams()
  const projectId = params.projectId!

  const {data, isError} = useQuery({
    queryFn: () => getProjectCollaborators(projectId),
    queryKey: ['collaborators'],
    retry: 1
  })

  if(isError) return <Navigate to={'/404'}/>
  
  if(data)
  return (
    <>
      <h1 className="project-form-title">Manage Collaborators</h1>
      {data.map( collaborator => <RemoveCollaboratorResult key={collaborator._id} collaborator={collaborator} />)}  
    </>
  )
}
