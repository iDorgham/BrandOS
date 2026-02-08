/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                primary: {
                    DEFAULT: "hsl(var(--primary))",
                    foreground: "hsl(var(--primary-foreground))",
                },
                secondary: {
                    DEFAULT: "hsl(var(--secondary))",
                    foreground: "hsl(var(--secondary-foreground))",
                },
                destructive: {
                    DEFAULT: "hsl(var(--destructive))",
                    foreground: "hsl(var(--destructive-foreground))",
                },
                muted: {
                    DEFAULT: "hsl(var(--muted))",
                    foreground: "hsl(var(--muted-foreground))",
                },
                accent: {
                    DEFAULT: "hsl(var(--accent))",
                    foreground: "hsl(var(--accent-foreground))",
                },
                popover: {
                    DEFAULT: "hsl(var(--popover))",
                    foreground: "hsl(var(--popover-foreground))",
                },
                card: {
                    DEFAULT: "hsl(var(--card))",
                    foreground: "hsl(var(--card-foreground))",
                },
            },
            fontFamily: {
                sans: ['IBM Plex Sans', 'sans-serif'],
                display: ['IBM Plex Sans', 'sans-serif'],
                mono: ['IBM Plex Mono', 'monospace'],
            },
            borderRadius: {
                none: "0",
                sm: "2px",
                DEFAULT: "4px",
                md: "4px",
                lg: "4px",
                xl: "4px",
                "2xl": "4px",
                "3xl": "4px",
                full: "9999px",
            },
            boxShadow: {
                none: "none",
                DEFAULT: "none",
                sm: "none",
                md: "none",
                lg: "none",
                xl: "none",
                "2xl": "none",
            },
        },
    },
    plugins: [],
}
