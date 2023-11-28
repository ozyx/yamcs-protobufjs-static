import path from "path";
import { fileURLToPath } from "url";
import TerserPlugin from 'terser-webpack-plugin';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isProduction = process.env.NODE_ENV == 'production';

const config = {
    entry: './compiled.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'yamcsProto.cjs',
    },
    optimization: {
        minimize: true, // Enable minimization
        minimizer: [new TerserPlugin({
            extractComments: false, // Removes comments
            terserOptions: {
                compress: {
                    drop_console: true, // Remove console logs
                    drop_debugger: true, // Remove debugger statements
                    pure_funcs: ['console.info', 'console.debug', 'console.warn'], // Remove specific console functions
                    passes: 2, // Run compressor 2 times
                },
                mangle: true, // Mangle variable and function names
            }
        })],
    },
    module: {
        rules: [
            {
                test: /\.(js|mjs)$/i,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        plugins: [
                            '@babel/plugin-transform-modules-commonjs',
                        ],
                        presets: [
                          ['@babel/preset-env', { targets: "defaults" }]
                        ]
                      }
                }
            }
        ],
    },
};

export default { ...config, mode: isProduction ? 'production' : 'development' };
