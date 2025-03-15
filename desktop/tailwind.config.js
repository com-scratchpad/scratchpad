/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
  	extend: {
       typography: (theme) => ({
        compact: {
          css: {
            fontSize: '0.875rem',
            lineHeight: 1.6,
            p: {
              marginTop: theme('spacing.2'),
              marginBottom: theme('spacing.2'),
            },
            h1: {
              fontSize: '1.4rem',
              fontWeight: '700',
              marginTop: '2rem',
              marginBottom: '1rem',
              lineHeight: 1.2,
            },
            h2: {
              fontSize: '1.25rem',
              fontWeight: '700',
              marginTop: '1.75rem',
              marginBottom: '0.75rem',
              lineHeight: 1.25,
            },
            h3: {
              fontSize: '1.1rem',
              fontWeight: '600',
              marginTop: '1.5rem',
              marginBottom: '0.5rem',
              lineHeight: 1.3,
            },
            blockquote: {
              paddingLeft: theme('spacing.3'),
              marginTop: theme('spacing.3'),
              marginBottom: theme('spacing.3'),
            },
            'ul, ol': {
              marginTop: theme('spacing.2'),
              marginBottom: theme('spacing.2'),
              paddingLeft: theme('spacing.4'),
            },
            li: {
              marginTop: theme('spacing.1'),
              marginBottom: theme('spacing.1'),
            },
            img: {
              marginTop: theme('spacing.3'),
              marginBottom: theme('spacing.3'),
            },
            pre: {
              fontSize: '0.8rem',
              padding: theme('spacing.2'),
              marginTop: theme('spacing.3'),
              marginBottom: theme('spacing.3'),
            },
            code: {
              fontSize: '0.8em',
              padding: '0.15em 0.3em',
            },
            'pre code': {
              fontSize: 'inherit',
              padding: 0,
            },
            hr: {
              marginTop: theme('spacing.4'),
              marginBottom: theme('spacing.4'),
            },
            table: {
              fontSize: '0.8rem',
            },
          },
        },
      }),
  		width: {
  			'1/5': '20%',
  			'2/5': '40%',
  			'3/5': '60%',
  			'4/5': '80%'
  		},
  		height: {
  			'1/5': '20%',
  			'2/5': '40%',
  			'3/5': '60%',
  			'4/5': '80%'
  		},
  		inset: {
  			'1/5': '20%',
  			'2/5': '40%',
  			'3/5': '60%',
  			'4/5': '80%'
  		},
  		spacing: {
  			'18': '4.5rem',
  			'26': '6.5rem',
  			'66': '16.5rem',
  			'68': '17rem',
  			'76': '18.5rem',
  			'1/5': '20%',
  			'2/5': '40%',
  			'3/5': '60%',
  			'4/5': '80%'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {
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
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate"), require('tailwind-scrollbar'), require('@tailwindcss/typography'),],
};
