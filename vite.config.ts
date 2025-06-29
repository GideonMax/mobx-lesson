import { defineConfig } from "vite";
import pluginReact from "@vitejs/plugin-react";
import { Dirent, opendirSync } from "node:fs";
import { resolve } from "node:path";
import { cwd } from "node:process";
import { glob,globSync } from "glob";
const folder = opendirSync("./src/pages");

const pages = globSync("./src/**/index.html");
console.log(pages);
export default defineConfig(() => {

    return {
        appType: "mpa" as const,
        plugins: [pluginReact()],
        build: {
            rollupOptions: {
                input: ["index.html", ...pages]
            }
        },
        define:{pages}
    };
});