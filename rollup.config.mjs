import typescript from "@rollup/plugin-typescript";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import filesize from "rollup-plugin-filesize";
import { getBabelOutputPlugin } from "@rollup/plugin-babel";
import copy from "rollup-plugin-copy";
import minifyHTML from 'rollup-plugin-minify-html-literals';

const pluginOptions = [
  copy({
    targets: [
      {
        src: "src/assets/*",
        dest: "dist/assets",
      },
    ],
  }),
  typescript(),
  minifyHTML.default(), //https://github.com/lit/lit/issues/4273
  nodeResolve(),
  getBabelOutputPlugin({
    presets: [
      [
        "@babel/preset-env",
        {
          modules: "amd",
          targets: {
            browsers: "> 1%, IE 11, not op_mini all, not dead",
            node: 8,
          }
        },
      ],
      [
        "minify",
        {
          removeConsole: true,
          removeDebugger: true,
          builtIns: false,
          evaluate: true,
          mangle: false,
        },
      ],
    ],
  }),
  filesize({
    showGzippedSize: false,
    showMinifiedSize: false,
  }),
];

export default {
  input: "src/app/index.ts",
  output: {
    file: "dist/slingr-components.min.js",
    format: "esm",
  },
  plugins: pluginOptions,
};
