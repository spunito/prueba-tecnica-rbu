
import { Dashboard } from "@/pages/Dashboard"
import { DetallesDesarrollador } from "@/pages/desarrollador/DetallesDesarrollador"
import { Desarrollador } from "@/pages/desarrollador/Desarrollador"
import { Proyectos } from "@/pages/proyectos/Proyectos"
import { Routes , Route} from "react-router-dom"
import { DetallesProyecto } from "@/pages/proyectos/DetallesProyecto"

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard/>} ></Route>
      <Route path="/desarrollador" element={<Desarrollador/>} ></Route>
      <Route path="/desarrollador/:id" element={<DetallesDesarrollador/>} ></Route>
      <Route path="/proyectos" element={<Proyectos/>} ></Route>
      <Route path="/proyectos/:id" element={<DetallesProyecto/>} ></Route>
    </Routes>
  )
}