import { useProyectoLogica } from "@/hooks/useProyectoLogica";
import { useProyectoStore } from "@/store/proyectos.store";
import {
  ArrowLeft,
  Briefcase,
  Calendar,
  Edit,
  RotateCcw,
  Trash2,
  Users,
  XCircle,
} from "lucide-react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ProyectoEditarModal } from "@/modals/ProyectoEditarModal";

import { getDesarrolladoresDeProyecto, desasignarDesarrollador } from "@/api/asignaciones.api";
import type { Desarrollador } from "@/types/desarrollador";
import Swal from "sweetalert2";

export const DetallesProyecto = () => {
  const { handleDelete, navigate, editOpen, setEditOpen, reactivateProj } =
    useProyectoLogica();

  const projects = useProyectoStore((s) => s.projects);
  const fetchProjects = useProyectoStore((s) => s.fetchProjects);
  const { id } = useParams();

  const [equipo, setEquipo] = useState<Desarrollador[]>([]); // <<--- NUEVO

  // Cargar proyectos si el store está vacío
  useEffect(() => {
    if (projects.length === 0) {
      fetchProjects();
    }
  }, [projects.length, fetchProjects]);

  const proyecto = projects.find(
    (pro) => pro.codigoProyecto === Number(id)
  );

  // 🔹 Cargar desarrolladores asignados
  useEffect(() => {
    const loadEquipo = async () => {
      if (!id) return;

      const devs = await getDesarrolladoresDeProyecto(Number(id));
      setEquipo(devs);
    };

    loadEquipo();
  }, [id]);

  // 🔹 Función para desasignar
  const handleDesasignar = async (codigoDev: number) => {
    const result = await Swal.fire({
      title: "¿Quitar desarrollador?",
      text: "Este desarrollador ya no formará parte del proyecto.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, quitar",
      cancelButtonText: "Cancelar",
    });

    if (!result.isConfirmed) return;

    await desasignarDesarrollador(Number(id), codigoDev);

    // Actualizar UI
    setEquipo((prev) => prev.filter((d) => d.codigoDesarrollador !== codigoDev));

    Swal.fire("Listo", "Desarrollador desasignado.", "success");
  };

  if (!proyecto) return <p className="text-muted-foreground">Cargando...</p>;

  // Calcular duración
  const calcularDuracion = () => {
    const start = new Date(proyecto.fechaInicio);
    const end = new Date(proyecto.fechaTermino);
    return Math.max(
      0,
      Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24 * 30))
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">{proyecto.nombre}</h1>
            <p className="text-muted-foreground mt-1">
              {proyecto.registroActivo ? "Proyecto en ejecución" : "Proyecto inactivo"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setEditOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
          >
            <Edit size={18} />
            Editar
          </button>
          
          {/* Botón Eliminar - deshabilitado si está inactivo */}
          <button
            onClick={() => handleDelete(proyecto.codigoProyecto)}
            disabled={!proyecto.registroActivo}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors font-medium ${
              proyecto.registroActivo
                ? "bg-destructive text-destructive-foreground hover:bg-destructive/90"
                : "bg-muted text-muted-foreground cursor-not-allowed opacity-50"
            }`}
          >
            <Trash2 size={18} />
            Eliminar
          </button>

          {/* Botón Reactivar - solo visible si está inactivo */}
          {!proyecto.registroActivo && (
            <button
              onClick={() => reactivateProj(proyecto.codigoProyecto)}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              <RotateCcw size={18} />
              Reactivar
            </button>
          )}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Estado */}
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Estado</p>
              <p className="text-2xl font-bold text-foreground mt-1">
                <span
                  className={`inline-flex items-center gap-2 ${
                    proyecto.registroActivo ? "text-green-600" : "text-red-600"
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${
                      proyecto.registroActivo ? "bg-green-600" : "bg-red-600"
                    }`}
                  ></span>
                  {proyecto.registroActivo ? "Activo" : "Inactivo"}
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Duración */}
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Duración</p>
              <p className="text-2xl font-bold text-foreground mt-1">
                {calcularDuracion()} meses
              </p>
            </div>
            <Calendar className="text-primary/50" size={32} />
          </div>
        </div>

        {/* Desarrolladores */}
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Desarrolladores</p>
              <p className="text-2xl font-bold text-foreground mt-1">
                {proyecto.desarrolladoresAsignados ?? 0}
              </p>
            </div>
            <Users className="text-primary/50" size={32} />
          </div>
        </div>

        {/* Inicio del Proyecto */}
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Inicio</p>
              <p className="text-sm font-semibold text-foreground mt-1">
                {new Date(proyecto.fechaInicio).toLocaleDateString("es-CL")}
              </p>
            </div>
            <Briefcase className="text-primary/50" size={32} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Timeline */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-lg font-bold text-foreground mb-4">Cronograma</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Fecha de Inicio</p>
                  <p className="text-foreground font-semibold">
                    {new Date(proyecto.fechaInicio).toLocaleDateString("es-CL", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Fecha de Término</p>
                  <p className="text-foreground font-semibold">
                    {new Date(proyecto.fechaTermino).toLocaleDateString("es-CL", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>

              {/* Barra de progreso visual */}
              <div className="mt-4">
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all"
                    style={{ width: "45%" }}
                  ></div>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Progreso estimado del proyecto
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar - Equipo Asignado */}
        <div className="space-y-6">
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-lg font-bold text-foreground mb-4">Equipo Asignado</h2>

            {equipo.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-4">
                No hay desarrolladores asignados aún
              </p>
            ) : (
              <ul className="space-y-2">
                {equipo.map((dev) => (
                  <li
                    key={dev.codigoDesarrollador}
                    className="p-3 border border-border rounded-lg flex justify-between items-center"
                  >
                    <span className="font-medium">{dev.nombre}</span>

                    <button
                      onClick={() => handleDesasignar(dev.codigoDesarrollador)}
                      className="text-red-500 hover:text-red-700"
                      title="Quitar del proyecto"
                    >
                      <XCircle size={18} />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      <ProyectoEditarModal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        project={proyecto}
      />
    </div>
  );
};
