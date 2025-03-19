import { IoMdAdd } from "react-icons/io";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProjects } from "../api/ProjectAPI";
import { useAuth } from "../hooks/useAuth";
import { ToastContainer } from "react-toastify";
import { useStore } from "../store";

export default function AppLayout() {

    const navigate = useNavigate()
    const showModal = useStore((store) => store.showModal)

    const createProjectBtn = () => {
      navigate('/')
      showModal()
    }

    const { data : user, isError} = useAuth()

    if(isError) navigate('/auth/login')

    const {data} = useQuery({
      queryKey: ['projects'],
      queryFn: getProjects
    })  
  if(user && data)
    return (
      <div className="app-layout">
          <aside className="layout-aside">
              <div className="layout-aside-div">
                  <h1 className="layout-logo"
                      >Task <br /> Flow
                  </h1>
                  <p className="layout-name">{user.name}</p>
              </div>

              <div className="layout-projects-div">
                <div>
                  <h3>Projects</h3>
                  <div className="aside-projects">
                    {data.map( project => 
                      <Link key={project._id} to={`/projects/${project._id}`} className="aside-project">{project.title}</Link>
                    )}
                  </div>
                </div>
                <div className="layout-my-projects-div">
                  <h3>My Projects</h3>
                  <IoMdAdd className="my-projects-add-icon" onClick={createProjectBtn}/>
                </div>
              </div>
          </aside>  
            
          <Outlet />

          <ToastContainer
            className='toast'
            pauseOnHover={false}
            pauseOnFocusLoss={false}
            hideProgressBar={true}
          />
      </div>
  )
}
