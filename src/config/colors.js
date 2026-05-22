/**
 * Modern Minimalistic Color System
 * Teal-Blue gradient with Amber accents
 * Professional, eye-catching, cohesive across all pages
 */

export const colors = {
  // Primary Gradient - Teal to Blue
  primary: {
    50: "#f0fdfa",
    100: "#ccfbf1",
    200: "#99f6e4",
    300: "#5eead4",
    400: "#2dd4bf",
    500: "#14b8a6",      // Primary
    600: "#0d9488",      // Primary Dark
    700: "#0f766e",
    800: "#115e59",
    900: "#134e4a",
  },

  // Secondary Gradient - Deep Blue
  secondary: {
    50: "#f0f9ff",
    100: "#e0f2fe",
    200: "#bae6fd",
    300: "#7dd3fc",
    400: "#38bdf8",
    500: "#0ea5e9",      // Secondary
    600: "#0284c7",      // Secondary Dark
    700: "#0369a1",
    800: "#075985",
    900: "#0c4a6e",
  },

  // Accent - Warm Gold/Amber
  accent: {
    50: "#fffbeb",
    100: "#fef3c7",
    200: "#fde68a",
    300: "#fcd34d",
    400: "#fbbf24",
    500: "#f59e0b",      // Accent
    600: "#d97706",      // Accent Dark
    700: "#b45309",
    800: "#92400e",
    900: "#78350f",
  },

  // Neutral - Grays
  neutral: {
    0: "#ffffff",
    50: "#f9fafb",
    100: "#f3f4f6",
    200: "#e5e7eb",
    300: "#d1d5db",
    400: "#9ca3af",
    500: "#6b7280",
    600: "#4b5563",
    700: "#374151",
    800: "#1f2937",
    900: "#111827",
  },

  // Semantic Colors
  success: "#10b981",
  warning: "#f59e0b",
  error: "#ef4444",
  info: "#0ea5e9",
};

export const gradients = {
  // Primary gradient - Teal to Blue
  primaryGradient: "linear-gradient(135deg, #14b8a6 0%, #0ea5e9 100%)",
  primaryGradientReverse: "linear-gradient(135deg, #0ea5e9 0%, #14b8a6 100%)",
  
  // Dark mode primary gradient
  primaryGradientDark: "linear-gradient(135deg, #0d9488 0%, #0284c7 100%)",
  
  // Subtle gradient
  subtleGradient: "linear-gradient(135deg, rgba(20, 184, 166, 0.1) 0%, rgba(14, 165, 233, 0.1) 100%)",
  
  // Accent gradient
  accentGradient: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
  
  // Rainbow gradient for special elements
  rainbowGradient: "linear-gradient(90deg, #14b8a6 0%, #0ea5e9 50%, #f59e0b 100%)",
};

export const tailwindColors = {
  // For use in Tailwind className attributes
  primary: "from-teal-500 via-teal-600 to-cyan-500",
  primaryDark: "from-teal-700 to-blue-800",
  secondary: "from-blue-500 to-cyan-600",
  accent: "from-amber-500 to-orange-600",
  neutral: "from-gray-700 to-gray-900",
};

export const themeConfig = {
  navbar: {
    background: "from-teal-600 via-teal-700 to-blue-800",
    text: "text-white",
    accentBtn: "bg-amber-500 hover:bg-amber-600",
  },
  
  hero: {
    background: "from-teal-50 to-blue-50",
    gradient: "from-teal-500 via-cyan-500 to-blue-600",
  },
  
  card: {
    border: "border-teal-200",
    hover: "hover:border-amber-300 hover:shadow-teal-500/20",
    accent: "from-teal-50 to-cyan-50",
  },
  
  button: {
    primary: "from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700",
    secondary: "from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700",
    accent: "from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700",
  },

  footer: {
    background: "from-gray-900 to-teal-900",
    text: "text-gray-100",
  },
};

export default colors;
