import { defineConfig } from "vite";
import pluginReact from "@vitejs/plugin-react";
import { globSync } from "glob";
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import { cwd } from "node:process";

const pages = globSync("./src/**/index.html");
export default defineConfig(() => {

    return {
        appType: "mpa" as const,
        plugins: [pluginReact({
            babel: {
                plugins: [
                    [
                        "@babel/plugin-proposal-decorators",
                        {
                            version: "2023-05"
                        }
                    ]
                ]
            }
        }), vanillaExtractPlugin()],
        build: {
            rollupOptions: {
                input: ["index.html", ...pages]
            }
        },
        define: {
            pages,
            cwd: JSON.stringify(cwd())
        }
    };
});