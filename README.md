# Prueba Técnica — Gestión de Proyectos y Desarrolladores

Aplicación web creada para gestionar desarrolladores y proyectos, permitiendo:

- Crear, editar, eliminar y reactivar desarrolladores y proyectos.
- Asignar y desasignar desarrolladores a proyectos.
- Visualizar detalle individual de cada entidad.
- Filtrar proyectos por nombre, estado, fecha y cantidad de desarrolladores.
- Arquitectura modular con hooks, stores globales y separación clara de responsabilidades.

## Tecnologías Utilizadas

- React + TypeScript
- Zustand (estado global)
- React Router DOM
- Axios (cliente HTTP)
- TailwindCSS + componentes propios
- SweetAlert2 (notificaciones)
- Arquitectura basada en módulos (`api/`, `hooks/`, `store/`, `pages/`, `modals/`)

## Instalación y Ejecución

### 1. Clonar repositorio

```bash
git clone https://github.com/usuario/prueba-tecnica.git
cd prueba-tecnica
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Si tu API requiere variables como `VITE_API_URL`, crea un archivo `.env`:

```env
VITE_API_URL=http://localhost:3000
```

### 4. Ejecutar en desarrollo

```bash
npm run dev
```

### 5. Construir para producción

```bash
npm run build
```

## Arquitectura del Proyecto

```
src/
│── api/
│   ├── desarrollador.api.ts
│   ├── proyectos.api.ts
│   └── asignaciones.api.ts
│
│── components/
│── hooks/
│   ├── useDesarrolladorLogica.ts
│   └── useProyecto.ts
│
│── modals/
│── pages/
│   ├── desarrollador/
│   └── proyectos/
│
│── store/
│   ├── desarrollador.store.ts
│   └── proyectos.store.ts
│
└── types/
```

### Explicación rápida

- **api/** → Toda la comunicación con el backend usando Axios
- **store/** → Estado global con Zustand, un store por módulo
- **hooks/** → Encapsulan la lógica reutilizable (CRUD, acciones, filtros)
- **modals/** → Formularios de creación/edición
- **pages/** → Vistas principales
- **components/** → UI reutilizable

## Decisiones Técnicas

### Zustand como manejador de estado

Se eligió Zustand por ser:

- Muy liviano
- Fácil de escalar
- Ideal para proyectos modulares
- API simple y predecible

### API modularizada

Cada entidad posee su propio archivo `*.api.ts`, lo que permite:

- Separación clara entre UI y lógica de datos
- Reutilización
- Testeo más fácil

### Hooks personalizados

Ejemplos:

- `useDesarrolladorLogica` → eliminar, editar, reactivar, navegación, modales
- `useProyecto` → filtros (search, estado, fechas, desarrolladores)

Esto reduce lógica de las vistas y mejora la mantenibilidad.

### Interfaz consistente y mínima

Tailwind + componentes reutilizables permiten:

- Diseño limpio
- Rápida iteración
- Estilos consistentes en toda la app

### SweetAlert2 para UX clara

Confirmaciones visuales para acciones sensibles (eliminar/desasignar) evitando errores del usuario.

## Endpoints Integrados

### Desarrolladores

- `GET /api/desarrolladores`
- `POST /api/desarrolladores`
- `PUT /api/desarrolladores/:codigoDesarrollador`
- `DELETE /api/desarrolladores/:codigoDesarrollador`
- `PUT /api/desarrolladores/:codigoDesarrollador/reactivar`

### Proyectos

- `GET /api/proyectos`
- `POST /api/proyectos`
- `DELETE /api/proyectos/:codigoProyecto`
- `PUT /api/proyectos/:codigoProyecto/reactivar`


### Asignaciones

- `POST /api/proyectos/:codigoProyecto/desarrolladores/:codigoDesarrollador`
- `DELETE /api/proyectos/:codigoProyecto/desarrolladores/:codigoDesarrollador`
- `GET /api/proyectos/:codigoProyecto/desarrolladores`

## Funcionalidades Implementadas

- CRUD completo de desarrolladores con modal, edición inline y soft delete + reactivación.
- CRUD completo de proyectos con datos principales + cálculo automático de duración.
- Asignación de desarrolladores desde lista de Desarrolladores y detalle de Desarrollador.
- Desasignación desde Detalle de Proyecto incluye confirmación con SweetAlert2.
- Filtros completos en proyectos: búsqueda por nombre, estados (activo/inactivo), fecha y rango de cantidad de desarrolladores.

## Enlace de demostración

Deploy en Vercel/Netlify: [https://prueba-tecnica-jvddz98jf-axel-munozs-projects.vercel.app/proyectos](https://prueba-tecnica-jvddz98jf-axel-munozs-projects.vercel.app/proyectos)

## Autor

**Axel Andrés Muñoz Abarca**

Desarrollador Frontend / Full Stack

- Email: axelmunozabarca@gmail.com
- LinkedIn: [https://www.linkedin.com/in/axel-munoz-abarca/](https://www.linkedin.com/in/axel-munoz-abarca/)
- GitHub: [https://github.com/spunito](https://github.com/spunito)

## ¿Que falto?

- No lo pude hacer responsive por falta de tiempo.
- Mejoras en UI 
- Se pudo mejorar las funciones