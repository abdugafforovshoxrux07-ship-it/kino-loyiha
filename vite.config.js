export default defineConfig({
  base: '/kino-loyiha/',
  
  plugins: [react()],

  server: {
    port: 5173,
    open: true,
  },

  build: {
    outDir: 'dist',
    sourcemap: false,
  },
})