export type ProductCategory = "apparel" | "equipment" | "supplement" | "course";

export interface Lesson {
  id: string;
  title: string;
  duration: string; // ej. "14:20"
  description?: string;
  videoUrl: string; // Enlace privado/token de Bunny.net, Vimeo o Cloudflare
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
  price: number; // en MXN
  compareAtPrice?: number; // Precio anterior tachado
  thumbnail: string;
  badge?: string; // ej. "Más Vendido", "Principiantes", "Avanzado"
  level: "Principiante" | "Intermedio" | "Avanzado" | "Todos los niveles";
  durationWeeks: number;
  totalHours: string;
  totalLessons: number;
  includesDietPlan: boolean;
  includesCommunity: boolean;
  modules: CourseModule[];
  whatYouWillLearn: string[];
  requirements: string[];
}

export interface PhysicalProduct {
  id: string;
  slug: string;
  title: string;
  description: string;
  price: number; // en MXN
  compareAtPrice?: number;
  category: "apparel" | "equipment" | "supplement";
  images: string[];
  badge?: string; // ej. "Edición Limitada", "Top Ventas"
  sizes?: string[]; // ej. ["CH", "M", "G", "XG"]
  colors?: string[];
  stock: number;
  featured: boolean;
}

export interface CartItem {
  id: string; // Para ropa: `${productId}-${selectedSize}`
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
  progress: Record<string, UserProgress>; // courseId -> UserProgress
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
