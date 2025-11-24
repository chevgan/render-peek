import { defineConfig } from 'tsup';

export default defineConfig({
    entry: ['src/useRenderPeek.tsx'],
    format: ['cjs', 'esm'],
    dts: true,
    clean: true,
    external: ['react', 'react-dom'],
    minify: true,
    sourcemap: true,
});
