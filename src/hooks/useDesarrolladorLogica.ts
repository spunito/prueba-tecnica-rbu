import { useState } from "react";
import { useDesarrolladorStore } from "@/store/desarrollador.store";
import type { Desarrollador } from "@/types/desarrollador";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export const useDesarrolladorLogic = () => {
  const developers = useDesarrolladorStore((s) => s.developers);
  const loading = useDesarrolladorStore((s) => s.loading);
  const reactivateDev = useDesarrolladorStore((s) => s.reactivateDeveloper);
  const deleteDev = useDesarrolladorStore((s) => s.deleteDeveloper);
  const fetchDevelopers = useDesarrolladorStore((s) => s.fetchDevelopers);
  const navigate = useNavigate();
  

  const [editOpen, setEditOpen] = useState(false);
  const [selectedDev, setSelectedDev] = useState<Desarrollador | null>(null);

  const openEditModal = (dev: Desarrollador) => {
    setSelectedDev(dev);
    setEditOpen(true);
  };

  const handleDelete = async (id: number) => {
    const result = await Swal.fire({
      title: "¿Eliminar desarrollador?",
      text: "Esta acción desactivará al desarrollador.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
    });

    if (!result.isConfirmed) return;

    await deleteDev(id);

    Swal.fire({
      title: "Eliminado",
      text: "El desarrollador ha sido desactivado correctamente.",
      icon: "success",
      timer: 1500,
      showConfirmButton: false,
    });
  };

  return {
    developers,
    handleDelete,
    loading,
    reactivateDev,
    deleteDev,
    navigate,
    setEditOpen,
    editOpen,
    selectedDev,
    fetchDevelopers,
    openEditModal,
    closeEditModal: () => setEditOpen(false),
  };
};
