/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Main body - Drowner-like (comfortable, editorial)
        sans: ['Helvetica Neue', 'Helvetica', 'system-ui', '-apple-system', 'Arial', 'sans-serif'],
        // Titles - DX Grafik feel (tight, modern, premium)
        heading: ['Helvetica Neue', 'Helvetica', 'system-ui', 'sans-serif'],
        // Accents / mini phrases - Bootzy TM feel (slightly more expressive)
        accent: ['Helvetica Neue', 'Helvetica', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Brand colors - strict adherence
        bg: '#f5f1ea',           // Fondo principal
        card: '#ffffff',         // Cards / cajas
        cta: '#006b5b',          // Color principal de acción (botones, links)
        'text-strong': '#101820',// Títulos / texto fuerte
        emotional: '#3d2c2e',    // Detalles emocionales / lifestyle
        highlight: '#ffcd00',    // Urgencia / acentos / "gratis"
        neutral: '#a89f94',      // Texto secundario / bordes suaves
        dark: '#101820',         // Para secciones de autoridad
      },
      spacing: {
        'section': '6rem',       // Generous premium spacing
      },
      boxShadow: {
        'premium': '0 10px 40px -15px rgba(16, 24, 32, 0.08), 0 4px 6px -1px rgba(16, 24, 32, 0.05)',
        'soft': '0 4px 20px -4px rgba(16, 24, 32, 0.06)',
      },
      borderRadius: {
        'xl': '16px',
        '2xl': '20px',
      }
    },
  },
  plugins: [],
}
