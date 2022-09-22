const getCustomWidth = () => {
  const arr = [];
  for (let i = 1; i <= 320; i++) {
    arr.push(i);
  }
  return arr.reduce((acc, i) => {
    acc[`${i}p`] = `${i / 16}rem`;
    return acc;
  }, {});
};

const getSafeList = () => {
  const arr = [];
  for (let i = 1; i <= 320; i++) {
    arr.push(`w-${i}p`);
  }
  return arr;
};

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  safelist: [...getSafeList()],
  theme: {
    extend: {
      width: { ...getCustomWidth() },
      borderRadius: {
        '4xl': '3rem',
      },
      animation: {
        'ping-once': 'ping 2s cubic-bezier(0, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
};
