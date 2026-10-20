export interface SiteConfig {
  name: string;
  shortName: string;
  trainerName: string;
  trainerTitle: string;
  description: string;
  currency: {
    code: string;
    symbol: string;
    locale: string;
  };
  contact: {
    email: string;
    whatsapp: string;
    location: string;
    instagram: string;
    youtube: string;
    tiktok: string;
  };
  // INTERRUPTORES MODULARES (Activa o desactiva con true/false)
  features: {
    store: boolean;        // Venta de ropa y merchandising físico
    courses: boolean;      // Venta de cursos y área de academia/LMS
    coaching: boolean;     // Asesorías 1 a 1 / citas de entrenamiento
    cart: boolean;         // Carrito de compras global
    auth: boolean;         // Autenticación de alumnos y miembros
    testimonials: boolean; // Sección de casos de éxito y antes/después
    newsletter: boolean;   // Captación de correos con guía gratuita
    admin: boolean;        // Panel administrativo
  };
  navigation: Array<{
    label: string;
    href: string;
    featureKey?: keyof SiteConfig['features'];
  }>;
}

export const siteConfig: SiteConfig = {
  name: "TITAN ATHLETICS",
  shortName: "TitanFit",
  trainerName: "Hermann Benda",
  trainerTitle: "Especialista en Hipertrofia & Rendimiento Deportivo",
  description: "Entrena con metodología científica, rompe tus límites y transforma tu físico con programas estructurados paso a paso !",
  currency: {
    code: "MXN",
    symbol: "$",
    locale: "es-MX",
  },
  contact: {
    email: "contacto@titanathletics.mx",
    whatsapp: "+52 55 1234 5678",
    location: "Ciudad de México, México",
    instagram: "https://instagram.com",
    youtube: "https://youtube.com",
    tiktok: "https://tiktok.com",
  },
  features: {
    store: true,        // ¿Quieres tienda de ropa? true / false
    courses: true,      // ¿Quieres venta de cursos digitales? true / false
    coaching: true,     // ¿Quieres asesorías personalizadas? true / false
    cart: true,         // Carrito de compras
    auth: true,         // Login de alumnos
    testimonials: true, // Casos de éxito
    newsletter: true,   // Lead magnet
    admin: true,        // Panel de control
  },
  navigation: [
    { label: "Inicio", href: "/" },
    { label: "Cursos & Retos", href: "/cursos", featureKey: "courses" },
    { label: "Tienda Oficial", href: "/tienda", featureKey: "store" },
    { label: "Asesorías 1 a 1", href: "/#asesorias", featureKey: "coaching" },
    { label: "Transformaciones", href: "/#testimonios", featureKey: "testimonials" },
  ],
};
