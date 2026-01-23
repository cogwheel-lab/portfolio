import path from "path";
import { fileURLToPath } from "url";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Monorepo 対応。上位階層の lockfile を拾わないように出力先のルートを固定する。
  outputFileTracingRoot: path.resolve(
    path.dirname(fileURLToPath(import.meta.url)),
    "..",
    ".."
  ),
};

export default nextConfig;
