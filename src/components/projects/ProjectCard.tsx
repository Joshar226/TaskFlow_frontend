import { Link } from "react-router-dom";
import { DashboardProjectType, User } from "../../types";
import { isManager } from "../../utils/policies";
import ProjectMenu from "./ProjectMenu";



type ProjectCardProps = {
  project: DashboardProjectType
  userId: User['_id']
}

export default function ProjectCard({project, userId} : ProjectCardProps) {
  
  const manager = isManager(project.manager, userId)

  return (
    <div className="project">
     {manager && <ProjectMenu projectId={project._id} />}
      <Link to={`/projects/${project._id}`}>

        <div className="project-header">
          {manager ? 
            <p className="rol manager">Manager</p> :
            <p className="rol collaborator">Collaborator</p>
          }

          <div className="project-information">
            
            <p>Tasks: <span className="project-span">{project.tasks.length}</span></p>
            <p>Collaborators: <span className="project-span">{project.team.length}</span></p>
          </div>
        </div>

        <h3 className="project-title">{project.title}</h3>

        <p className="project-description">{project.description}</p>
      </Link>
    </div>
  )
}
