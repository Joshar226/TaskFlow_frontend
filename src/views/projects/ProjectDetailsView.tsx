import { useQuery } from "@tanstack/react-query"
import { getProjectById } from "../../api/ProjectAPI"
import { useNavigate, useParams } from "react-router-dom"
import { isManager } from "../../utils/policies"
import { useAuth } from "../../hooks/useAuth"
import { useStore } from "../../store"
import Modal from "../../components/Modal"
import EditProjectForm from "../../components/projects/EditProjectForm"
import ProjectDropMenu from "../../components/projects/ProjectDropMenu"


export default function ProjectDetailsView() {
  const navigate = useNavigate()

  const modal = useStore((store) => store.modal)
  const showModal = useStore((store) => store.showModal)

  const params = useParams()
  const projectId = params.projectId!

  const { data: user } = useAuth()

  const {data, isError} = useQuery({
    queryFn: () => getProjectById(projectId),
    queryKey: ['project', projectId],
    retry: 1
  })

  if(isError) navigate('/404')
  
  if(data && user)
  return (
    <div className='dashboard'>
      <div className="project-details-header">
        <div className="project-details-info">
          <h1 className="dashboard-title">{data.title}</h1>
          {isManager(data.manager, user._id) ?
            <p className="manager">Manager</p> :
            <p className="collaborator">Collaborator</p>
          }
        </div>

        <div>
          <button 
            onClick={() => showModal()}
            className="edit-button"  
          >Edit Project</button>

          <button 
            onClick={() => showModal()}
            className="create-button"  
          >E Project</button>

          <ProjectDropMenu />
        </div>
      </div>

      <main className="task-dashboard">
        
      </main>


      {modal && <Modal> <EditProjectForm data={data} /> </Modal>}
      
    </div>
  )
}
