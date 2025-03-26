import { useQuery } from "@tanstack/react-query"
import { Navigate, useLocation } from "react-router-dom"
import { getProjectById } from "../../api/ProjectAPI"
import EditProjectForm from "./EditProjectForm"
import { useAuth } from "../../hooks/useAuth"
import { useMemo } from "react"

export default function EditProjectData() {
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const projectId = queryParams.get('editProject')!

    const { data: user } = useAuth()

    const {data, isError} = useQuery({
      queryFn: () => getProjectById(projectId),
      queryKey: ['project'],
      enabled: !!projectId,
      retry: 1
    })

    const canEdit = useMemo(() => data?.manager === user?._id, [data, user])

    if(isError) return <Navigate to={'/404'}/>

    if(data && user)
  return (
    <> <EditProjectForm data={data} canEdit={canEdit} /> </>
  )
}
