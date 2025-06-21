import type { Config } from "tailwindcss";
import scrollbar from "tailwind-scrollbar";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    "bg-lime-400",
    "bg-emerald-500",
    "bg-amber-950",
    "bg-orange-600",
    "bg-amber-500",
    "bg-fuchsia-500",
    "bg-violet-500",
    "bg-zinc-700",
    "bg-red-600",
    "bg-sky-500",
    "bg-blue-500",
  ],
  theme: {
    extend: {
      colors: {
        // Ana arka planlar (Landing page temasına uygun)
        mainBackground: "#1A1A1A", // Orijinal: #252527
        secondBackground: "#2A2A2A", // Orijinal: #36353a
        thirdBackground: "#3A3A3A", // Orijinal: #444446

        // Tema rengi (Landing page moruna uygun)
        themeColor: "#7E42FF", // Orijinal: #c8fe2d

        // Mavi tonları (biraz daha koyu)
        mainBlue: "#2563EB", // Orijinal: #3b82f6
        darkBlue: "#1E40AF", // Orijinal: #1d4ed8
        lightBlue: "#3B82F6", // Orijinal: #60a5fa

        // Yeşil tonları (biraz daha koyu)
        mainGreen: "#16A34A", // Orijinal: #22c55e
        darkGreen: "#14532D", // Orijinal: #15803d
        lightGreen: "#22C55E", // Orijinal: #4ade80

        // Metin renkleri (Landing page temasına uygun)
        mainTextColor: "#F0F0F0", // Orijinal: #fbfbfd
        secondTextColor: "#A0A0A0", // Orijinal: #dfdfe3

        // Durum renkleri (aynı kaldı)
        dangerRed: "#EF4444", // Orijinal: #ef4444
        infoYellow: "#FACC15", // Orijinal: #facc15
      },
    },
  },
  plugins: [scrollbar],
} satisfies Config;
