# DevTree

DevTree es una aplicación web tipo Linktree orientada a desarrolladores, diseñada para crear y gestionar una página personalizada donde los usuarios pueden compartir enlaces, redes sociales y recursos personales desde una única URL pública.

---

# Características Principales

- Registro e inicio de sesión de usuarios mediante JWT.
- Creación, edición y eliminación de enlaces personalizados.
- Perfil público compartible mediante slug único.
- Personalización del perfil de usuario.
- Subida y gestión de imágenes usando Cloudinary.
- API REST para comunicación entre frontend y backend.
- Arquitectura separada entre cliente y servidor.

---

# Tecnologías Utilizadas

## Backend
- :contentReference[oaicite:0]{index=0}
- :contentReference[oaicite:1]{index=1}
- :contentReference[oaicite:2]{index=2}
- :contentReference[oaicite:3]{index=3}
- :contentReference[oaicite:4]{index=4}
- JWT Authentication
- Cloudinary

## Frontend
- :contentReference[oaicite:5]{index=5}
- :contentReference[oaicite:6]{index=6}
- TypeScript
- TailwindCSS

---

# Arquitectura del Proyecto

El proyecto está dividido en dos partes principales:

```txt
pDEVTREE/
│
├── DevTree/      # Backend API REST
└── frontend/     # Frontend React + Vite
```

---

# Estructura del Backend

```txt
DevTree/src/
│
├── config/       # Configuración DB, Cloudinary y CORS
├── handlers/     # Lógica de controladores
├── middleware/   # Autenticación y validaciones
├── models/       # Modelos Mongoose
├── routes/       # Rutas API
└── index.ts      # Punto de entrada
```

---

# Estructura del Frontend

```txt
frontend/src/
│
├── api/          # Cliente API
├── components/   # Componentes reutilizables
├── layouts/      # Layouts principales
├── views/        # Vistas y páginas
└── main.tsx
```

---

# Funcionalidades CRUD

La aplicación permite:

- Crear enlaces personalizados.
- Visualizar enlaces públicos y privados.
- Editar enlaces existentes.
- Eliminar enlaces.
- Gestionar perfiles de usuario.
- Subir imágenes de perfil.
- Autenticación y autorización mediante JWT.

---

# Instalación y Ejecución

## Clonar el repositorio

```bash
git clone https://github.com/nicol24v/Devtree.git
```

---

# Backend

## Entrar al backend

```bash
cd DevTree
```

## Instalar dependencias

```bash
npm install
```

## Ejecutar en desarrollo

```bash
npm run dev
```

---

# Frontend

## Entrar al frontend

```bash
cd frontend
```

## Instalar dependencias

```bash
npm install
```

## Ejecutar en desarrollo

```bash
npm run dev
```

---

# Build de Producción

## Frontend

```bash
cd frontend
npm run build
```

## Backend

```bash
cd DevTree
npm run build
npm start
```

---

# Variables de Entorno

Crear un archivo `.env` en el backend con variables similares a:

```env
PORT=4000
MONGO_URI=
JWT_SECRET=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

---

# Seguridad Implementada

- Autenticación basada en JWT.
- Protección de rutas privadas.
- Middleware de validación.
- Sanitización de entradas.
- Configuración CORS.
- Manejo seguro de contraseñas.

---

# Posibles Mejoras Futuras

- Implementación de Refresh Tokens.
- Rate Limiting.
- Tests automatizados.
- Mejoras de accesibilidad.
- Optimización de consultas MongoDB.
- Dashboard analítico de visitas.
- Mejoras UI/UX responsive.

---

# Estado del Proyecto

Proyecto actualmente en desarrollo y mejora continua.

---

# Autor

Nicole Vizuete
