import { Link } from "react-router-dom";


export default function ErrorView() {
  return (
    <>
        <p className="text-404">Error 404</p>

        <Link to={"/auth/login"} className="link-404">
            Login
        </Link>
    </>
  )
}
