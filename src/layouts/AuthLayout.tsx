import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

export default function AuthLayout() {
  return (
    <div className="auth-body">
      <h1 className="auth-logo"
        >Task <br /> Flow
      </h1>
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
