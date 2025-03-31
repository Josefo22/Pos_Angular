# Sistema POS (Point of Sale)

Este proyecto es un sistema de punto de venta (POS) desarrollado como parte de la materia de Programación Orientada a Objetos. El sistema está construido con una arquitectura moderna que separa el backend y frontend para mayor escalabilidad y mantenibilidad.

## Tecnologías Utilizadas

### Backend
- **Lenguaje**: C# (.NET 7.0)
- **Framework**: ASP.NET Core Web API
- **ORM**: Entity Framework Core
- **Base de datos**: MySQL
- **Patrones**: Arquitectura en capas, DTO (Data Transfer Objects), Servicios

### Frontend
- **Framework**: Angular
- **Lenguaje**: TypeScript
- **Estilos**: Bootstrap 5
- **Comunicación**: HttpClient para consumo de API

## Estructura del Proyecto

### Backend (C#)
- **Models**: Clases de entidades que representan las tablas de la base de datos
- **DTOs**: Objetos de transferencia de datos para comunicación con el frontend
- **Controllers**: Controladores API REST para manejar solicitudes HTTP
- **Services**: Lógica de negocio
- **Data**: Contexto de Entity Framework y configuraciones de base de datos

### Frontend (Angular)
- **Models**: Interfaces que representan la estructura de datos
- **Services**: Servicios para consumir la API del backend
- **Components**: Componentes de UI para interactuar con el usuario
- **Routes**: Configuración de navegación de la aplicación

## Módulos Actuales

- **Gestión de Productos**: CRUD completo de productos (Creación, Lectura, Actualización, Eliminación)

## Módulos Planificados

- **Gestión de Categorías**: Clasificación de productos
- **Gestión de Ventas**: Registro de transacciones de venta
- **Gestión de Clientes**: Información de clientes
- **Gestión de Usuarios**: Administración de usuarios del sistema
- **Reportes**: Generación de informes y estadísticas
- **Inventario**: Control de stock y alertas

## Configuración del Proyecto

### Requisitos Previos
- .NET 7.0 SDK
- Node.js y npm
- Angular CLI
- MySQL Server

### Configuración del Backend
1. Asegúrate de tener MySQL instalado y en ejecución
2. Configura la cadena de conexión en `appsettings.json`
3. Ejecuta las migraciones de Entity Framework:
   ```
   cd BackendApp
   dotnet ef database update
   ```
4. Inicia el servidor:
   ```
   dotnet run
   ```
   El backend estará disponible en: https://localhost:7038

### Configuración del Frontend
1. Instala las dependencias:
   ```
   cd frontend-app
   npm install
   ```
2. Inicia el servidor de desarrollo:
   ```
   ng serve
   ```
   El frontend estará disponible en: http://localhost:4200

## Convenciones de Código

- **Backend**: Seguimos las convenciones de C# (.NET)
- **Frontend**: Seguimos las convenciones de Angular
- **Base de datos**: Nombres de tablas en plural, claves primarias como Id

## Contribuidores

[Lista de estudiantes que trabajan en este proyecto]

## Licencia

Este proyecto es parte de un trabajo académico y está disponible para fines educativos.

## Capturas de Pantalla

[Se agregarán conforme avance el desarrollo] 