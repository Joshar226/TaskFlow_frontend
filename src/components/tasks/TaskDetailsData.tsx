import { Navigate, useLocation, useParams } from "react-router-dom"
import { getTaskById } from "../../api/TaskAPI"
import { useQuery } from "@tanstack/react-query"
import TaskDetails from "./TaskDetails"
import LoadingTaskInfo from "./LoadingTaskInfo"



export default function TaskDetailsData() {
    const params = useParams()
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const projectId = params.projectId!
    const taskId = queryParams.get('viewTask')!
  
    const {data, isError, isLoading} = useQuery({
      queryFn: () => getTaskById({projectId, taskId}),
      queryKey: ['task'],
      enabled: !!taskId,
      retry: 1
    })
    
    if(isError) return <Navigate to={'/404'}/>

    if(isLoading) return <LoadingTaskInfo />
      
    if(data)
      return (
      <><TaskDetails task={data} /></>
    )
}
