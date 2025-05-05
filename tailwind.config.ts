import type { Config } from "tailwindcss";

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
        mainBackground: "#252527",
        secondBackground: "#3b3b3d",
        thirdBackground: "#444446",

        themeColor: "#c8fe2d",

        mainBlue: "#3b82f6",
        darkBlue: "#1d4ed8",
        lightBlue: "#60a5fa",

        mainGreen: "#22c55e",
        darkGreen: "#15803d",
        lightGreen: "#4ade80",

        mainTextColor: "#fbfbfd",
        secondTextColor: "#dfdfe3",
        dangerRed: "#ef4444",
        infoYellow: "#facc15",
      },
    },
  },
  plugins: [],
} satisfies Config;
