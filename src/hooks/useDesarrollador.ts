import { useState } from "react"

const mockDevelopers = [
  {
    id: 1,
    name: "Juan Pérez García",
    rut: "12.345.678-9",
    email: "juan.perez@empresa.com",
    hireDate: "2022-03-15",
    experience: 6,
    projects: 4,
    status: "active",
  },
  {
    id: 2,
    name: "María López Rodríguez",
    rut: "11.222.333-4",
    email: "maria.lopez@empresa.com",
    hireDate: "2021-08-20",
    experience: 8,
    projects: 5,
    status: "active",
  },
  {
    id: 3,
    name: "Carlos Sánchez Torres",
    rut: "13.456.789-2",
    email: "carlos.sanchez@empresa.com",
    hireDate: "2023-01-10",
    experience: 3,
    projects: 2,
    status: "active",
  },
  {
    id: 4,
    name: "Ana Martínez González",
    rut: "14.567.890-3",
    email: "ana.martinez@empresa.com",
    hireDate: "2020-06-05",
    experience: 9,
    projects: 6,
    status: "inactive",
  },
  {
    id: 5,
    name: "Roberto Díaz Flores",
    rut: "15.678.901-4",
    email: "roberto.diaz@empresa.com",
    hireDate: "2022-11-12",
    experience: 5,
    projects: 3,
    status: "active",
  },
]

export const useDesarrollador= () => {

const [searchTerm, setSearchTerm] = useState("")
  const [filterExperience, setFilterExperience] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")
  const [sortField, setSortField] = useState("name")

  const filtered = mockDevelopers.filter((dev) => {
    const matchesSearch =
      dev.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesExperience =
      filterExperience === "all" ||
      (filterExperience === "junior" && dev.experience <= 3) ||
      (filterExperience === "mid" && dev.experience > 3 && dev.experience <= 7) ||
      (filterExperience === "senior" && dev.experience > 7)
    const matchesStatus = filterStatus === "all" || dev.status === filterStatus
    return matchesSearch && matchesExperience && matchesStatus
  })

  return {
    searchTerm,
    setSearchTerm,
    filterExperience,
    setFilterExperience,
    filterStatus,
    setFilterStatus,
    sortField,
    setSortField,
    filtered,
    mockDevelopers

  }
}
