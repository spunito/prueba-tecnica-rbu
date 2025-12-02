import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft, Briefcase, Calendar, Code, Edit, Mail, Trash2, User } from "lucide-react";
import { useDesarrolladorLogic } from "@/hooks/useDesarrolladorLogica";
import { DesarrolladorEditarModal } from "@/modals/DesarrolladorEditarModal";


export const DetallesDesarrollador = () => {
  
  const { id } = useParams();
  const { handleDelete, developers , fetchDevelopers , editOpen , setEditOpen, navigate  } = useDesarrolladorLogic();
  const desarrollador = developers.find(
    (dev) => dev.codigoDesarrollador === Number(id)
  );
  

  
  useEffect(() => {
    if (developers.length === 0) {
      fetchDevelopers();
    }
  }, [developers.length, fetchDevelopers]);


  if (!desarrollador) return <p>Cargando...</p>;

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
            <h1 className="text-3xl font-bold text-foreground">{desarrollador.nombre}</h1>
            <p className="text-muted-foreground mt-1">RUT: {desarrollador.rut}</p>
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
          <button 
            onClick={() => handleDelete(desarrollador.codigoDesarrollador)}
            className="flex items-center gap-2 px-4 py-2 bg-destructive text-destructive-foreground rounded-lg hover:bg-destructive/90 transition-colors font-medium"
          >
            <Trash2 size={18} />
            Eliminar
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Estado</p>
              <p className="text-2xl font-bold text-foreground mt-1">
                <span className={`inline-flex items-center gap-2 ${
                  desarrollador.registroActivo ? "text-green-600" : "text-red-600"
                }`}>
                  <span className={`w-2 h-2 rounded-full ${
                    desarrollador.registroActivo ? "bg-green-600" : "bg-red-600"
                  }`}></span>
                  {desarrollador.registroActivo ? "Activo" : "Inactivo"}
                </span>
              </p>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Experiencia</p>
              <p className="text-2xl font-bold text-foreground mt-1">{desarrollador.aniosExperiencia} años</p>
            </div>
            <Code className="text-primary/50" size={32} />
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Proyectos</p>
              <p className="text-2xl font-bold text-foreground mt-1">0</p>
            </div>
            <Briefcase className="text-primary/50" size={32} />
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Contratado</p>
              <p className="text-sm font-semibold text-foreground mt-1">
                {new Date(desarrollador.fechaContratacion).toLocaleDateString("es-CL")}
              </p>
            </div>
            <Calendar className="text-primary/50" size={32} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* Main Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Contact Info */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-lg font-bold text-foreground mb-4">Información de Contacto</h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="text-muted-foreground" size={20} />
                <a href={`mailto:${desarrollador.correoElectronico}`} className="text-primary hover:underline">
                  {desarrollador.correoElectronico}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <User className="text-muted-foreground" size={20} />
                <span className="text-foreground">{desarrollador.rut}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <DesarrolladorEditarModal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        developer={desarrollador}
      />
    </div>
  );
};