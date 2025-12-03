import { useState } from "react";
import { useProyectoStore } from "@/store/proyectos.store";
import type { Proyecto } from "@/types/proyectos";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export const useProyectoLogica = () => {
  const projects = useProyectoStore((s) => s.projects);
  const loading = useProyectoStore((s) => s.loading);
  const reactivateProj = useProyectoStore((s) => s.reactivateProject);
  const deleteProj = useProyectoStore((s) => s.deleteProject);
  const fetchProjects = useProyectoStore((s) => s.fetchProjects);
  const navigate = useNavigate();

  const [editOpen, setEditOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Proyecto | null>(null);

  const openEditModal = (project: Proyecto) => {
    setSelectedProject(project);
    setEditOpen(true);
  };

  const handleDelete = async (id: number) => {
    const result = await Swal.fire({
      title: "¿Eliminar proyecto?",
      text: "Esta acción desactivará el proyecto.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
    });

    if (!result.isConfirmed) return;

    await deleteProj(id);

    Swal.fire({
      title: "Eliminado",
      text: "El proyecto ha sido desactivado correctamente.",
      icon: "success",
      timer: 1500,
      showConfirmButton: false,
    });
  };

  return {
    projects,
    handleDelete,
    loading,
    reactivateProj,
    deleteProj,
    navigate,
    setEditOpen,
    editOpen,
    selectedProject,
    fetchProjects,
    openEditModal,
    closeEditModal: () => setEditOpen(false),
  };
};