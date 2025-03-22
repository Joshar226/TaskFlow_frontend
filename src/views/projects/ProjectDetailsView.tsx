import { useQuery } from "@tanstack/react-query"
import { getProjectById } from "../../api/ProjectAPI"
import { useNavigate, useParams } from "react-router-dom"
import { isManager } from "../../utils/policies"
import { useAuth } from "../../hooks/useAuth"
import { useStore } from "../../store"
import Modal from "../../components/Modal"
import EditProjectForm from "../../components/projects/EditProjectForm"
import AddCollaboratorForm from "../../components/team/AddCollaboratorForm"
import DeleteProjectForm from "../../components/projects/DeleteProjectForm"
import ManageCollaborators from "../../components/team/ManageCollaborators"
import TaskList from "../../components/tasks/TaskList"
import CreateTask from "../../components/tasks/CreateTask"

export default function ProjectDetailsView() {
  const navigate = useNavigate()
  
    const createTask = useStore((store) => store.createTask) 
    const showCreateTask = useStore((store) => store.showCreateTask) 

  const editProject = useStore((store) => store.editProject)
  const showEditProject = useStore((store) => store.showEditProject)

  const addCollaborator = useStore((store) => store.addCollaborator)
  const showAddCollaborator = useStore((store) => store.showAddCollaborator)

  const deleteProject = useStore((store) => store.deleteProject)
  const showDeleteProject = useStore((store) => store.showDeleteProject)

  const manageCollaborators = useStore((store) => store.manageCollaborators)
  const showManageCollaborators = useStore((store) => store.showManageCollaborators)
  
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
    <div className="dashboard-flex">
      <div className='dashboard'>
        <div className="project-details-info">
            <h1 className="dashboard-title">{data.title}</h1>
            {isManager(data.manager, user._id) ?
              <p className="manager">Manager</p> :
              <p className="collaborator">Collaborator</p>
            }
          </div>

        <main className="task-dashboard">
          <TaskList tasks={data.tasks}/>
        </main>
      </div>
        <div className="dashboard-project-menu">
          <div className="project-menu-div">
            <p className="project-menu-text">Project</p>

            <button
              onClick={() => showCreateTask()}
              className="project-btn create-task-btn"
            >Create Task</button>

            <button
              onClick={() => showEditProject()}
              className="project-btn project-edit-btn"
            >Edit Project</button>

            <button
              onClick={() => showDeleteProject()}
              className="project-btn project-delete-btn"
            >Delete Project</button>
          </div>

          <div className="project-menu-div">
            <p className="project-menu-text">Collaborators</p>
            <button
                onClick={() => showAddCollaborator()}
                className="project-btn project-collaborator-btn"
              >Add Collaborator</button>

              <button
                onClick={() => showManageCollaborators()}
                className="project-btn project-manage-collaborator-btn"
              >Manage Collaborators</button>
          </div>
        </div>

        {createTask && <Modal> <CreateTask /> </Modal>}
        {editProject  && <Modal> <EditProjectForm data={data} /> </Modal>}
        {addCollaborator && <Modal> <AddCollaboratorForm /> </Modal>}
        {deleteProject && <Modal> <DeleteProjectForm /> </Modal>}
        {manageCollaborators && <Modal> <ManageCollaborators /> </Modal>}
    </div>
  )
}
