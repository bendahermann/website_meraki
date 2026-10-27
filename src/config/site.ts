export interface SiteConfig {
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  currency: {
    code: string;
    symbol: string;
    locale: string;
  };
  contact: {
    email: string;
    phone: string;
    whatsapp: string;
    location: string;
    instagram: string;
    facebook: string;
    youtube: string;
    tiktok: string;
  };
  about: {
    title: string;
    subtitle: string;
    description: string;
    badge: string;
    pillars: string[];
  };
  // INTERRUPTORES MODULARES (Activa o desactiva con true / false)
  features: {
    store: boolean;        // E-commerce / Catálogo de productos físicos
    courses: boolean;      // Venta de cursos digitales y área LMS/academia
    services: boolean;     // Asesorías, cotizaciones o servicios 1 a 1
    cart: boolean;         // Carrito de compras global reactivo
    auth: boolean;         // Autenticación de usuarios / alumnos
    testimonials: boolean; // Sección de testimonios y casos de éxito
    newsletter: boolean;   // Captación de correos / lead magnet
    admin: boolean;        // Panel administrativo demo
  };
  navigation: Array<{
    label: string;
    href: string;
    featureKey?: keyof SiteConfig['features'];
  }>;
}

export const siteConfig: SiteConfig = {
  name: "NOMBRE DE MARCA",
  shortName: "Marca",
  tagline: "Experiencias y Soluciones de Vanguardia",
  description: "Plataforma web modular, moderna y optimizada para cualquier proyecto o cliente.",
  currency: {
    code: "MXN",
    symbol: "$",
    locale: "es-MX",
  },
  contact: {
    email: "contacto@tudominio.com",
    phone: "+52 55 0000 0000",
    whatsapp: "+52 55 0000 0000",
    location: "Ciudad de México, México",
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
    youtube: "https://youtube.com",
    tiktok: "https://tiktok.com",
  },
  about: {
    title: "Nuestra Filosofía & Compromiso",
    subtitle: "Calidad, Innovación y Excelencia en Cada Detalle",
    description: "Creamos experiencias memorables combinando diseño estético, funcionalidad intuitiva y tecnología de última generación. Nuestro objetivo es superar las expectativas de cada cliente.",
    badge: "Estándar de Excelencia",
    pillars: [
      "Diseño Responsivo y Elegante",
      "Rendimiento de Alta Velocidad",
      "Atención y Soporte Personalizado",
      "Satisfacción 100% Garantizada",
    ],
  },
  features: {
    store: true,        // Catálogo y venta de productos: true / false
    courses: true,      // Cursos digitales y academia: true / false
    services: true,     // Asesorías y servicios: true / false
    cart: true,         // Carrito de compras: true / false
    auth: true,         // Autenticación / Login: true / false
    testimonials: true, // Testimonios y reseñas: true / false
    newsletter: true,   // Boletín / Lead magnet: true / false
    admin: true,        // Panel de control: true / false
  },
  navigation: [
    { label: "Inicio", href: "/" },
    { label: "Catálogo", href: "/tienda", featureKey: "store" },
    { label: "Cursos", href: "/cursos", featureKey: "courses" },
    { label: "Nosotros", href: "/#nosotros" },
    { label: "Reseñas", href: "/#testimonios", featureKey: "testimonials" },
  ],
};
