import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrowLeft, Edit, Mail, RotateCcw, Trash2, User,} from "lucide-react";
import { useDesarrolladorLogica } from "@/hooks/useDesarrolladorLogica";
import { DesarrolladorEditarModal } from "@/modals/DesarrolladorEditarModal";
import type { Proyecto } from "@/types/proyectos";
import { getDeveloperById } from "@/api/desarrollador.api";
import { getProjects } from "@/api/proyectos.api";
import { asignarDesarrollador, getDesarrolladoresDeProyecto } from "@/api/asignaciones.api";
import { AsignarProyectoModal } from "@/modals/AsignarProyectoModal";

export const DetallesDesarrollador = () => {
  const [proyectosAsignados, setProyectosAsignados] = useState<Proyecto[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [todosLosProyectos, setTodosLosProyectos] = useState<Proyecto[]>([]);

  const { id } = useParams();

  const {
    handleDelete,
    developers,
    fetchDevelopers,
    editOpen,
    setEditOpen,
    navigate,
    reactivateDev,
    setDesarrollador,
  } = useDesarrolladorLogica();

  const desarrollador = developers.find(
    (dev) => dev.codigoDesarrollador === Number(id)
  );

  // ------------------ CARGAR PROYECTOS Y ASIGNADOS --------------------
  useEffect(() => {
    const fetch = async () => {
      const dev = await getDeveloperById(Number(id));
      setDesarrollador(dev);

      const allProjects = await getProjects();
      setTodosLosProyectos(allProjects);

      const assigned: Proyecto[] = [];

      for (const p of allProjects) {
        const devs = await getDesarrolladoresDeProyecto(p.codigoProyecto);
        if (devs.some((d) => d.codigoDesarrollador === dev.codigoDesarrollador)) {
          assigned.push(p);
        }
      }

      setProyectosAsignados(assigned);
    };

    fetch();
  }, [id, setDesarrollador]);

  // Si no están cargados los developers en store
  useEffect(() => {
    if (developers.length === 0) fetchDevelopers();
  }, [developers.length, fetchDevelopers]);

  if (!desarrollador) return <p>Cargando...</p>;

  // ------------------ ASIGNAR PROYECTO --------------------
  const handleAsignar = async (codigoProyecto: number) => {
    await asignarDesarrollador(codigoProyecto, desarrollador.codigoDesarrollador);

    const proyecto = todosLosProyectos.find(
      (p) => p.codigoProyecto === codigoProyecto
    );
    if (proyecto) {
      setProyectosAsignados((prev) => [...prev, proyecto]);
    }

    setModalOpen(false);
  };

  // ------------------ UI --------------------
  return (
    <div className="space-y-6">

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
            <h1 className="text-3xl font-bold text-foreground">
              {desarrollador.nombre}
            </h1>
            <p className="text-muted-foreground mt-1">RUT: {desarrollador.rut}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setEditOpen(true)}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 flex items-center gap-2"
          >
            <Edit size={18} />
            Editar
          </button>

          <button
            onClick={() => handleDelete(desarrollador.codigoDesarrollador)}
            disabled={!desarrollador.registroActivo}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
              desarrollador.registroActivo
                ? "bg-destructive text-destructive-foreground hover:bg-destructive/90"
                : "bg-muted text-muted-foreground opacity-50 cursor-not-allowed"
            }`}
          >
            <Trash2 size={18} />
            Eliminar
          </button>

          {!desarrollador.registroActivo && (
            <button
              onClick={() => reactivateDev(desarrollador.codigoDesarrollador)}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
            >
              <RotateCcw size={18} />
              Reactivar
            </button>
          )}
        </div>
      </div>

      {/* INFO CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-lg p-4">
          <p className="text-sm text-muted-foreground">Estado</p>
          <p
            className={`text-2xl font-bold mt-1 ${
              desarrollador.registroActivo ? "text-green-600" : "text-red-600"
            }`}
          >
            {desarrollador.registroActivo ? "Activo" : "Inactivo"}
          </p>
        </div>

        <div className="bg-card border border-border rounded-lg p-4">
          <p className="text-sm text-muted-foreground">Experiencia</p>
          <p className="text-2xl font-bold mt-1">{desarrollador.aniosExperiencia} años</p>
        </div>

        <div className="bg-card border border-border rounded-lg p-4">
          <p className="text-sm text-muted-foreground">Proyectos</p>
          <p className="text-2xl font-bold mt-1">{proyectosAsignados.length}</p>
        </div>

        <div className="bg-card border border-border rounded-lg p-4">
          <p className="text-sm text-muted-foreground">Contratado</p>
          <p className="text-sm font-semibold mt-1">
            {new Date(desarrollador.fechaContratacion).toLocaleDateString("es-CL")}
          </p>
        </div>
      </div>

      {/* CONTACTO */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h2 className="text-lg font-bold mb-4">Información de Contacto</h2>

        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Mail size={20} className="text-muted-foreground" />
            <a href={`mailto:${desarrollador.correoElectronico}`} className="text-primary hover:underline">
              {desarrollador.correoElectronico}
            </a>
          </div>

          <div className="flex items-center gap-3">
            <User size={20} className="text-muted-foreground" />
            <span>{desarrollador.rut}</span>
          </div>
        </div>
      </div>

      {/* PROYECTOS ASIGNADOS */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Proyectos Asignados</h2>

          <button
            onClick={() => setModalOpen(true)}
            className="px-3 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
          >
            Asignar a Proyecto
          </button>
        </div>

        {proyectosAsignados.length === 0 ? (
          <p className="text-muted-foreground">No tiene proyectos asignados.</p>
        ) : (
          <ul className="space-y-2">
            {proyectosAsignados.map((p) => (
              <li key={p.codigoProyecto} className="p-3 border border-border rounded-lg flex justify-between">
                <span className="font-medium">{p.nombre}</span>
                <span className="text-muted-foreground">
                  {new Date(p.fechaInicio).toLocaleDateString("es-CL")} →{" "}
                  {new Date(p.fechaTermino).toLocaleDateString("es-CL")}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <AsignarProyectoModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        proyectos={todosLosProyectos}
        onSelect={handleAsignar}
      />

      <DesarrolladorEditarModal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        developer={desarrollador}
      />
    </div>
  );
};