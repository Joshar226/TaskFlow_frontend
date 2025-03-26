import { useQuery } from "@tanstack/react-query";
import RemoveCollaboratorResult from "./RemoveCollaboratorResult";
import { getProjectCollaborators } from "../../api/TeamAPI";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useStore } from "../../store";
import { useEffect } from "react";

export default function ManageCollaborators() {
  const navigate = useNavigate()
  const params = useParams()
  const projectId = params.projectId!

    const manager = useStore((store) => store.manager)
  
    useEffect(() => {
      if(!manager) {
          navigate('/404')
      }
    }, [manager, navigate])

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
