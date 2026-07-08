
# **PDEVTREE**

PDEVTREE es una aplicación estilo LinkTree pensada para desarrolladores: permite crear un perfil público con enlaces, redes sociales y recursos personales. El proyecto está dividido en dos carpetas principales: el backend (API REST) y el frontend (aplicación React + Vite).

**Estado:** en desarrollo

**Repositorio:** [DevTree](DevTree/) (backend) + [frontend](frontend/) (cliente)

**Contacto / Autor:** Nicole Vizuete

---

**Tecnologías principales**

- Backend:
	- Node.js (TypeScript)
	- Express 5
	- Mongoose (MongoDB)
	- JWT (`jsonwebtoken`) para autenticación
	- Cloudinary para gestión de imágenes
	- `bcrypt` para hashing de contraseñas
	- Otras: `dotenv`, `cors`, `express-validator`, `formidable`
- Frontend:
	- React (TypeScript)
	- Vite
	- TailwindCSS
	- `react-router-dom`, `react-hook-form`
	- `@tanstack/react-query` para manejo de datos
	- `axios` para llamadas HTTP
	- UI/UX: `@headlessui/react`, `@heroicons/react`, `sonner`

Secciones técnicas clave:
- La API del backend está en [DevTree/src](DevTree/src/). El punto de entrada usado en desarrollo es `src/index.ts`.
- La aplicación cliente está en [frontend/src](frontend/src/) con `main.tsx` como punto de arranque.

---

**Requisitos**

- Node.js >= 16
- npm o yarn
- MongoDB (local o Atlas)
- (Opcional) cuenta de Cloudinary para subir imágenes

---

**Variables de entorno (ejemplo)**
Coloca un archivo `.env` en la carpeta `DevTree/` con estas variables mínimas:

```
PORT=4000
MONGO_URI=mongodb://localhost:27017/devtree
JWT_SECRET=una_clave_segura

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

También puedes crear un archivo `DevTree/.env.example` usando estos valores (sin claves reales).

---

**Instalación y ejecución (paso a paso)**

1) Clonar el repositorio

```bash
git clone <repositorio-url>
cd pDEVTREE
```

2) Backend (API)

```bash
cd DevTree
npm install
# Desarrollo (usa nodemon para recarga automática)
npm run dev
# Build de producción
npm run build
npm start
```

Scripts disponibles (backend):
- `dev`: `nodemon src/index.ts`
- `dev:api`: `nodemon src/index.ts --api`
- `build`: `tsc`
- `start`: `node dist/index.js`

3) Frontend (cliente)

```bash
cd frontend
npm install
npm run dev
# Build de producción
npm run build
# Previsualizar build
npm run preview
```

Scripts disponibles (frontend):
- `dev`: `vite`
- `build`: `tsc -b && vite build`
- `preview`: `vite preview`
- `lint`: `eslint .`

---

**Uso con Docker**

- Requisitos: `Docker` y `Docker Compose` instalados en tu máquina.

- Variables de entorno: crea un archivo `.env` en la raíz del proyecto (junto a `docker-compose.yml`) con al menos estas variables:

```
PORT=4001
MONGO_ROOT_USER=admin
MONGO_ROOT_PASSWORD=secret
MONGO_URI=mongodb://admin:secret@mongo:27017/devtree?authSource=admin
JWT_SECRET=una_clave_segura
VITE_API_URL=http://localhost:4001
# Opcional (Cloudinary)
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

- Levantar la aplicación (backend, frontend y MongoDB) usando `docker-compose`:

```bash
# Construye las imágenes y levanta los contenedores en segundo plano
docker compose up --build -d

# Ver logs en tiempo real
docker compose logs -f

# Parar y eliminar contenedores, redes y volúmenes anónimos
docker compose down -v
```

- Puertos por defecto (según `docker-compose.yml`):
	- Frontend: http://localhost:3000
	- Backend: http://localhost:4001

- Alternativa: ejecutar servicios individualmente usando los `Dockerfile` dentro de `DevTree/` y `frontend/` si prefieres control fino.

Si quieres, puedo añadir un `DevTree/.env.example` y un `frontend/.env.example` prellenados basados en estas variables.

---

**Despliegue continuo (Render)**

El proyecto incluye un archivo [`render.yaml`](render.yaml) (Render Blueprint) que define dos servicios desplegados automáticamente en cada push a `main`:

- `devtree-backend`: Web Service que construye `DevTree/Dockerfile`.
- `devtree-frontend`: Static Site que corre `npm run build` sobre `frontend/` y sirve `frontend/dist`.

Pasos para desplegar:

