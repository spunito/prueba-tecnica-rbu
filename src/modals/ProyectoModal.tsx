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
import type { Proyecto } from '../types/proyectos';


export const ProyectoModal = ({ open, onClose}: {open: boolean; onClose: () => void}) => {

  const addProyecto = useProyectoStore((s) => s.addProject);

  const { register, handleSubmit, reset } = useForm<Partial<Proyecto>>();

  const formatToDateTime = (date: string) => {
    return `${date}T00:00:00`;
  };

  const onSubmit = async (data: Partial<Proyecto>) => {
    
    const formattedPayload = {
      nombre: data.nombre,
      fechaInicio: formatToDateTime(data.fechaInicio!),
      fechaTermino: formatToDateTime(data.fechaTermino!),
    };

    await addProyecto(formattedPayload);
    reset();
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Crear Proyecto</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          <div>
            <label className="text-sm text-foreground">Nombre del proyecto</label>
            <Input {...register("nombre", { required: true })} />
          </div>

          <div>
            <label className="text-sm text-foreground">Fecha de inicio</label>
            <Input type="date" {...register("fechaInicio", { required: true })} />
          </div>

          <div>
            <label className="text-sm text-foreground">Fecha de término</label>
            <Input type="date" {...register("fechaTermino", { required: true })} />
          </div>

          <DialogFooter>
            <Button variant="outline" type="button" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">Crear Proyecto</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
