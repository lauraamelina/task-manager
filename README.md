# tasks-manager

App que permite a los usuarios crear, leer, actualizar y eliminar tareas.

# Documentación de la API

## Autenticación

Todos los puntos finales, excepto la creación de usuarios y el inicio de sesión, requieren autenticación utilizando Tokens de Seguridad JSON Web (JWT). El token debe incluirse en el encabezado de Autorización de la solicitud HTTP.

Ejemplo:
Authorization: Bearer <token>

## URL Base

http://localhost:8080

## Puntos finales

### Usuarios

#### GET /users/

- Descripción: Recupera todos los usuarios.
- Autenticación: Requerida

#### POST /users/

- Descripción: Crea un nuevo usuario.
- Autenticación: No requerida

#### POST /users/login

- Descripción: Autentica y recupera el token JWT.
- Autenticación: No requerida

#### POST /users/email

- Descripción: Encuentra usuario por correo electrónico.
- Autenticación: Requerida

#### GET /users/:id

- Descripción: Encuentra usuario por ID.
- Autenticación: Requerida

#### PUT /users/:id

- Descripción: Actualiza la información del usuario.
- Autenticación: Requerida

### Tareas

#### GET /task/

- Descripción: Recupera todas las tareas.
- Autenticación: Requerida

#### POST /task/

- Descripción: Crea una nueva tarea.
- Autenticación: Requerida

#### GET /task/:id

- Descripción: Encuentra tarea por ID.
- Autenticación: Requerida

#### PUT /task/:id

- Descripción: Actualiza la información de la tarea.
- Autenticación: Requerida

#### DELETE /task/:id

- Descripción: Elimina una tarea.
- Autenticación: Requerida

#### PATCH /task/status/:id

- Descripción: Cambia el estado de la tarea.
- Autenticación: Requerida
