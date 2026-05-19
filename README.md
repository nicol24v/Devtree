# PDEVTREE

> Una aplicación tipo LinkTree para desarrolladores: backend en TypeScript/Node.js y frontend con Vite + React/TypeScript.

**Estado:** Proyecto en desarrollo

**Tecnologías principales:**
- **Backend:** Node.js, TypeScript, Express, Mongoose (MongoDB)
- **Frontend:** Vite, React, TypeScript
- **Servicios:** Cloudinary (imágenes), JWT para autenticación

**Estructura del repositorio**
- [DevTree](DevTree/): Código del backend (API). Revisa el punto de entrada en [DevTree/src/server.ts](DevTree/src/server.ts).
- [frontend](frontend/): Aplicación frontend (Vite + React). Revisa [frontend/src/main.tsx](frontend/src/main.tsx).
- [DevTree/src/models/User.ts](DevTree/src/models/User.ts) — Modelo de usuario principal.

**Requisitos**
- Node.js >= 16
- npm o yarn
- MongoDB (local o servicio en la nube)
- Cuenta de Cloudinary (opcional para subir imágenes)

**Variables de entorno recomendadas**
Configura un archivo `.env` en `DevTree/` con al menos las siguientes variables:
- `MONGO_URI` — URI de conexión a MongoDB
- `JWT_SECRET` — Clave secreta para firmar tokens JWT
- `PORT` — Puerto del servidor (por defecto 3000)
- `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` — (si usa Cloudinary)

**Instalación y ejecución (desarrollo)**
1. Backend
```bash
cd DevTree
npm install
# Ejecuta en modo desarrollo (revisa scripts en [DevTree/package.json](DevTree/package.json))
npm run dev
```

2. Frontend
```bash
cd frontend
npm install
npm run dev
```

Si los scripts difieren, consulta los `package.json` en [DevTree/package.json](DevTree/package.json) y [frontend/package.json](frontend/package.json).

**Build y despliegue**
- Frontend: `cd frontend && npm run build` — genera los assets estáticos.
- Backend: crear un build de TypeScript y ejecutar con `node` o usando un proceso gestor (pm2, Docker, etc.).

**API y rutas**
La API se encuentra en el backend (carpeta `DevTree/src`). Documenta o expone los endpoints según convenga (autenticación, CRUD de enlaces, gestión de usuarios).

**Contribuir**
- Haz fork o crea una rama nueva para tu feature/bugfix.
- Abre pull requests descriptivos y con pruebas/local verification cuando aplique.

**Licencia**
Por defecto no está especificada; añade una licencia (por ejemplo MIT) si quieres permitir contribuciones abiertas.

---
Si quieres, puedo:
- Añadir un ejemplo de `.env.example`.
- Documentar endpoints concretos.
- Añadir comandos exactos leyendo los `package.json`.

**Resumen breve**
- **Función principal:**: Crear y gestionar una página tipo LinkTree para desarrolladores, donde agrupar enlaces y recursos personales.
- **Qué puede hacer el usuario:**: Crear, editar y eliminar links; personalizar su perfil (posible subida de imágenes con Cloudinary); autenticarse y visualizar su propia página pública.
- **Tipo de links que guarda:**: Enlaces externos (URLs), enlaces con slug personalizado para compartir, y metadatos asociados (título, descripción, imagen).
- **¿Tiene login o usuarios?:**: Sí — existe un modelo `User` en el backend y se usa JWT para autenticación (ver [DevTree/src/models/User.ts](DevTree/src/models/User.ts)).
- **Operaciones CRUD disponibles:**: Crear, leer, actualizar y eliminar enlaces; registro/autenticación de usuarios; gestión de perfil y recursos (imágenes) en Cloudinary.

**Estructura general del proyecto**
- **Frontend / Backend:**: Están separados — el backend está en la carpeta [DevTree](DevTree/) y el frontend en [frontend](frontend/).
- **Carpetas importantes (backend):**: [DevTree/src](DevTree/src) (entrada y rutas), [DevTree/src/config](DevTree/src/config) (DB, Cloudinary, CORS), [DevTree/src/middleware](DevTree/src/middleware) (autenticación, validaciones), [DevTree/src/models](DevTree/src/models) (modelos Mongoose), [DevTree/src/handlers](DevTree/src/handlers).
- **Carpetas importantes (frontend):**: [frontend/src](frontend/src) (componentes y vistas), [frontend/src/api](frontend/src/api) (conexión a la API), [frontend/src/components](frontend/src/components), [frontend/src/layouts](frontend/src/layouts).
- **¿Usa API REST?:**: Sí — el frontend consume la API del backend (hay un cliente en [frontend/src/api/DevTreeAPI.ts](frontend/src/api/DevTreeAPI.ts)).

**Cambios o mejoras que puedo simular/proponer**
- **Mejorar diseño:**: Actualizar estilos (Tailwind/HeadlessUI), accesibilidad y responsive.
- **Corregir errores:**: Revisar logs, sanitizar entradas (express-validator), y corregir rutas o typos en el backend.
- **Agregar validaciones:**: Validaciones más estrictas en backend y frontend (form validation, servidor y cliente).
- **Mejorar seguridad:**: Fortalecer manejo de JWT (refresh tokens), proteger rutas, rate-limiting, sanitización de datos, y políticas CORS más restrictivas.
- **Optimizar consultas:**: Indexar campos en MongoDB (ej: slug, userId), evitar queries N+1 y limitar campos retornados.

**Cómo ejecutar el proyecto (comandos exactos)**
- **Backend (DevTree):**: Instalar dependencias y ejecutar en modo desarrollo:

```bash
cd DevTree
npm install
npm run dev    # ejecuta `nodemon src/index.ts` según [DevTree/package.json](DevTree/package.json)
```

- **Frontend:**: Instalar dependencias y ejecutar Vite en modo desarrollo:

```bash
cd frontend
npm install
npm run dev    # ejecuta `vite` según [frontend/package.json](frontend/package.json)
```

- **Build / producción:**
	- Frontend: `cd frontend && npm run build` (genera assets con Vite).
	- Backend: `cd DevTree && npm run build && npm start` (compila TypeScript y ejecuta `dist/index.js`).

**Siguientes pasos que puedo hacer ahora**
- Añadir `.env.example` con las variables mencionadas.
- Documentar endpoints principales (auth, links CRUD).
- Implementar pruebas básicas y validar scripts de build/deploy.

---
Cambios añadidos a este archivo. Si quieres que lo formatee de otra forma o que incluya ejemplos de endpoints, dímelo y lo ajusto.
