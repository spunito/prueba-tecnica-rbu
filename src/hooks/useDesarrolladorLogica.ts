import { useState } from "react";
import { useDesarrolladorStore } from "@/store/desarrollador.store";
import type { Desarrollador } from "@/types/desarrollador";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export const useDesarrolladorLogica = () => {
  const developers = useDesarrolladorStore((s) => s.developers);
  const loading = useDesarrolladorStore((s) => s.loading);
  const reactivateDev = useDesarrolladorStore((s) => s.reactivateDeveloper);
  const deleteDev = useDesarrolladorStore((s) => s.deleteDeveloper);
  const fetchDevelopers = useDesarrolladorStore((s) => s.fetchDevelopers);

  const navigate = useNavigate();

  /** Modal de edición */
  const [editOpen, setEditOpen] = useState(false);
  const [selectedDev, setSelectedDev] = useState<Desarrollador | null>(null);

  /** Estado del desarrollador actual (para DetallesDesarrollador) */
  const [desarrollador, setDesarrollador] = useState<Desarrollador | null>(null);

  /** Abrir modal de edición desde la tabla */
  const openEditModal = (dev: Desarrollador) => {
    setSelectedDev(dev);
    setEditOpen(true);
  };

  /** Eliminar (soft delete) con SweetAlert */
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
    loading,
    navigate,

    // Para eliminar y reactivar
    handleDelete,
    reactivateDev,

    // Modal editar
    openEditModal,
    editOpen,
    setEditOpen,
    selectedDev,

    // Cargar todos los desarrolladores
    fetchDevelopers,

    // Para DetallesDesarrollador
    desarrollador,
    setDesarrollador,

    closeEditModal: () => setEditOpen(false),
  };
};
