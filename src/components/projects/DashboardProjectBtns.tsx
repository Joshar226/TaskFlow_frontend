import { useNavigate } from "react-router-dom"
import { useStore } from "../../store"


export default function DashboardProjectBtns() {

  const navigate = useNavigate()
  const manager = useStore((store) => store.manager)

  return (
    <div className="dashboard-project-menu">
      <div className="project-menu-div">
        <p className="project-menu-text">Tasks</p>

        <button
          onClick={() => navigate('?createTask')}
          className="project-btn create-task-btn"
        >Create Task</button>
      </div>

      {manager && 
        <div className="project-menu-div">
          <p className="project-menu-text">Collaborators</p>
          <div className="project-menu-collaborators">
            <button
                onClick={() => navigate('?addCollaborator')}
                className="project-btn project-collaborator-btn"
              >Add Collaborator</button>
              <button
                onClick={() => navigate('?manageCollaborator')}
                className="project-btn project-manage-collaborator-btn"
              >Manage Collaborators</button>
          </div>
        </div>
      }
    </div>
  )
}
