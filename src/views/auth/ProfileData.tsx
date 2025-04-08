import LoadingTaskInfo from "../../components/tasks/LoadingTaskInfo"
import { useAuth } from "../../hooks/useAuth"
import ProfileView from "./ProfileView"

export default function ProfileData() {

  const { data: user, isLoading } = useAuth()

  if(isLoading) return <LoadingTaskInfo />

  if(user)
  return (
    <ProfileView user={user} />
  )
}
