import { Link } from "react-router-dom";
import { Project, User } from "../../types";
import { isManager } from "../../utils/policies";

type ProjectCardProps = {
  project: Project
  userId: User['_id']
}

export default function ProjectCard({project, userId} : ProjectCardProps) {

  const manager = isManager(project.manager, userId)
  

  return (
    <Link to={`/projects/${project._id}`} className="project">

      <div className="project-header">
        {manager ? 
          <p className="manager">Manager</p> :
          <p className="collaborator">Collaborator</p>
        }

        <div className="project-information">
          <p>Tasks: <span className="project-span">3</span></p>
          <p>Collaborators: <span className="project-span">5</span></p>
        </div>
      </div>

      <h3 className="project-title">{project.title}</h3>

      <p className="project-description">{project.description}</p>
    </Link>
  )
}
