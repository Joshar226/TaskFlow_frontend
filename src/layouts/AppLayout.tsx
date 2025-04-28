import { Link, Outlet, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProjects } from "../api/ProjectAPI";
import { useAuth } from "../hooks/useAuth";
import { ToastContainer } from "react-toastify";

export default function AppLayout() {
  const navigate = useNavigate()
  const { data : user, isError} = useAuth()

  if(isError) navigate('/auth/login')

  const {data} = useQuery({
    queryKey: ['projects'],
    queryFn: getProjects
  })  

  const singOut = () => {
    localStorage.removeItem('AUTH_TOKEN')
    navigate('/auth/login')
  }
  
  if(user && data)
    return (
      <div className="app-layout">
          <aside className="layout-aside">
              <div className="layout-aside-content">
                <div className="layout-aside-div">
                  <Link
                    to={'/'}
                    className="layout-logo"
                    >Task <br /> Flow
                  </Link>
                  <div className="layout-sing-out-div">
                    <p className="layout-name">{user.name}</p>
                    <Link to={'/?profile'} className="layout-btn profile-btn">Profile</Link>
                    <button className="sing-out-btn" onClick={singOut}>Sing Out</button>
                  </div>
                </div>
                <Link to={"/?createProject"} className="layout-btn">Create Project</Link>
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
