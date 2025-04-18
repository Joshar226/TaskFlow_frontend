import { useAuth } from "../hooks/useAuth";
import ProjectCard from "../components/projects/ProjectCard";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getProjects } from "../api/ProjectAPI";
import Modal from "../components/Modal";
import { useLocation, useNavigate } from "react-router-dom";
import CreateProjectForm from "../components/projects/CreateProjectForm";
import EditProjectData from "../components/projects/EditProjectData";
import LoadingProjectInfo from "../components/projects/LoadingProjectInfo";
import ProfileData from "./auth/ProfileData";


export default function DashBoardView() {
  const navigate = useNavigate()
  const location = useLocation()  
  const { data: user } = useAuth()
  const queryClient = useQueryClient()

  queryClient.removeQueries({queryKey: ['project']})
  const {data, isLoading} = useQuery({
    queryKey: ['projects'],
    queryFn: getProjects
  })

  if(isLoading) return <LoadingProjectInfo />

  if(user && data)
    return (
      <div className='dashboard' >
        <header className="dashboard-header">
          <h1 className="dashboard-title">Projects</h1>

          <button 
            onClick={() => navigate(`?createProject`)}
            className="create-button"  
          >Create Project</button>
        </header>

        <main className="dashboard-projects">
          {!data.length ? <p className="no-items">No Projects</p> : data.map( project => <ProjectCard key={project._id} project={project} userId={user._id}/>)}
        </main>
        {location.search.includes('editProject') && <Modal> <EditProjectData/> </Modal>}    
        {location.search.includes('createProject') && <Modal> <CreateProjectForm/> </Modal>}
        {location.search.includes('deleteProject') && <Modal> <EditProjectData/> </Modal>}
        {location.search.includes('profile') && <Modal> <ProfileData /> </Modal>}
      </div>
    )
}
