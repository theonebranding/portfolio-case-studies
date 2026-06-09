
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
    	container: {
    		center: true,
    		padding: '2rem',
    		screens: {
    			'2xl': '1400px'
    		}
    	},
    	extend: {
			fontFamily :{
				primary: ["Poppins", "sans-serif"],
	        	secondary: ["Roboto", "sans-serif"],
				tertiary: ["Roboto", "sans-serif"],
			},
    		colors: {
    			border: 'hsl(var(--border))',
    			input: 'hsl(var(--input))',
    			ring: 'hsl(var(--ring))',
    			background: 'hsl(var(--background))',
    			foreground: 'hsl(var(--foreground))',
				sliderYellow: '#1E88E5',
				sliderLightYellow: '#42A5F5',
				sliderTrack: '#1565C0',
    			primary: {
    				DEFAULT: 'hsl(var(--primary))',
    				foreground: 'hsl(var(--primary-foreground))'
    			},
    			secondary: {
    				DEFAULT: 'hsl(var(--secondary))',
    				foreground: 'hsl(var(--secondary-foreground))'
    			},
    			destructive: {
    				DEFAULT: 'hsl(var(--destructive))',
    				foreground: 'hsl(var(--destructive-foreground))'
    			},
    			muted: {
    				DEFAULT: 'hsl(var(--muted))',
    				foreground: 'hsl(var(--muted-foreground))'
    			},
    			accent: {
    				DEFAULT: 'hsl(var(--accent))',
    				foreground: 'hsl(var(--accent-foreground))'
    			},
    			popover: {
    				DEFAULT: 'hsl(var(--popover))',
    				foreground: 'hsl(var(--popover-foreground))'
    			},
    			card: {
    				DEFAULT: 'hsl(var(--card))',
    				foreground: 'hsl(var(--card-foreground))'
    			},
    			/* Structural grays are variable-driven so they invert in light mode */
    			gray: {
    				50: 'rgb(var(--gray-50) / <alpha-value>)',
    				100: 'rgb(var(--gray-100) / <alpha-value>)',
    				200: 'rgb(var(--gray-200) / <alpha-value>)',
    				300: 'rgb(var(--gray-300) / <alpha-value>)',
    				400: 'rgb(var(--gray-400) / <alpha-value>)',
    				500: 'rgb(var(--gray-500) / <alpha-value>)',
    				600: 'rgb(var(--gray-600) / <alpha-value>)',
    				700: 'rgb(var(--gray-700) / <alpha-value>)',
    				800: 'rgb(var(--gray-800) / <alpha-value>)',
    				900: 'rgb(var(--gray-900) / <alpha-value>)',
    				950: 'rgb(var(--gray-950) / <alpha-value>)'
    			},
    			brand: {
    				/* Primary accent (kept key name "yellow" for backward compatibility) */
    				yellow: '#1E88E5',
    				/* Surface + foreground flip between light/dark via CSS variables */
    				black: 'rgb(var(--brand-bg) / <alpha-value>)',
    				white: 'rgb(var(--brand-fg) / <alpha-value>)',
    				/* Digol brand palette */
    				deepBlue: '#0D47A1',
    				coreBlue: '#1565C0',
    				arcBlue: '#1E88E5',
    				skyBlue: '#42A5F5',
    				lightBlue: '#E3F2FD',
    				darkBg: '#0A1628'
    			},
    			sidebar: {
    				DEFAULT: 'hsl(var(--sidebar-background))',
    				foreground: 'hsl(var(--sidebar-foreground))',
    				primary: 'hsl(var(--sidebar-primary))',
    				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
    				accent: 'hsl(var(--sidebar-accent))',
    				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
    				border: 'hsl(var(--sidebar-border))',
    				ring: 'hsl(var(--sidebar-ring))'
    			}
    		},
    		borderRadius: {
    			lg: 'var(--radius)',
    			md: 'calc(var(--radius) - 2px)',
    			sm: 'calc(var(--radius) - 4px)'
    		},
    		keyframes: {
    			'accordion-down': {
    				from: {
    					height: '0'
    				},
    				to: {
    					height: 'var(--radix-accordion-content-height)'
    				}
    			},
    			'accordion-up': {
    				from: {
    					height: 'var(--radix-accordion-content-height)'
    				},
    				to: {
    					height: '0'
    				}
    			},
    			'gradient-animation': {
    				'0%': {
    					backgroundPosition: '0% 50%'
    				},
    				'50%': {
    					backgroundPosition: '100% 50%'
    				},
    				'100%': {
    					backgroundPosition: '0% 50%'
    				}
    			},
    			'text-slide-up': {
    				'0%': {
    					transform: 'translateY(100%)',
    					opacity: '0'
    				},
    				'100%': {
    					transform: 'translateY(0)',
    					opacity: '1'
    				}
    			},
    			'text-slide-down': {
    				'0%': {
    					transform: 'translateY(0)',
    					opacity: '1'
    				},
    				'100%': {
    					transform: 'translateY(-100%)',
    					opacity: '0'
    				}
    			},
				aurora: {
					from: {
					  backgroundPosition: "50% 50%, 50% 50%",
					},
					to: {
					  backgroundPosition: "350% 50%, 350% 50%",
					},
				  },
    		},
    		animation: {
    			'accordion-down': 'accordion-down 0.2s ease-out',
    			'accordion-up': 'accordion-up 0.2s ease-out',
    			'gradient-flow': 'gradient-animation 15s ease infinite',
    			'text-slide-up': 'text-slide-up 0.5s ease-out forwards',
    			'text-slide-down': 'text-slide-down 0.5s ease-out forwards',
				'aurora': "aurora 60s linear infinite",

    		},
    		backgroundImage: {
    			'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',    			
    		}
    	}
    },
	// eslint-disable-next-line @typescript-eslint/no-require-imports
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
