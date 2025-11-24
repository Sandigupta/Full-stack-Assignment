// postcss.config.mjs
export default {
  plugins: {
    "@tailwindcss/postcss": {},
    // any other pure-css postcss plugins that do NOT try to import "tailwindcss"
  },
}
