import { Button } from "@/components/ui/button";
import { useDesarrolladorLogic } from "@/hooks/useDesarrolladorLogica";
import { DesarrolladorEditarModal } from "@/modals/DesarrolladorEditarModal";
import { Edit, Eye,  RotateCcw, Trash2, Users } from "lucide-react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

export const DesarrolladorLista = () => {
  const {
    developers, loading,handleDelete, reactivateDev, editOpen, selectedDev, openEditModal,setEditOpen
  } = useDesarrolladorLogic();

  if (loading) return <p className="text-muted-foreground">Cargando...</p>;

  
  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted">
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Nombre</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">RUT</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Email</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Contratación</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Experiencia</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Estado</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Acciones</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-border">
            {developers.map((dev) => (
              <tr key={dev.codigoDesarrollador} className="hover:bg-muted/50 transition-colors">
                <td className="px-6 py-4 text-sm font-medium text-foreground">{dev.nombre}</td>
                <td className="px-6 py-4 text-sm text-muted-foreground">{dev.rut}</td>
                <td className="px-6 py-4 text-sm text-muted-foreground">{dev.correoElectronico}</td>

                <td className="px-6 py-4 text-sm text-muted-foreground">
                  {new Date(dev.fechaContratacion).toLocaleDateString("es-CL")}
                </td>

                <td className="px-6 py-4 text-sm text-foreground">
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

                    {/* Ver Detalles */}
                    <Button variant="outline" size="icon" asChild>
                      <Link to={`/desarrollador/${dev.codigoDesarrollador}`}>
                        <Eye size={16} />
                      </Link>
                    </Button>
                    


                    {/* Editar */}
                    <button onClick={() => openEditModal(dev)}
                    className="p-1.5 hover:bg-muted rounded-lg transition-colors" title="Editar">
                      <Edit size={16} />
                    </button>

                    {/* Soft Delete */}
                    <button onClick={() => handleDelete(dev.codigoDesarrollador)}
                    className="p-1.5 hover:bg-muted rounded-lg transition-colors" title="Eliminar">
                      <Trash2 size={16} />
                    </button>

                    {/* Reactivar */}

                    {!dev.registroActivo && (
                      <button onClick={() => reactivateDev(dev.codigoDesarrollador)}
                      className="p-1.5 hover:bg-muted rounded-lg transition-colors" title="Reactivar">
                        <RotateCcw size={16} />
                      </button>
                    )}

                    {/* Asignar Proyecot */}
                    <button className="p-1.5 hover:bg-muted rounded-lg transition-colors" title="Asignar a proyecto">
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
          Mostrando <span className="font-semibold">{developers.length}</span> desarrolladores
        </p>
      </div>
      <DesarrolladorEditarModal 
        open={editOpen}
        onClose={() => setEditOpen(false)}
        developer={selectedDev}
      />
    </div>
  );
};
