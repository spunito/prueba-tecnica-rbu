import { useEffect } from "react"
import { Sidebar } from "./components/layout/Sidebar"
import { Router } from "./router/Router"
import { api } from "./api/axiosClient"

export const App = () => {
  // Conexión a la API BD
  useEffect(() => {
    api.get("/api/test-connection")
      .then(res => console.log("200 OK", res.data.isConnected))
      .catch(err => console.error(err , "500 Internal Server Error"));
  }, [])

  
  return (
    <div >
      <Sidebar />
      <main className="ml-64 p-6">
        <Router />
      </main>
    </div>
  )
}