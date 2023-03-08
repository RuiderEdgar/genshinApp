import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    css: {
        modules: {
            // Habilita CSS Modules para permitir la asignación de nombres de clase únicos
            auto: /\.module\.\w+$/i,
            // Configura la generación de nombres de clase para CSS Modules
            generateScopedName: "[name]__[local]___[hash:base64:5]",
        },
    },
    server: {
        port: 3030,
        open: true, //abrir el navegador cuando se inicia el servidor
    },
    preview: {
        port: 4060,
    },
    build: {
        incremebtal: true,
        babel: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
        },
        cache: true,
        minify: true,
        mode: "production",
        chunks: true,
        moduleBundling: true,
        devCode: true,
        debug: true,
        prerenderPaths: ["/"],
        modulePreload: true,
    },
});
