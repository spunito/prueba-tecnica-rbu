import { FolderOpen, Users } from "lucide-react";
import { Link } from "react-router-dom";

export const Sidebar = () => {

  return (
    <aside className="w-64 bg-sidebar border-r border-sidebar-border h-screen fixed flex flex-col">
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div>
            <h1 className="font-bold text-sidebar-foreground text-sm">Prueba técnica - RBU</h1> 
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2">

        <Link
          to="/desarrollador"
          className="flex items-center gap-3 px-4 py-3 rounded-lg bg-sidebar-accent text-sidebar-primary hover:bg-sidebar-accent transition-colors group"
        >
          <Users size={20} />
          <span className="text-sm font-medium">Desarrolladores</span>
        </Link>
        <Link
          to="/proyectos"
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors group"
        >
          <FolderOpen size={20} />
          <span className="text-sm font-medium">Proyectos</span>
        </Link>
      </nav>

    </aside>
  );
};

