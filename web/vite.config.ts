import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import viteCompression from 'vite-plugin-compression';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  const isProduction = mode === 'production';

  return {
    server: {
      port: 3000,
      host: '0.0.0.0',
    },
    plugins: [
      react(),
      // Gzip compression for production
      isProduction && viteCompression({
        algorithm: 'gzip',
        ext: '.gz',
        threshold: 10240, // Only compress files >10KB
        deleteOriginFile: false
      }),
      // Brotli compression for production (better compression)
      isProduction && viteCompression({
        algorithm: 'brotliCompress',
        ext: '.br',
        threshold: 10240,
        deleteOriginFile: false
      }),
      // Bundle analyzer (only in analysis mode)
      process.env.ANALYZE && visualizer({
        open: true,
        filename: 'dist/stats.html',
        gzipSize: true,
        brotliSize: true
      })
    ].filter(Boolean),
    define: {
      'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      }
    },
    build: {
      // Terser minification for better optimization
      minify: isProduction ? 'terser' : 'esbuild',
      terserOptions: isProduction ? {
        compress: {
          drop_console: true, // Remove console.logs in production
          drop_debugger: true, // Remove debugger statements
          pure_funcs: ['console.log', 'console.info'], // Remove specific console methods
        },
        format: {
          comments: false, // Remove comments
        }
      } : undefined,
      rollupOptions: {
        output: {
          // Manual chunking for better code splitting
          manualChunks(id) {
            if (id.includes('node_modules')) {
              // Separate UI libraries
              if (id.includes('framer-motion') || id.includes('lucide-react') || id.includes('sonner')) {
                return 'vendor-ui';
              }
              // Separate Supabase
              if (id.includes('@supabase')) {
                return 'vendor-supabase';
              }
              // Separate AI libraries
              if (id.includes('@google/genai')) {
                return 'vendor-ai';
              }
              // All other vendor code
              return 'vendor';
            }
          }
        }
      },
      chunkSizeWarningLimit: 1000,
      // Source maps for production debugging (can disable for smaller builds)
      sourcemap: !isProduction,
    },
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './src/test/setup.ts',
      css: true,
    }
  };
});
