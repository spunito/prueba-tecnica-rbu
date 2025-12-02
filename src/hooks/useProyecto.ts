import { useState } from "react"

const mockProjects = [
  {
    id: 1,
    name: "Plataforma E-commerce",
    startDate: "2023-01-15",
    endDate: "2024-06-30",
    developers: 5,
    status: "active",
  },
  {
    id: 2,
    name: "App Móvil de Gestión",
    startDate: "2023-06-01",
    endDate: "2024-03-15",
    developers: 3,
    status: "active",
  },
  {
    id: 3,
    name: "Sistema de Reportes",
    startDate: "2022-09-20",
    endDate: "2024-01-31",
    developers: 2,
    status: "inactive",
  },
  {
    id: 4,
    name: "Dashboard Analítico",
    startDate: "2024-01-10",
    endDate: "2024-12-31",
    developers: 4,
    status: "active",
  },
  {
    id: 5,
    name: "API REST Microservicios",
    startDate: "2023-11-01",
    endDate: "2024-08-15",
    developers: 6,
    status: "active",
  },
]

export const useProyecto = () => {

    const [searchTerm, setSearchTerm] = useState("")
    const [filterStatus, setFilterStatus] = useState("all")
    const [filterDevelopers, setFilterDevelopers] = useState("all")

    const filtered = mockProjects.filter((proj) => {
        const matchesSearch = proj.name.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesStatus = filterStatus === "all" || proj.status === filterStatus
        const matchesDevelopers =
        filterDevelopers === "all" ||
        (filterDevelopers === "few" && proj.developers <= 2) ||
        (filterDevelopers === "medium" && proj.developers > 2 && proj.developers <= 4) ||
        (filterDevelopers === "many" && proj.developers > 4)
        return matchesSearch && matchesStatus && matchesDevelopers
    })

    return {
        searchTerm,
        setSearchTerm,
        filterStatus,
        setFilterStatus,
        filterDevelopers,
        setFilterDevelopers,
        filtered,
        mockProjects
        

    }
}