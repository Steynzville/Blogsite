import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { defineConfig } from "vite";
import { visualizer } from "rollup-plugin-visualizer";
import critical from "vite-plugin-critical-css";

export default defineConfig({
  base: '/',
  plugins: [
    react(), 
    tailwindcss(),
    visualizer({
      filename: "stats.html",
      gzipSize: true,
      brotliSize: true,
    }),
    // critical({
    //   criticalUrl: "https://velucedesign.com/", 
    //   criticalUrls: [
    //     { url: "https://velucedesign.com/", route: "/" },
    //     { url: "https://velucedesign.com/article/upward-lighting-architectural-grazing/", route: "/article/upward-lighting-architectural-grazing/" },
    //   ],
    // }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  envDir: path.resolve(import.meta.dirname),
  root: path.resolve(import.meta.dirname),
  publicDir: path.resolve(import.meta.dirname, "public"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist"),
    emptyOutDir: true,
    target: 'es2020',
    reportCompressedSize: false,
    cssCodeSplit: true,
    sourcemap: false,
    rollupOptions: {
      output: {
        // Content hash for cache busting

        entryFileNames: 'js/[name]-[hash].js',
        chunkFileNames: 'js/[name]-[hash].js',
        assetFileNames: ({ name }) => {
          if (name && name.endsWith('.css')) {
            return 'css/[name]-[hash][extname]';
          }
          if (name && name.endsWith('.woff2')) {
            return 'fonts/[name][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        },
        manualChunks: {
          'vendor': ['react', 'react-dom', 'wouter'],
          'formspree': ['@formspree/react'],
          'search': ['fuse.js'],
          'ui': ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu', '@radix-ui/react-tooltip'],
        },
      },
    },
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        passes: 3,
        pure_funcs: ['console.log', 'console.info'],
      },
      mangle: true,
      format: {
        comments: false,
      },
    },
    cssMinify: true,
  },
});
