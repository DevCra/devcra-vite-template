const config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        pretendardStd: [
          "--pretendard-std",
          "-apple-system",
          "BlinkMacSystemFont",
          "Malgun Gothic",
          "맑은 고딕",
          "helvetica",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};
export default config;
