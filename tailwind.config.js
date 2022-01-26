module.exports = {
  content: [ "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      minWidth: {
        210: '210px',
        350: '350px'
      },
      animation :{
        'spin-slow': 'spin 3s linear infinite',
      }
    },
  },
  plugins: [],
}
