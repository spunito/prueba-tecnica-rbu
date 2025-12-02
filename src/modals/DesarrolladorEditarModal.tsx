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
import { useDesarrolladorStore } from "@/store/desarrollador.store";
import type { Desarrollador } from "@/types/desarrollador";
import { useEffect } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
  developer: Desarrollador | null;
}

export const DesarrolladorEditarModal = ({ open, onClose, developer }: Props) => {
  const updateDeveloper = useDesarrolladorStore((s) => s.updateDeveloper);

  const { register, handleSubmit, reset } = useForm<Partial<Desarrollador>>({
    defaultValues: developer || {},
  });

  
  useEffect(() => {
    if (developer) reset(developer);
  }, [developer, reset]);

  const onSubmit = async (data: Partial<Desarrollador>) => {
    if (!developer) return;
    await updateDeveloper(developer.codigoDesarrollador, data);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Editar Desarrollador</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          <div>
            <label>Nombre</label>
            <Input {...register("nombre", { required: true })} />
          </div>

          <div>
            <label>RUT</label>
            <Input {...register("rut", { required: true })} />
          </div>

          <div>
            <label>Correo</label>
            <Input {...register("correoElectronico", { required: true })} />
          </div>

          <div>
            <label>Fecha contratación</label>
            <Input type="date" {...register("fechaContratacion")} />
          </div>

          <div>
            <label>Años experiencia</label>
            <Input type="number" {...register("aniosExperiencia", { valueAsNumber: true })} />
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