1. Crea una cuenta gratuita en [Render](https://render.com) y en [MongoDB Atlas](https://www.mongodb.com/atlas) (tier gratuito M0) si aún no tienes un cluster.
2. En Render, elige **New > Blueprint** y conecta este repositorio de GitHub. Render detecta `render.yaml` automáticamente y crea ambos servicios.
3. Completa las variables marcadas como manuales en el dashboard de cada servicio:
   - Backend: `MONGO_URI`, `JWT_SECRET`, `CLOUDINARY_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`.
   - Ambos servicios ya traen `FRONTEND_URL` y `VITE_API_URL` con la URL esperada (`https://devtree-frontend.onrender.com` / `https://devtree-backend.onrender.com`). Si Render asigna un nombre distinto (por colisión de subdominio), actualiza ambas variables para que coincidan con las URLs reales y vuelve a desplegar.
4. El auto-deploy nativo de Render está desactivado a propósito (`autoDeploy: false`). El deploy real lo dispara el workflow de GitHub Actions ([`.github/workflows/ci.yml`](.github/workflows/ci.yml)) **solo si el build de backend y frontend pasan**, así el pipeline queda: push → CI compila → si todo pasa, CD despliega. Para activarlo:
   - En el dashboard de cada servicio de Render, ve a **Settings > Deploy Hook** y copia la URL.
   - En GitHub, ve a **Settings > Secrets and variables > Actions** de este repositorio y crea dos secrets: `RENDER_DEPLOY_HOOK_BACKEND` y `RENDER_DEPLOY_HOOK_FRONTEND`, con esas URLs.
5. Cada push a `main` dispara el pipeline completo (CI + CD) automáticamente, sin pasos manuales.

Nota: el plan gratuito de Render "duerme" el backend tras un período de inactividad; la primera petición después de eso puede tardar unos segundos en responder.

---

**Uso sin código (ejecutar contenedores preconstruidos)**

Si no quieres clonar o compilar el código y prefieres ejecutar la aplicación únicamente con contenedores Docker preconstruidos (imágenes públicas), tienes dos opciones:

- Opción A — Usando imágenes públicas (recomendado si las imágenes están publicadas en Docker Hub o un registry):

1. Crear una red Docker para que los contenedores se comuniquen:

```bash
docker network create devtree_net
```

2. Levantar MongoDB (imagen oficial):

```bash
docker run -d --name devtree_mongo --network devtree_net \
	-e MONGO_INITDB_ROOT_USERNAME=admin \
	-e MONGO_INITDB_ROOT_PASSWORD=secret \
	-e MONGO_INITDB_DATABASE=devtree \
	-v devtree_mongo_data:/data/db \
	mongo:7
```

3. Descargar y ejecutar las imágenes públicas del backend y frontend (sustituye `youruser` por el repo del registro):

```bash
docker pull youruser/pdevtree-backend:latest
docker pull youruser/pdevtree-frontend:latest

docker run -d --name devtree_backend --network devtree_net \
	-e MONGO_URI="mongodb://admin:secret@devtree_mongo:27017/devtree?authSource=admin" \
	-e JWT_SECRET=una_clave_segura \
	-e FRONTEND_URL=http://localhost:3000 \
	-p 4001:4000 \
	youruser/pdevtree-backend:latest

docker run -d --name devtree_frontend --network devtree_net \
	-e VITE_API_URL=http://localhost:4001 \
	-p 3000:80 \
	youruser/pdevtree-frontend:latest
```

4. Accede a la aplicación en http://localhost:3000

- Opción B — Usando `docker compose` pero sin construir (usando imágenes públicas): crea un archivo `docker-compose.images.yml` con este contenido y ejecuta `docker compose -f docker-compose.images.yml up -d`:

```yaml
version: '3.9'
services:
	mongo:
		image: mongo:7
		environment:
			MONGO_INITDB_ROOT_USERNAME: admin
			MONGO_INITDB_ROOT_PASSWORD: secret
			MONGO_INITDB_DATABASE: devtree
		volumes:
			- mongo_data:/data/db

	backend:
		image: youruser/pdevtree-backend:latest
		depends_on:
			- mongo
		environment:
			MONGO_URI: mongodb://admin:secret@mongo:27017/devtree?authSource=admin
			JWT_SECRET: una_clave_segura
			FRONTEND_URL: http://localhost:3000
		ports:
			- "4001:4000"

	frontend:
		image: youruser/pdevtree-frontend:latest
		depends_on:
			- backend
		ports:
			- "3000:80"

volumes:
	mongo_data:
```

Notas importantes:
- Si no existen imágenes públicas, necesitarás construir las imágenes localmente o que yo las publique en un registry para ti.
- Mantén variables sensibles (JWT, API keys) fuera de repositorios públicos; usa un archivo `.env` o secretos del entorno del host.
- Si quieres, puedo construir las imágenes, subirlas a Docker Hub/GitHub Container Registry y actualizar el README con los nombres finales.


**Estructura principal (resumen)**

- `DevTree/` — Backend
	- `src/config/` — configuración (DB, Cloudinary, CORS)
	- `src/middleware/` — autenticación, validaciones
	- `src/models/` — modelos Mongoose (ver [DevTree/src/models/User.ts](DevTree/src/models/User.ts))
	- `src/handlers/` y `src/routes/` — lógica y rutas de la API
	- `src/index.ts` — punto de entrada
- `frontend/` — Cliente React + Vite
	- `src/components/`, `src/views/`, `src/layouts/` — UI
	- `src/api/` — cliente HTTP usando `axios`

---

**API (alto nivel)**

La API ofrece endpoints para:
- Registro / login (emitiendo JWT)
- CRUD de enlaces del usuario
- Gestión de perfil (imagen con Cloudinary)

Para detallar endpoints exactos, puedo generar una documentación OpenAPI/Swagger o un listado de rutas leyendo la carpeta `DevTree/src/routes`.

---

**Buenas prácticas y recomendaciones**

- Mantén el `JWT_SECRET` fuera del repositorio.
- Usa variables de entorno para credenciales (MongoDB, Cloudinary).
- En producción, ejecuta la app con un proceso gestor (pm2) o en contenedores/Docker.
- Añade tests automatizados y CI para proteger cambios.

---

**Contribuir**

- Fork + branch con nombre descriptivo `feature/xxx` o `fix/xxx`.
- PRs claros con descripción y pasos para reproducir.
- Añade pruebas si modificas lógica crítica.

---

Si quieres, puedo:
- añadir un archivo `DevTree/.env.example` con las variables anteriores;
- generar documentación de endpoints automáticamente leyendo las rutas;
- añadir instrucciones de Docker / `docker-compose`.


