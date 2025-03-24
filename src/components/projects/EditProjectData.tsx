import { useQuery } from "@tanstack/react-query"
import { Navigate, useLocation } from "react-router-dom"
import { getProjectById } from "../../api/ProjectAPI"
import EditProjectForm from "./EditProjectForm"

export default function EditProjectData() {

    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const projectId = queryParams.get('viewProject')!
    
    const {data, isError} = useQuery({
        queryFn: () => getProjectById(projectId),
        queryKey: ['project'],
        enabled: !!projectId,
        retry: 1
    })

    if(isError) return <Navigate to={'/404'}/>

    if(data)
  return (
    <> <EditProjectForm data={data} /> </>
  )
}
