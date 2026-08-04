import { defineConfig } from "vite";
import path, { resolve } from 'node:path';
import * as glob from "glob";

import HtmlCssPurgePlugin from 'vite-plugin-purgecss';
import HandlebarPlugin from 'vite-plugin-handlebars';

import getPageContext from './src/data/index.js';


function obtenerHtmlFiles() {
    return Object.fromEntries(
        glob.sync(
            './**/*.html',
            {
                ignore: [
                    './dist/**',
                    './node_modules/**'
                ]
            }
        ).map((file)=>{
            return [
                file.slice(0, file.length - path.extname(file).length), // nombre del archivo sin extensión
                resolve(__dirname, file) // full path a el archivo
            ]
        })
    );
    /*
        {
            "index": "~/....../index.html",
            "productos": "~/......../productos.html",
        }
    */
}

export default defineConfig(
    {
        appType: 'mpa',
        base: process.env.DEPLOY_BASE_URL ?? '/',
        build: {
            rolldownOptions: {
                input: obtenerHtmlFiles()
            }
        },
        plugins: [
            HandlebarPlugin(
                {
                    partialDirectory: resolve(__dirname, 'src/partials'),
                    context: (page) => {
                        console.log(`Cargando contexto de: ${page}`);
                        let context = getPageContext(page);
                        console.log(JSON.stringify(context,null, 2));
                        return context;
                    }
                }
            ),
            HtmlCssPurgePlugin()
        ]
    }
);