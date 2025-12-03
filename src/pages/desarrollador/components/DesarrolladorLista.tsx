// src/components/desarrolladores/DesarrolladorLista.tsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useDesarrolladorLogica } from "@/hooks/useDesarrolladorLogica";
import { useDesarrollador } from "@/hooks/useDesarrollador";
import { DesarrolladorEditarModal } from "@/modals/DesarrolladorEditarModal";
import { AsignarProyectoModal } from "@/modals/AsignarProyectoModal";

import { Edit, Eye, RotateCcw, Trash2, Users } from "lucide-react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

import { getProjects } from "@/api/proyectos.api";
import { asignarDesarrollador } from "@/api/asignaciones.api";
import type { Proyecto } from "@/types/proyectos";

export const DesarrolladorLista = () => {
  const {
    loading,
    handleDelete,
    reactivateDev,
    editOpen,
    selectedDev,
    openEditModal,
    setEditOpen,
  } = useDesarrolladorLogica();

  // 🔹 Obtener desarrolladores filtrados
  const { filteredDevelopers } = useDesarrollador();

  const [modalOpen, setModalOpen] = useState(false);
  const [proyectos, setProyectos] = useState<Proyecto[]>([]);
  const [devSeleccionado, setDevSeleccionado] = useState<number | null>(null);

  // 🔵 Traer proyectos cuando abres el modal
  const abrirModalAsignar = async (devId: number) => {
    setDevSeleccionado(devId);

    const lista = await getProjects();
    setProyectos(lista);

    setModalOpen(true);
  };

  // 🟢 Asignar proyecto seleccionado
  const asignarProyecto = async (codigoProyecto: number) => {
    if (!devSeleccionado) return;

    try {
      await asignarDesarrollador(codigoProyecto, devSeleccionado);

      Swal.fire({
        icon: "success",
        title: "Asignado",
        text: "El desarrollador fue asignado correctamente.",
        timer: 1500,
        showConfirmButton: false,
      });

      setModalOpen(false);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo asignar el desarrollador.",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <p className="text-muted-foreground">Cargando desarrolladores...</p>
      </div>
    );
  }

  // 🔹 Mostrar mensaje si no hay desarrolladores después de filtrar
  if (filteredDevelopers.length === 0) {
    return (
      <div className="bg-card border border-border rounded-lg p-12 text-center">
        <p className="text-muted-foreground text-lg">
          No se encontraron desarrolladores con los filtros aplicados
        </p>
        <p className="text-sm text-muted-foreground mt-2">
          Intenta ajustar los filtros para ver más resultados
        </p>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted">
              <th className="px-6 py-3 text-left text-sm font-semibold">
                Nombre
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold">RUT</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">
                Email
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold">
                Contratación
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold">
                Experiencia
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold">
                Estado
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold">
                Acciones
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-border">
            {filteredDevelopers.map((dev) => (
              <tr
                key={dev.codigoDesarrollador}
                className="hover:bg-muted/50 transition-colors"
              >
                <td className="px-6 py-4 text-sm font-medium">{dev.nombre}</td>
                <td className="px-6 py-4 text-sm text-muted-foreground">
                  {dev.rut}
                </td>
                <td className="px-6 py-4 text-sm text-muted-foreground">
                  {dev.correoElectronico}
                </td>
                <td className="px-6 py-4 text-sm text-muted-foreground">
                  {new Date(dev.fechaContratacion).toLocaleDateString("es-CL")}
                </td>
                <td className="px-6 py-4 text-sm">
                  {dev.aniosExperiencia} años
                </td>

                <td className="px-6 py-4 text-sm">
                  <span
                    className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${
                      dev.registroActivo
                        ? "bg-green-500/10 text-green-600"
                        : "bg-red-500/10 text-red-600"
                    }`}
                  >
                    {dev.registroActivo ? "● Activo" : "● Inactivo"}
                  </span>
                </td>

                <td className="px-6 py-4 text-sm">
                  <div className="flex items-center gap-2">
                    {/* Detalles */}
                    <Button variant="outline" size="icon" asChild>
                      <Link to={`/desarrollador/${dev.codigoDesarrollador}`}>
                        <Eye size={16} />
                      </Link>
                    </Button>

                    {/* Editar */}
                    <button
                      onClick={() => openEditModal(dev)}
                      className="p-1.5 hover:bg-muted rounded-lg transition-colors text-muted-foreground hover:text-foreground"
                      title="Editar"
                    >
                      <Edit size={16} />
                    </button>

                    {/* Eliminar */}
                    <button
                      onClick={() => handleDelete(dev.codigoDesarrollador)}
                      className="p-1.5 hover:bg-muted rounded-lg transition-colors text-muted-foreground hover:text-foreground"
                      title="Eliminar"
                    >
                      <Trash2 size={16} />
                    </button>

                    {/* Reactivar */}
                    {!dev.registroActivo && (
                      <button
                        onClick={() => reactivateDev(dev.codigoDesarrollador)}
                        className="p-1.5 hover:bg-muted rounded-lg transition-colors text-muted-foreground hover:text-foreground"
                        title="Reactivar"
                      >
                        <RotateCcw size={16} />
                      </button>
                    )}

                    {/* ASIGNAR PROYECTO */}
                    <button
                      onClick={() => abrirModalAsignar(dev.codigoDesarrollador)}
                      className="p-1.5 hover:bg-muted rounded-lg transition-colors text-muted-foreground hover:text-foreground"
                      title="Asignar a proyecto"
                    >
                      <Users size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="border-t border-border px-6 py-4 flex items-center justify-between bg-muted/30">
        <p className="text-sm text-muted-foreground">
          Mostrando{" "}
          <span className="font-semibold">{filteredDevelopers.length}</span>{" "}
          {filteredDevelopers.length === 1
            ? "desarrollador"
            : "desarrolladores"}
        </p>

        <div className="flex gap-2">
          <button className="px-3 py-1 rounded-lg bg-card border border-border text-foreground hover:bg-muted transition-colors text-sm">
            Anterior
          </button>
          <button className="px-3 py-1 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-sm">
            1
          </button>
          <button className="px-3 py-1 rounded-lg bg-card border border-border text-foreground hover:bg-muted transition-colors text-sm">
            Siguiente
          </button>
        </div>
      </div>

      {/* MODALES */}
      <DesarrolladorEditarModal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        developer={selectedDev}
      />

      <AsignarProyectoModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        proyectos={proyectos}
        onSelect={asignarProyecto}
      />
    </div>
  );
};