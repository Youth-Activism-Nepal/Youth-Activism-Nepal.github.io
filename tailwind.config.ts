import {nextui} from '@nextui-org/theme';
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/components/(accordion|card|image|navbar|divider|ripple).js"
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
		textBlue: "#141E46",
		offWhite: "#F6F6F6",
		primaryPurple: "#8A2BE2",
		primaryRed: "#F5233C",
		cs50Yellow: "#F3AF06",
		offYellow: "#FFF5E0",
		warningRed: "#F5004F",
		offPurple: "#EBE0FF",
      },
	  backgroundImage: {
        'bg-effect': "url('/images/bg-effect.svg')",
      },
    },
  },
  plugins: [nextui()],
};
export default config;