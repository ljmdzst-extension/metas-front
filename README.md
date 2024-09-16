# Aplicaciones Secretaría de Extensión y Cultura

Versión actualizada y unificación de sistemas utilizados en la Secretaría de Extensión y Cultura de la UNL.

## Tabla de Contenidos

- [Descripción](#descripción)
- [Planificaciones y Resultados](#planificaciones-y-resultados)
- [Gestor de Proyectos de Extensión](#gestor-de-proyectos-de-extensión)
- [Gestor P.E.E.E](#gestor-peee)
- [Instalación](#instalación)
- [Uso](#uso)
- [Estructura de Carpetas](#estructura-de-carpetas)


## Descripción

Este proyecto tiene como objetivo unificar y mejorar los sistemas utilizados en la Secretaría de Extensión y Cultura de la UNL.

### Planificaciones y Resultados

La plataforma de planificaciones y resultados de actividades permite simplificar el proceso de planificación y registro de las propuestas desarrolladas por la Secretaría de Extensión y Cultura.

### Gestor de Proyectos de Extensión

Actualmente en desarrollo.

### Gestor P.E.E.E

Actualmente en desarrollo.

## Instalación

Sigue los pasos a continuación para instalar y configurar el proyecto en tu máquina local.

1. **Clonar el repositorio:**

   ```bash
   git clone https://github.com/ljmdzst-extension/extension-front
   ```

2. **Instalar las dependencias:**

   ```bash
    npm install
   ```

3. **Iniciar el servidor en modo desarrollo:**

   ```bash
   npm run dev
   ```

4. **Construir para producción:**
   ```bash
   npm run build
   ```

## Uso

Una vez que hayas instalado y configurado el proyecto, puedes usar los siguientes comandos para desarrollarlo y ejecutarlo:

### Tutoriales en Video

#### Tutorial para Programas

[![Video](https://img.youtube.com/vi/AEZ0sKvM9dU/hqdefault.jpg)](https://www.youtube.com/watch?v=AEZ0sKvM9dU)

#### Tutorial para Áreas

[![Video](https://img.youtube.com/vi/0YO14hvKQXE/hqdefault.jpg)](https://www.youtube.com/watch?v=0YO14hvKQXE)

## Estructura de Carpetas

La estructura de carpetas del proyecto es la siguiente:

```bash
├── index.html
├── package.json
├── package-lock.json
├── public
├── README.md
├── src
│   ├── App.css
│   ├── App.tsx
│   ├── assets
│   ├── components
│   ├── hooks
│   ├── index.css
│   ├── main.tsx
│   ├── mocks
│   ├── navigation
│   ├── pages
│   ├── redux
│   ├── services
│   ├── types
│   ├── utils
│   └── vite-env.d.ts
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```
