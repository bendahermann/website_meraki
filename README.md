# TITAN ATHLETICS — Plataforma Modular para Entrenadores y Creadores Fitness

Esta plataforma fue desarrollada bajo una **arquitectura modular "marca blanca" (white-label)** lista para escalarse y replicarse para múltiples entrenadores, gimnasios o nutriólogos en México.

---

## 🚀 Cómo Iniciar el Proyecto Localmente

```bash
cd website
npm run dev
```
Abre en tu navegador: [http://localhost:3000](http://localhost:3000)

---

## 🛠️ Arquitectura Modular (Conecta y Desconecta Módulos)

Todo el comportamiento de la plataforma se controla desde un solo archivo:  
📁 `src/config/site.ts`

```typescript
export const siteConfig = {
  name: "TITAN ATHLETICS",
  trainerName: "Hermann Benda",
  currency: { code: "MXN", symbol: "$" },
  // INTERRUPTORES DE FUNCIONALIDADES
  features: {
    store: true,        // Tienda de ropa y merchandising físico
    courses: true,      // Cursos en video y academia de alumnos
    coaching: true,     // Asesorías personalizadas 1 a 1 (WhatsApp)
    cart: true,         // Carrito de compras unificado
    auth: true,         // Inicio de sesión y tracking de lecciones
    testimonials: true, // Casos de éxito y transformaciones
    newsletter: true,   // Descarga de guía en PDF (captación de correos)
    admin: true,        // Panel de control
  }
};
```
*Si cambias `store: false`, la tienda y todos sus botones desaparecerán de la web sin romper nada.*

---

## 📦 Rutas y Funcionalidades Incluidas

| Ruta | Descripción |
| :--- | :--- |
| `/` | **Landing Page de Alto Impacto:** Hero, métricas, cursos, ropa, bio del coach, testimonios y lead magnet. |
| `/cursos` | **Catálogo de Cursos:** Filtros por nivel (Principiante, Intermedio, Avanzado) e inscripción. |
| `/tienda` | **E-commerce de Ropa:** Ropa deportiva, hoodies, shakers, selector de tallas y carrito reactivo. |
| `/checkout` | **Pasarela de Pago Unificada:** Permite comprar ropa (con envío en México) y cursos en una sola orden. |
| `/academia` | **Área de Alumnos (LMS):** Dashboard personal, barra de porcentaje de progreso y acceso a cursos. |
| `/academia/curso/[slug]` | **Reproductor Protegido:** Videos protegidos contra clic derecho, sin botón de descarga y con marca de agua dinámica con el correo del alumno. |
| `/login` | **Autenticación con 1 Clic:** Acceso rápido demo como Alumno o como Administrador. |
| `/admin` | **Panel de Control:** KPIs de ventas en MXN, pedidos pendientes, gestión de cursos y control de interruptores modulares. |

---

## 🛡️ Medidas de Protección de Video

1. **Bloqueo de Clic Derecho:** Se desactiva la opción de inspeccionar o guardar el video.
2. **Atributo `nodownload`:** Se elimina el botón de descarga del reproductor nativo.
3. **Marca de Agua Dinámica:** Se estampa el correo electrónico del alumno en pantalla, disuadiendo la grabación de pantalla para piratería.
4. **Verificación de Compra:** Solo alumnos con la compra registrada tienen acceso al reproductor.

---

## 💳 Despliegue en Producción (Costo \$0 inicial)

1. Sube este repositorio a **GitHub**.
2. Conéctalo a **Vercel** (despliegue gratuito en 1 clic).
3. Conecta **Stripe México** o **Mercado Pago** para cobros automáticos.
