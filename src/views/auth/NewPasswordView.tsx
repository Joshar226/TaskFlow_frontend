import { useState } from "react"
import { ConfirmToken } from "../../types"
import NewPasswordToken from "../../components/auth/NewPasswordToken"
import NewPasswordForm from "../../components/auth/NewPasswordForm"

export default function NewPasswordView() {
  const [token, setToken] = useState<ConfirmToken['token']>('')
  const [isValidToken, setIsValidToken] = useState(false)


  return (
    <>
      <p className="text-confirmation">Enter the code you received <span className="text-confirmation-span">by email</span></p>
        
        {!isValidToken ?
          <NewPasswordToken token={token} setToken={setToken} setIsValidToken={setIsValidToken} />
         :
          <NewPasswordForm token={token} />
        }
    </>
  )
}
