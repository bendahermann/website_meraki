"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { User, UserProgress } from "@/types";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, role?: "student" | "admin") => void;
  logout: () => void;
  hasAccessToCourse: (courseId: string) => boolean;
  markLessonCompleted: (courseId: string, lessonId: string) => void;
  isLessonCompleted: (courseId: string, lessonId: string) => boolean;
  grantCourseAccess: (courseId: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Usuario de demostración predeterminado (un miembro activo de prueba)
const DEFAULT_DEMO_STUDENT: User = {
  id: "user-demo-01",
  email: "demo@ejemplo.com",
  name: "Usuario Demostración",
  avatarUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80",
  role: "student",
  purchasedCourseIds: ["curso-estrategia-digital"],
  progress: {
    "curso-estrategia-digital": {
      courseId: "curso-estrategia-digital",
      completedLessonIds: ["les-1-1"],
      lastAccessedLessonId: "les-1-2",
    },
  },
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("app_user");
      if (saved) {
        setUser(JSON.parse(saved));
      } else {
        setUser(DEFAULT_DEMO_STUDENT);
        localStorage.setItem("app_user", JSON.stringify(DEFAULT_DEMO_STUDENT));
      }
    } catch {
      setUser(DEFAULT_DEMO_STUDENT);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const saveUser = (updatedUser: User | null) => {
    setUser(updatedUser);
    if (updatedUser) {
      localStorage.setItem("app_user", JSON.stringify(updatedUser));
    } else {
      localStorage.removeItem("app_user");
    }
  };

  const login = (email: string, role: "student" | "admin" = "student") => {
    const newUser: User = {
      id: `user-${Date.now()}`,
      email,
      name: email.split("@")[0] || "Miembro Demo",
      role,
      purchasedCourseIds:
        role === "admin"
          ? ["curso-estrategia-digital", "curso-diseno-experiencia"]
          : ["curso-estrategia-digital"],
      progress: {
        "curso-estrategia-digital": {
          courseId: "curso-estrategia-digital",
          completedLessonIds: ["les-1-1"],
        },
      },
    };
    saveUser(newUser);
  };

  const logout = () => {
    saveUser(null);
  };

  const hasAccessToCourse = (courseId: string): boolean => {
    if (!user) return false;
    if (user.role === "admin") return true;
    return user.purchasedCourseIds.includes(courseId);
  };

  const grantCourseAccess = (courseId: string) => {
    if (!user) return;
    if (user.purchasedCourseIds.includes(courseId)) return;

    const updatedUser: User = {
      ...user,
      purchasedCourseIds: [...user.purchasedCourseIds, courseId],
      progress: {
        ...user.progress,
        [courseId]: {
          courseId,
          completedLessonIds: [],
        },
      },
    };
    saveUser(updatedUser);
  };

  const markLessonCompleted = (courseId: string, lessonId: string) => {
    if (!user) return;

    const currentProgress: UserProgress = user.progress[courseId] || {
      courseId,
      completedLessonIds: [],
    };

    const alreadyDone = currentProgress.completedLessonIds.includes(lessonId);
    const updatedIds = alreadyDone
      ? currentProgress.completedLessonIds.filter((id) => id !== lessonId)
      : [...currentProgress.completedLessonIds, lessonId];

    const updatedUser: User = {
      ...user,
      progress: {
        ...user.progress,
        [courseId]: {
          ...currentProgress,
          completedLessonIds: updatedIds,
          lastAccessedLessonId: lessonId,
        },
      },
    };

    saveUser(updatedUser);
  };

  const isLessonCompleted = (courseId: string, lessonId: string): boolean => {
    if (!user || !user.progress[courseId]) return false;
    return user.progress[courseId].completedLessonIds.includes(lessonId);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        logout,
        hasAccessToCourse,
        markLessonCompleted,
        isLessonCompleted,
        grantCourseAccess,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
