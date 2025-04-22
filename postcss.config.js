// postcss.config.js  – CommonJS
module.exports = {
  plugins: {
    "@tailwindcss/postcss": {},
    autoprefixer: {},          // harmless even if Tailwind adds it internally
  },
};
