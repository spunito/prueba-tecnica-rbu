import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useDesarrolladorStore } from "@/store/desarrollador.store";
import type { Desarrollador } from "../types/desarrollador";

export const DesarrolladorModal = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const addDeveloper = useDesarrolladorStore((s) => s.addDeveloper);
  const { register, handleSubmit, reset } = useForm<Partial<Desarrollador>>();

  const onSubmit = async (data: Partial<Desarrollador>) => {
    data.fechaContratacion = data.fechaContratacion + "T00:00:00";
    await addDeveloper(data);
    reset();
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Agregar Nuevo Desarrollador</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          <div>
            <label className="text-sm text-foreground">Nombre</label>
            <Input {...register("nombre", { required: true, maxLength: 200 })} />
          </div>

          <div>
            <label className="text-sm text-foreground">RUT</label>
            <Input {...register("rut", { required: true, maxLength: 10 })} />
          </div>

          <div>
            <label className="text-sm text-foreground">Correo</label>
            <Input type="email" {...register("correoElectronico", { required: true, maxLength: 100 })} />
          </div>

          <div>
            <label className="text-sm text-foreground">Fecha contratación</label>
            <Input type="date" {...register("fechaContratacion", { required: true })} />
          </div>

          <div>
            <label className="text-sm text-foreground">Años de experiencia</label>
            <Input
              type="number"
              {...register("aniosExperiencia", { required: true, valueAsNumber: true, min: 0 })}
            />
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={onClose} type="button">Cancelar</Button>
            <Button type="submit">Guardar</Button>
          </DialogFooter>

        </form>
      </DialogContent>
    </Dialog>
  );
};

