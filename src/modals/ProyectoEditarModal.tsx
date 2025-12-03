import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useProyectoStore } from "@/store/proyectos.store";
import type { Proyecto } from "@/types/proyectos";
import { useEffect } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
  project: Proyecto | null;
}

export const ProyectoEditarModal = ({ open, onClose, project }: Props) => {
  const updateProject = useProyectoStore((s) => s.updateProject);

  const { register, handleSubmit, reset } = useForm<Partial<Proyecto>>({
    defaultValues: project || {},
  });

  useEffect(() => {
    if (project) {
      // Formatear las fechas para el input type="date"
      reset({
        ...project,
        fechaInicio: project.fechaInicio.split("T")[0],
        fechaTermino: project.fechaTermino.split("T")[0],
      });
    }
  }, [project, reset]);

  const onSubmit = async (data: Partial<Proyecto>) => {
    if (!project) return;
    await updateProject(project.codigoProyecto, data);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Editar Proyecto</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label>Nombre del Proyecto</label>
            <Input {...register("nombre", { required: true })} />
          </div>

          <div>
            <label>Fecha de Inicio</label>
            <Input type="date" {...register("fechaInicio", { required: true })} />
          </div>

          <div>
            <label>Fecha de Término</label>
            <Input type="date" {...register("fechaTermino", { required: true })} />
          </div>

          <DialogFooter>
            <Button variant="outline" type="button" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">Guardar Cambios</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};