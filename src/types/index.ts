export type ProductCategory = "general" | "destacados" | "accesorios" | "digital";

export interface Lesson {
  id: string;
  title: string;
  duration: string; // ej. "14:20"
  description?: string;
  videoUrl: string; // Enlace de video (Bunny.net, Vimeo, Cloudflare, etc.)
  isCompleted?: boolean;
  notes?: string;
}

export interface CourseModule {
  id: string;
  title: string;
  description?: string;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  price: number; // en moneda local (ej. MXN)
  compareAtPrice?: number; // Precio tachado
  thumbnail: string;
  badge?: string; // ej. "Más Vendido", "Nuevo", "Destacado"
  level: "Principiante" | "Intermedio" | "Avanzado" | "Todos los niveles";
  durationWeeks: number;
  totalHours: string;
  totalLessons: number;
  includesCertificate?: boolean;
  includesCommunity?: boolean;
  modules: CourseModule[];
  whatYouWillLearn: string[];
  requirements: string[];
}

export interface PhysicalProduct {
  id: string;
  slug: string;
  title: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  category: string;
  images: string[];
  badge?: string;
  sizes?: string[];
  colors?: string[];
  stock: number;
  featured: boolean;
}

export interface CartItem {
  id: string;
  productId: string;
  type: "course" | "physical";
  title: string;
  price: number;
  image: string;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

export interface UserProgress {
  courseId: string;
  completedLessonIds: string[];
  lastAccessedLessonId?: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
  role: "student" | "admin";
  purchasedCourseIds: string[];
  progress: Record<string, UserProgress>;
}

export interface Order {
  id: string;
  createdAt: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  shippingAddress?: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
  };
  items: CartItem[];
  subtotal: number;
  shippingCost: number;
  total: number;
  paymentMethod: "stripe" | "mercadopago" | "oxxo" | "demo";
  status: "paid" | "pending" | "shipped" | "delivered";
}
