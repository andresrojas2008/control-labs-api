# ControlLabs API

API de práctica en TypeScript con rutas modulares de Express y controladores para usuarios, ambientes, equipos, novedades, préstamos y dashboard.

## Requisitos e instalación

- Node.js 20 o superior
- npm

```bash
npm ci
cp .env.example .env
npm run dev
```

En PowerShell, copia el archivo de ejemplo con `Copy-Item .env.example .env`. La API escucha por defecto en `http://localhost:5000`.

## Build y ejecución

```bash
npm run build
npm start
```

## Base URL

`/api/v1`

## Endpoints avanzados

| Método | Ruta | Propósito |
|---|---|---|
| GET, POST | `/users` | Listar y registrar usuarios |
| GET | `/users/:id` | Consultar un usuario |
| PATCH | `/users/:id` | Actualizar parcialmente rol, estado o contraseña |
| DELETE | `/users/:id` | Eliminación lógica del usuario |
| GET, POST | `/environments` | Listar y crear ambientes |
| PATCH | `/environments/:id` | Actualizar atributos parciales del ambiente |
| GET, POST | `/equipment` | Listar (opcional `?ambienteId=...`) y registrar equipos |
| PATCH | `/equipment/:id` | Actualizar estado técnico, ubicación, ambiente o nombre |
| GET, POST | `/incidents` | Consultar historial y crear novedades |
| PATCH | `/incidents/:id` | Actualizar estado de una novedad |
| GET | `/dashboard` | Obtener contadores consolidados |

También se conservan las rutas de préstamos de la práctica anterior bajo `/loans` y `GET /health`.

## Ejemplos rápidos

Crear ambiente:

```json
{ "nombre": "Laboratorio 302", "capacidad": 30, "ubicacion": "Bloque A" }
```

Crear usuario:

```json
{ "nombre": "Ana Pérez", "email": "ana@example.test", "rol": "docente", "password": "cambiar-esta-clave" }
```

Crear equipo (usa un `ambienteId` existente):

```json
{ "nombre": "PC-01", "ambienteId": "amb-1", "estadoTecnico": "operativo" }
```

Crear novedad (asociada a equipo o ambiente):

```json
{ "descripcion": "El equipo no enciende", "equipoId": "eq-3", "prioridad": "critica" }
```

Ejemplos PATCH: `PATCH /users/usr-2` con `{ "estado": "inactivo" }`, `PATCH /environments/amb-1` con `{ "capacidad": 36 }`, `PATCH /equipment/eq-3` con `{ "estadoTecnico": "mantenimiento" }`, y `PATCH /incidents/nov-4` con `{ "estado": "en_proceso" }`.

## Nota sobre almacenamiento

Para que los endpoints puedan probarse sin una base de datos especificada por la guía, los registros se guardan temporalmente en memoria. Se reinician al detener el servidor. Es una implementación didáctica, no adecuada para producción. La contraseña se almacena en memoria como hash scrypt y nunca se devuelve en las respuestas. Para producción aún se requiere persistencia duradera, política de contraseñas y controles de autenticación/autorización.

## Estructura

```text
src/
├── app.ts
├── server.ts
├── data/store.ts
├── controllers/  # Un controlador por módulo
└── routes/       # Un router por módulo y un agregador
```

`.env`, `node_modules/` y `dist/` están excluidos por `.gitignore`; se versionan `package-lock.json`, `.env.example` y la configuración TypeScript.
