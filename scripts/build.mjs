import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const preset = process.argv[2];
if (!["vercel", "netlify", "node-server"].includes(preset)) {
  throw new Error("Expected a deployment target: vercel, netlify, or node-server");
}

const result = spawnSync(
  process.execPath,
  [fileURLToPath(new URL("../node_modules/vite/bin/vite.js", import.meta.url)), "build"],
  { stdio: "inherit", env: { ...process.env, NITRO_PRESET: preset } },
);
if (result.error) throw result.error;
process.exit(result.status ?? 1);
