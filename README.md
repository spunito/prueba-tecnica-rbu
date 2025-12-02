Prueba Técnica: Sistema de Gestión de Desarrolladores y 
Proyectos 

## Descripción General 
  Desarrollar una aplicación web (front-end) que permita gestionar desarrolladores y 
  proyectos, con funcionalidades CRUD completas para ambas entidades y la 
  posibilidad de asignar desarrolladores a proyectos. 

## Requisitos Técnicos 
  Obligatorios: 
  • Frontend: ReactJS + TypeScript (Se recomienda usar Vite como bundler) 
  • Estilos: TailwindCSS 
  Opcionales (suman puntos adicionales): 
  • Componentes UI: ShadCN 
  • Manejo de estado global: Zustand 
  • Fetching de datos: React Query (TanStack Query) 

## Contexto del Problema 

  En una empresa de desarrollo de software, los desarrolladores pueden ser asignados 
  a múltiples proyectos simultáneamente. Tanto los desarrolladores como los 
  proyectos pueden ser activados o desactivados (soft delete) en el sistema. 
  Funcionalidades Requeridas 
1. Gestión de Desarrolladores 
  • Listar desarrolladores en una tabla con las siguientes columnas: 
  o Nombre completo 
  o RUT 
  o Correo electrónico 
  o Fecha de contratación 
  o Años de experiencia 
  o Cantidad de proyectos asignados 
  o Estado (Activo/Inactivo) 
  o Acciones (Ver detalles, Editar, Eliminar, Reactivar, Asignar a proyecto) 
  • Crear desarrolladores mediante un formulario con validaciones adecuadas 
  • Editar información de desarrolladores existentes 
  • Eliminar desarrolladores (soft delete - cambio de estado) 
  • Reactivar desarrolladores previamente desactivados 
  • Ver detalles de cada desarrollador, incluyendo sus proyectos asignados 

2. Gestión de Proyectos 
  • Listar proyectos en una tabla con las siguientes columnas: 
  o Nombre del proyecto 
  o Fecha de inicio 
  o Fecha de término 
  o Cantidad de desarrolladores asignados 
  o Estado (Activo/Inactivo) 
  o Acciones (Ver detalles, Editar, Eliminar, Reactivar, Gestionar 
  asignaciones) 
  • Crear proyectos mediante un formulario con validaciones 
  • Editar información de proyectos existentes 
  • Eliminar proyectos (soft delete - cambio de estado) 
  • Reactivar proyectos previamente desactivados 
  • Ver detalles de cada proyecto, incluyendo la lista de desarrolladores 
  asignados 

3. Gestión de Asignaciones 
  • Asignar desarrolladores a proyectos 
  • Desasignar desarrolladores de proyectos 
  • Visualizar las asignaciones actuales tanto en el detalle del desarrollador 
  como en el del proyecto 

4. Filtros y Búsqueda 
  • Implementar filtros para ambas tablas: 
  o Desarrolladores: por nombre, nivel de experiencia, estado, número de 
  proyectos asignados 
  o Proyectos: por nombre, fechas, estado, número de desarrolladores 
  asignados 

## Requerimientos de UI/UX 
  • Diseño intuitivo y responsivo 
  • Feedback visual para las acciones del usuario (confirmaciones, alertas, etc.) 
  • Transiciones suaves entre vistas 
  • Formularios con validación en tiempo real 
  • Indicadores de carga durante operaciones asíncronas 

## API y Comunicación 
  En el archivo ENDPOINTS.md entregado se encuentran todos los endpoints 
  necesarios para realizar las peticiones a la API 
  Se necesita el uso del header Authorization: Bearer TOKEN_OTORGADO para poder 
  consumir correctamente cada endpoint. 
  La URL de la API es: https://pruebas2.rbu.cl 

Entregables 
1. Repositorio de código en GitHub 
2. README con: 
o Instrucciones de instalación y ejecución 
o Descripción de la arquitectura 
o Decisiones técnicas 
o Consideraciones adicionales (de ser necesario) 
o Enlace de demostración (de ser el caso) 
3. Aplicación desplegada (opcional, suma puntos) 
Criterios de Evaluación 
1. Calidad del código (30%) 
o Estructura y organización del proyecto 
o Uso adecuado de TypeScript (tipado, interfaces, etc.) 
o Clean code y patrones de desarrollo 
o Manejo de errores 
2. Funcionalidad (35%) 
o Implementación correcta de todas las funcionalidades requeridas 
o Integración adecuada con la API 
o Manejo efectivo del estado de la aplicación 
3. Experiencia de usuario (20%) 
o Diseño intuitivo y atractivo 
o Usabilidad y accesibilidad 
o Responsive design 
o Feedback visual adecuado 
4. Uso de tecnologías recomendadas (15%) 
o Implementación correcta de TailwindCSS 
o Uso efectivo de las tecnologías opcionales (ShadCN, Zustand, React 
Query) 
Tiempo de Entrega 
El candidato tendrá 3 días calendario desde la recepción de estas instrucciones para 
completar la prueba técnica. 
¡Buena suerte!