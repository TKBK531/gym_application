/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"], // Include TypeScript files
  mode: "jit", // Enable JIT mode for faster compilation
  theme: {
  	extend: {
  		keyframes: {
  			popupAnimation: {
  				'0%': {
  					opacity: '0',
  					transform: 'scale(0.9)'
  				},
  				'100%': {
  					opacity: '1',
  					transform: 'scale(1)'
  				}
  			}
  		},
  		animation: {
  			popup: 'popupAnimation 0.3s ease-out'
  		},
  		colors: {
  			'primary-red': '#8B0000',
  			'primary-shade-1': '#EB0000',
  			'primary-shade-2': '#B30707',
  			'primary-shade-3': '#8B0000',
  			'primary-shade-4': '#7E0000',
  			'primary-shade-5': '#560606',
  			'secondary-golden': '#F6BC0C',
  			'secondary-golden-shade-1': '#fada79',
  			'info-dark-blue': '#002A3A',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		backgroundImage: {
  			'regal-sunset': 'linear-gradient(to bottom right, #EB0000, #F6BC0C, #7E0000)',
  			'fiery-depth': 'linear-gradient(to right, #560606, #B30707)',
  			'golden-ember': 'linear-gradient(to top, #7E0000, #F6BC0C, #8B0000)',
  			'royal-contrast': 'linear-gradient(to bottom left, #8B0000, #002A3A)'
  		},
  		fontFamily: {
  			poppins: ["Poppins", "sans-serif"]
  		},
  		fontSize: {
  			base: ["16px", "1.5"],
  			sub: ["14px", "1.5"],
  			heading1: ["clamp(2.5rem, 4vw, 4rem)", { lineHeight: 1.2 }],
  			heading2: ["clamp(2rem, 3.5vw, 3rem)", { lineHeight: 1.3 }],
  			heading3: ["clamp(1.75rem, 3vw, 2.25rem)", { lineHeight: 1.4 }],
  			heading4: ["20px", "1.5"]
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	},
  	screens: {
  		xs: '480px',
  		ss: '620px',
  		sm: '768px',
  		md: '1060px',
  		lg: '1200px',
  		xl: '1700px'
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
