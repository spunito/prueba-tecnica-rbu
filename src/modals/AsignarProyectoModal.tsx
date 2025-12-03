import type { Proyecto } from "@/types/proyectos";

export const AsignarProyectoModal = ({
  open,
  onClose,
  proyectos,
  onSelect,
}: {
  open: boolean;
  onClose: () => void;
  proyectos: Proyecto[];
  onSelect: (id: number) => void;
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-card border border-border rounded-lg p-6 w-full max-w-md">
        <h2 className="text-lg font-bold mb-4">Asignar a Proyecto</h2>

        <ul className="space-y-2 max-h-60 overflow-y-auto">
          {proyectos.map((p) => (
            <li
              key={p.codigoProyecto}
              className="p-3 border rounded-lg hover:bg-muted cursor-pointer"
              onClick={() => onSelect(p.codigoProyecto)}
            >
              <p className="font-medium">{p.nombre}</p>
              <span className="text-sm text-muted-foreground">
                {new Date(p.fechaInicio).toLocaleDateString("es-CL")} →{" "}
                {new Date(p.fechaTermino).toLocaleDateString("es-CL")}
              </span>
            </li>
          ))}
        </ul>

        <button
          onClick={onClose}
          className="mt-4 w-full bg-muted py-2 rounded-lg hover:bg-muted/80"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
};