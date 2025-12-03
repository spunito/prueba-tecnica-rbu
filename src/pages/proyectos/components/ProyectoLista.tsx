import { useProyectoLogica } from "@/hooks/useProyectoLogica";

import { Edit, Eye, RotateCcw, Trash2, UsersIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ProyectoEditarModal } from "../../../modals/ProyectoEditarModal";
import { useProyecto } from "@/hooks/useProyecto";


export const ProyectoLista = () => {
  const {
    projects,
    loading,
    handleDelete,
    editOpen,
    reactivateProj,
    setEditOpen,
    selectedProject,
    openEditModal,
  } = useProyectoLogica();
  const { filteredProjects } = useProyecto();

  if (loading) return <p className="text-muted-foreground">Cargando proyectos...</p>;

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted">
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Nombre</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Inicio</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Término</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Duración</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Desarrolladores</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Estado</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Acciones</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-border">
            {filteredProjects.map((proj) => {
              const start = new Date(proj.fechaInicio);
              const end = new Date(proj.fechaTermino);

              const months = Math.max(
                0,
                Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24 * 30))
              );

              return (
                <tr key={proj.codigoProyecto} className="hover:bg-muted/50 transition-colors">
                  {/* Nombre */}
                  <td className="px-6 py-4 text-sm font-medium text-foreground">
                    {proj.nombre}
                  </td>

                  {/* Inicio */}
                  <td className="px-6 py-4 text-sm text-muted-foreground">
                    {start.toLocaleDateString("es-CL")}
                  </td>

                  {/* Término */}
                  <td className="px-6 py-4 text-sm text-muted-foreground">
                    {end.toLocaleDateString("es-CL")}
                  </td>

                  {/* Duración */}
                  <td className="px-6 py-4 text-sm text-foreground">{months} meses</td>

                  {/* Desarrolladores asignados */}
                  <td className="px-6 py-4 text-sm">
                    <span className="inline-flex items-center gap-1 bg-accent/10 text-accent px-2.5 py-1 rounded-full text-xs font-medium">
                      <UsersIcon size={14} />
                      {proj.desarrolladoresAsignados ?? 0}
                    </span>
                  </td>

                  {/* Estado */}
                  <td className="px-6 py-4 text-sm">
                    <span
                      className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${
                        proj.registroActivo
                          ? "bg-green-500/10 text-green-600"
                          : "bg-red-500/10 text-red-600"
                      }`}
                    >
                      {proj.registroActivo ? "● Activo" : "● Inactivo"}
                    </span>
                  </td>

                  {/* Acciones */}
                  <td className="px-6 py-4 text-sm">
                    <div className="flex items-center gap-2">
                      {/* Ver Detalles */}
                      <Button variant="outline" size="icon" asChild>
                        <Link to={`/proyectos/${proj.codigoProyecto}`}>
                          <Eye size={16} />
                        </Link>
                      </Button>

                      {/* Editar */}
                      <button
                        onClick={() => openEditModal(proj)}
                        className="p-1.5 hover:bg-muted rounded-lg transition-colors text-muted-foreground hover:text-foreground"
                        title="Editar"
                      >
                        <Edit size={16} />
                      </button>

                      {/* Eliminar (Soft Delete) */}
                      <button
                        onClick={() => handleDelete(proj.codigoProyecto)}
                        className="p-1.5 hover:bg-muted rounded-lg transition-colors text-muted-foreground hover:text-foreground"
                        title="Eliminar"
                      >
                        <Trash2 size={16} />
                      </button>

                      {/* Reactivar (solo si está inactivo) */}
                      {!proj.registroActivo && (
                        <button
                          onClick={() =>reactivateProj(proj.codigoProyecto)}
                          className="p-1.5 hover:bg-muted rounded-lg transition-colors text-muted-foreground hover:text-foreground"
                          title="Reactivar"
                        >
                          <RotateCcw size={16} />
                        </button>
                      )}

                      {/* Asignar desarrolladores */}
                      <button
                        className="p-1.5 hover:bg-muted rounded-lg transition-colors text-muted-foreground hover:text-foreground"
                        title="Asignar desarrolladores"
                      >
                        <UsersIcon size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="border-t border-border px-6 py-4 flex items-center justify-between bg-muted/30">
        <p className="text-sm text-muted-foreground">
          Mostrando <span className="font-semibold">{projects.length}</span> proyectos
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

      {/* Modal de Edición */}
      <ProyectoEditarModal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        project={selectedProject}
      />
    </div>
  );
};