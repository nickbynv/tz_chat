import { useState } from "react"
import Auth from "./components/Auth"
import Chat from "./components/Chat"

export default () => {
  const [user, setUser] = useState(sessionStorage.getItem('user'))

  return <>
    {!user ? (
      <Auth setUser={setUser} />
    ) : (
      <Chat user={user} />
    )}
  </>
}