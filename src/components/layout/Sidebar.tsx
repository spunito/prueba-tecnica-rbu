import { FolderOpen, Menu, Users, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

export const Sidebar = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Botón hamburguesa mobile */}
      <button
        onClick={() => setOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-sidebar text-sidebar-foreground border border-sidebar-border"
      >
        <Menu size={22} />
      </button>

      {/* Fondo oscuro cuando el sidebar está abierto */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-screen w-64 bg-sidebar border-r border-sidebar-border 
          flex flex-col transform transition-transform duration-300 z-50
          ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        <div className="p-6 border-b border-sidebar-border flex items-center justify-between md:justify-start">
          <h1 className="font-bold text-sidebar-foreground text-sm">
            Prueba técnica - RBU
          </h1>

          <button
            onClick={() => setOpen(false)}
            className="md:hidden p-1 ml-2 text-sidebar-foreground"
          >
            <X size={22} />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <Link
            to="/desarrollador"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 px-4 py-3 rounded-lg bg-sidebar-accent text-sidebar-primary hover:bg-sidebar-accent transition-colors"
          >
            <Users size={20} />
            <span className="text-sm font-medium">Desarrolladores</span>
          </Link>

          <Link
            to="/proyectos"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
          >
            <FolderOpen size={20} />
            <span className="text-sm font-medium">Proyectos</span>
          </Link>
        </nav>
      </aside>
    </>
  );
};
