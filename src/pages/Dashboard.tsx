import { Desarrollador } from './desarrollador/Desarrollador';


export const Dashboard = () => {

    return (
    <div>
        <div className=" bg-background ml-64">
            {/* Texto */}
            <div className="flex w-full justify-center ">
                <h1 className="text-white text-3xl">Sistema de Gestión de Desarrolladores y Proyectos </h1>
            </div>
            {/* Botones */}
            <div className="w-full px-8">

                <Desarrollador />
               
            </div>

        </div>

    </div>
  )
}
