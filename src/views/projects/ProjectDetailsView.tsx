import { useQuery } from "@tanstack/react-query"
import { getProjectById } from "../../api/ProjectAPI"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { isManager } from "../../utils/policies"
import { useAuth } from "../../hooks/useAuth"
import TaskList from "../../components/tasks/TaskList"
import Modal from "../../components/Modal"
import CreateTask from "../../components/tasks/CreateTask"
import EditTaskData from "../../components/tasks/EditTaskData"
import DeleteTaskForm from "../../components/tasks/DeleteTaskForm"
import TaskDetailsData from "../../components/tasks/TaskDetailsData"
import AddCollaboratorForm from "../../components/team/AddCollaboratorForm"
import ManageCollaborators from "../../components/team/ManageCollaborators"
import { useStore } from "../../store"
import { useEffect } from "react"
import DashboardProjectBtns from "../../components/projects/DashboardProjectBtns"

export default function ProjectDetailsView() {

  const {availWidth} = window.screen

  const navigate = useNavigate()
  const location = useLocation()
  const params = useParams()
  const projectId = params.projectId!

  const manager = useStore((store) => store.manager)
  const setManager = useStore((store) => store.setManager)

  const { data: user } = useAuth()
  
  const {data, isError, isLoading} = useQuery({
    queryFn: () => getProjectById(projectId),
    queryKey: ['project'],
    retry: 1
  })
  
  useEffect(() => {
    if(data && user) {
      setManager(isManager(data.manager, user._id));
    }
  }, [data, user, setManager]);
  
  if(isError) navigate('/404')
  if(isLoading) return <p>Loading</p>


  if(data && user)
  return (
    <div className="dashboard-flex">

      {availWidth < 1920 && <DashboardProjectBtns />}

      <div className='dashboard'>
        <div className="project-details-info">
            <h1 className="dashboard-title">{data.title}</h1>
            {manager ?
              <p className="manager">Manager</p> :
              <p className="collaborator">Collaborator</p>
            }
          </div>

        <main className="task-dashboard">
          <TaskList tasks={data.tasks}/>
        </main>
      </div>

      {availWidth >= 1920 && <DashboardProjectBtns />}
      
      {location.search.includes('createTask') && <Modal> <CreateTask /> </Modal>}
      {location.search.includes('editTask') && <Modal> <EditTaskData /> </Modal>}
      {location.search.includes('deleteTask') && <Modal> <DeleteTaskForm /> </Modal>}
      {location.search.includes('viewTask') && <Modal> <TaskDetailsData /> </Modal>}
      {location.search.includes('addCollaborator') && <Modal> <AddCollaboratorForm /> </Modal>}
      {location.search.includes('manageCollaborator') && <Modal> <ManageCollaborators /> </Modal>}
    </div>
  )
}
