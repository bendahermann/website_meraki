# 🌐 SITIO BASE — Boilerplate Modular & E-Commerce Starter (HBData)

> **Plantilla base estándar, modular y moderna para la creación acelerada de sitios web de alto impacto, catálogos de productos y academias digitales.**

Diseñada bajo una arquitectura **marca blanca (white-label)** totalmente parametrizada. Con esta base puedes desplegar rápidamente sitios web para cualquier cliente o proyecto futuro (por ejemplo, *Meraki*, marcas de retail, servicios profesionales o plataformas educativas) simplemente configurando un solo archivo central.

---

## ⚡ Stack Tecnológico

- **Framework:** [Next.js](https://nextjs.org/) (App Router con React Server Components & Turbopack)
- **Biblioteca UI:** [React](https://react.dev/) 19
- **Tipado:** [TypeScript](https://www.typescriptlang.org/)
- **Estilos:** [Tailwind CSS](https://tailwindcss.com/) v4
- **Iconografía:** [Lucide React](https://lucide.dev/)
- **Estado Global:** Context API (`CartContext` y `AuthContext` reactivos con persistencia en `localStorage`)

---

## 🚀 Inicio Rápido (Creación de un Nuevo Proyecto)

### 1. Duplica o clona la carpeta base
Copia la carpeta `website` en el directorio de tu nuevo proyecto (por ejemplo, `Meraki\website`):

```bash
# Ejemplo:
cp -r website MiNuevoProyecto/website
cd MiNuevoProyecto/website
```

### 2. Ejecuta el script de configuración automática
```bash
npm run setup
```
> *Este comando genera automáticamente tu `.env.local` a partir de `.env.example` si no existe.*

### 3. Instala las dependencias y corre el servidor local
```bash
npm install
npm run dev
```

Abre en tu navegador: **[http://localhost:3000](http://localhost:3000)**

---

## 🛠️ Personalización en 1 Solo Archivo

Toda la identidad, enlaces, textos y módulos activos se controlan centralmente desde:  
📁 **`src/config/site.ts`**

```typescript
export const siteConfig = {
  name: "NOMBRE DE TU MARCA",
  shortName: "Marca",
  tagline: "Propuesta de valor o slogan",
  description: "Descripción general para SEO y presentación",
  currency: {
    code: "MXN",
    symbol: "$",
    locale: "es-MX",
  },
  contact: {
    email: "contacto@tudominio.com",
    whatsapp: "+52 55 1234 5678",
    location: "Ciudad de México, México",
    instagram: "https://instagram.com/...",
    // ...
  },
  // INTERRUPTORES DE FUNCIONALIDADES MODULARES
  features: {
    store: true,        // Catálogo de productos físicos y variantes
    courses: true,      // Academia digital, lecciones y reproductor
    services: true,     // Botones de cotización o asesoría 1 a 1
    cart: true,         // Carrito de compras reactivo lateral
    auth: true,         // Sistema de login de usuarios/alumnos
    testimonials: true, // Sección de reseñas y casos de éxito
    newsletter: true,   // Formulario de suscripción / Lead magnet
    admin: true,        // Panel de control administrativo demo
  },
};
```

> **Ventaja Modular:** Si un cliente solo necesita catálogo físico y no cursos, simplemente cambia `courses: false` y todas las referencias, botones y rutas relacionadas se ocultan limpiamente de la navegación.

---

## 📁 Estructura del Proyecto

```text
website/
├── public/                # Favicon e imágenes estáticas públicas
├── scripts/
│   └── setup.js           # Script de inicialización de nuevos proyectos
├── src/
│   ├── app/               # Next.js App Router (Páginas y Rutas)
│   │   ├── academia/      # Dashboard del usuario / LMS
│   │   ├── admin/         # Panel de control administrativo
│   │   ├── checkout/      # Pasarela de pago y orden simulada
│   │   ├── cursos/        # Catálogo de cursos / servicios
│   │   ├── login/         # Pantalla de acceso demo y login
│   │   ├── tienda/        # Catálogo e-commerce de productos
│   │   ├── globals.css    # Importaciones de Tailwind CSS v4
│   │   ├── layout.tsx     # Layout raíz con Providers, Navbar y Footer
│   │   └── page.tsx       # Landing Page principal
│   ├── components/        # Componentes UI reutilizables
│   │   ├── cart/          # Drawer reactivo del carrito
│   │   ├── course/        # Reproductor de video protegido
│   │   ├── home/          # Secciones modulares de la landing (Hero, About, etc.)
│   │   └── layout/        # Navbar y Footer dinámicos
│   ├── config/
│   │   └── site.ts        # Configuración maestra parametrizada
│   ├── context/
│   │   ├── AuthContext.tsx# Estado de usuario autenticado
│   │   └── CartContext.tsx# Carrito de compras unificado
│   ├── data/
│   │   └── mockData.ts    # Datos de demostración (productos, cursos, reseñas)
│   └── types/
│       └── index.ts       # Definiciones de TypeScript
├── .env.example           # Plantilla de variables de entorno
├── package.json           # Dependencias y scripts
├── tsconfig.json          # Configuración de TypeScript
└── README.md              # Documentación de la plantilla base
```

---

## 📦 Páginas y Funcionalidades Disponibles

| Ruta | Descripción |
| :--- | :--- |
| `/` | **Landing Page:** Hero visual, barra de métricas, productos destacados, cursos en video, historia/quiénes somos, testimonios y newsletter. |
| `/tienda` | **Catálogo E-commerce:** Filtro por categorías, selector de variantes/tallas y botón de añadir al carrito. |
| `/cursos` | **Academia Digital:** Listado de programas con desglose de lecciones, nivel y requisitos. |
| `/checkout` | **Checkout Unificado:** Permite procesar productos físicos y accesos digitales en una sola orden con cálculo de envíos. |
| `/academia` | **Portal de Miembros:** Barra de avance porcentual y acceso a contenidos adquiridos. |
| `/academia/curso/[slug]` | **Reproductor Protegido:** Reproductor con bloqueo de descarga, marca de agua dinámica con el email del usuario y seguimiento de lecciones completadas. |
| `/login` | **Login Rápido:** Acceso demo en 1 clic como Miembro o como Administrador. |
| `/admin` | **Panel de Control:** KPIs de ventas, gestión de pedidos demo y switches para activar/desactivar módulos en tiempo real. |

---

## 🧪 Verificación y Calidad de Código

Antes de subir cambios o entregar a un cliente, puedes verificar la integridad de la base:

```bash
# Validar tipado TypeScript sin emitir código
npm run type-check

# Compilar para producción y validar páginas estáticas
npm run build
```

---

## ☁️ Despliegue en Producción

Esta plantilla está optimizada para desplegarse con costo $0 en plataformas modernas:

1. **Vercel:** Conecta tu repositorio de GitHub y selecciona el framework *Next.js*. Despliegue automático en 1 minuto.
2. **Netlify:** Compatible con el adapter oficial de Next.js.
3. **Docker / VPS propio:** Soporta el comando nativo `npm run build` y `npm start`.

---

© 2026 HBData. Plantilla base para desarrollo de sitios web.
