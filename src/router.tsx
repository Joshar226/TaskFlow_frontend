import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import RegisterView from "./views/auth/RegisterView";
import LoginView from "./views/auth/LoginView";
import ConfirmAccountView from "./views/auth/ConfirmAccountView";
import ResetPasswordView from "./views/auth/ResetPasswordView";
import NewPasswordView from "./views/auth/NewPasswordView";
import RequestNewCodeView from "./views/auth/RequestNewCodeView";
import AppLayout from "./layouts/AppLayout";
import DashBoardView from "./views/DashboardView";
import ProjectDetailsView from "./views/projects/ProjectDetailsView";
import ErrorView from "./views/auth/ErrorView";

export default function Router() {
  return (
    <BrowserRouter>
        <Routes>
            <Route element={<AuthLayout />}>
                <Route path="auth/sing-up" element={<RegisterView />}/>
                <Route path="auth/login" element={<LoginView />}/>
                <Route path="auth/confirm-account" element={<ConfirmAccountView />}/>
                <Route path="auth/reset-password" element={<ResetPasswordView />}/>
                <Route path="auth/new-password" element={<NewPasswordView />}/>
                <Route path='/auth/request-code' element={<RequestNewCodeView/>} />
                <Route path='/404' element={<ErrorView/>} />
            </Route>

            <Route element={<AppLayout />}>
              <Route path='/' element={<DashBoardView />} index/>
              <Route path='/projects/:projectId' element={<ProjectDetailsView />} />
            </Route>

            
        </Routes>
    </BrowserRouter>
  )
}
