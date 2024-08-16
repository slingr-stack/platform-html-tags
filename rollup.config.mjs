import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import filesize from 'rollup-plugin-filesize';
import { getBabelOutputPlugin } from '@rollup/plugin-babel';

const pluginOptions = [
  nodeResolve(),
  typescript({sourceMap: false,inlineSources: false}),
  getBabelOutputPlugin({
    presets: [
        [
            '@babel/preset-env', { 
              modules: "umd",
              targets: {
                browsers: '> 1%, IE 11, not op_mini all, not dead',
                node: 8
              },
            }
        ],
        ["minify", { mangle: false }]
    ],
  }),
  filesize({
    showGzippedSize: false,
  })
];

export default {
  input: 'src/main.ts',
  output: {
    name: 'main',
    file: 'dist/js/slingr-components.umd.min.js',
    format: 'esm',
  },
  plugins: pluginOptions,
};