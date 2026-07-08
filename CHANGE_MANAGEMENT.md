# Gestión del Cambio

Este documento registra los cambios solicitados sobre el sistema PDEVTREE: qué se pidió, por qué, quién fue responsable de aprobarlo/implementarlo y cuándo. Sirve como evidencia del proceso de control de cambios dentro de la Gestión de la Configuración de Software.

---

## Cambio CR-001: Mensaje de error de email duplicado (iteración 1)

- **Cambio solicitado:** Modificar el mensaje de error que se muestra cuando un usuario intenta registrarse con un email que ya existe en el sistema.
- **Motivo del cambio:** El mensaje original, `"Un usuario con ese mail ya esta registrado"`, no le indicaba al usuario qué hacer a continuación y tenía un error de tildes. Se solicitó un mensaje más claro y accionable.
- **Responsable:** Madelaine Saad (msaado@unemi.edu.ec)
- **Fecha de aprobación:** 2026-05-31
- **Estado:** Implementado
- **Commit:** [`ba1168a`](../../commit/ba1168af2434f378e7237c7e3eda344faa35205f) — `fix: update duplicate email error message`
- **Archivo modificado:** `DevTree/src/handlers/index.ts`

**Implementación:**

```diff
- const error = new Error('Un usuario con ese mail ya esta registrado')
+ const error = new Error('Email ya registrado, por favor utiliza otro email, este ya pertenece a otro usuario')
```

---

## Cambio CR-002: Mensaje de error de email duplicado (iteración 2)

- **Cambio solicitado:** Acortar y simplificar el mensaje introducido en CR-001.
- **Motivo del cambio:** El mensaje de la iteración anterior, aunque más claro, resultaba demasiado largo para el formulario de registro. Se pidió reducirlo manteniendo la claridad para el usuario.
- **Responsable:** Nicole Vizuete (vizuetenicol@gmail.com)
- **Fecha de aprobación:** 2026-06-05
- **Estado:** Implementado
- **Commit:** [`47a0ca7`](../../commit/47a0ca701c8d3a82db893cc9129cba72ddfce5c3) — `Fix: Cambio en el mensaje de email de el formulario registro`
- **Archivo modificado:** `DevTree/src/handlers/index.ts`

**Implementación:**

```diff
- const error = new Error('Email ya registrado, por favor utiliza otro email, este ya pertenece a otro usuario')
+ const error = new Error('Email ya registrado, por favor utiliza otro email')
```

---

## Resumen del historial

| ID | Cambio | Responsable | Fecha de aprobación | Estado |
|----|--------|-------------|----------------------|--------|
| CR-001 | Mensaje de error más claro | Madelaine Saad | 2026-05-31 | Implementado |
| CR-002 | Mensaje de error simplificado | Nicole Vizuete | 2026-06-05 | Implementado |

El mensaje final, vigente en el código (`DevTree/src/handlers/index.ts`), es:

> `"Email ya registrado, por favor utiliza otro email"`
