import react from "@vitejs/plugin-react"
import path from "path"

// https://vitejs.dev/config/
export default function myDefineConfig() {
  return {
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    build: {
      outDir: "../docs/_shared_static/react-build",
      emptyOutDir: true,
    },
    server: {
      port: 3000,
      host: true,
    },
  }
}
