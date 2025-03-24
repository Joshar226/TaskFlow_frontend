import { useAuth } from "../hooks/useAuth";
import ProjectCard from "../components/projects/ProjectCard";
import { useQuery } from "@tanstack/react-query";
import { getProjects } from "../api/ProjectAPI";
import { useStore } from "../store";
import Modal from "../components/Modal";
import EditProjectData from "../components/projects/EditProjectData";

export default function DashBoardView() {

  const modal = useStore((store) => store.modal)
  const showModal = useStore((store) => store.showModal)

  const { data: user } = useAuth()
  
  const {data} = useQuery({
    queryKey: ['projects'],
    queryFn: getProjects
  })  

  if(user && data)
    return (
      <div className={`dashboard ${modal && 'modal'}`} >
        <header className="dashboard-header">
          <h1 className="dashboard-title">Projects</h1>

          <button 
            onClick={() => showModal()}
            className="create-button"  
          >Create Project</button>
        </header>

        <main className="dashboard-projects">
          {data.map( project => <ProjectCard key={project._id} project={project} userId={user._id}/>)}
        </main>
        <Modal> <EditProjectData/> </Modal>    
      </div>
    )
}
