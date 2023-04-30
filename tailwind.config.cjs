/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode:"class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    screens:{
      'xs': {'min': '320px', 'max': '576px'},
      'sm': {'min': '577px', 'max': '767px'},
      'md': {'min': '768px', 'max': '1023px'},
      'xl': {'min': '1024px', 'max': '1365px'},
      
    },
    extend: {
      colors: {
        'pink': "#e6c4c0",
        'banana':"#eaff7b",
        'bluegreeny':"#5cbdb9",
        'yellow':"#ffde22",
        'red_custom':"#ff414e",
        'orange':"#ff8928",
        'lightningblue':"#51d0de",
        'lightningpurple':"#bf4aa8",
        'black':"#000000",
        'indigo':"#E5CCFF",
      },
    },
  },
  plugins: [
    require('flowbite/plugin')  
  ],
};
