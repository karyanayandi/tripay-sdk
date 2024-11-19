import { defineConfig } from "tsup"

export default defineConfig({
  clean: false,
  dts: true,
  entry: ["src/index.ts"],
  splitting: false,
  format: ["cjs", "esm"],
  sourcemap: false,
  target: "esnext",
  outDir: "dist",
})
