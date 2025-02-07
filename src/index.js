const plugin = require('tailwindcss/plugin');

const icons = require('./manifest.js');

module.exports = (options = {}) => {
    return {
        config(config) {
            let { pro, version, family, custom } = options;

            icons.push(...(custom || []));

            const fontVersion = version === 6 ? 'Font Awesome 6' : 'Font Awesome 5';
            let fontFamily = pro ? `"${fontVersion} Pro"` : `"${fontVersion} Free"`;

            if (family === 'sharp') {
                fontFamily = '"Font Awesome 6 Sharp"';
            }

            return {
                theme: {
                    iconStyle: {
                        thin: '100',
                        light: '300',
                        regular: '400',
                        solid: '900'
                    },
                    iconSpacing: {
                        xs: 'var(--spacing-1)',
                        sm: 'var(--spacing-2)',
                        md: 'var(--spacing-3)',
                        lg: 'var(--spacing-4)',
                        xl: 'var(--spacing-5)',
                        '2xl': 'var(--spacing-6)',
                        '3xl': 'var(--spacing-7)'
                    }
                }
            };
        },

        styles({ addUtilities, theme }) {
            const iconStyle = theme('iconStyle');
            const iconSpacing = theme('iconSpacing');

            // Base positioning utilities
            const utilities = [
                {
                    '@utility icon-before::before, icon-after::after, icon-outside::before, icon-inline': {
                        display: 'inline-block',
                        'text-rendering': 'auto',
                        '-webkit-font-smoothing': 'antialiased'
                    }
                },
                {
                    '@utility icon-before': {
                        '&::before': {
                            fontFamily,
                            verticalAlign: 'middle'
                        },
                        '&::after': {
                            content: '"" !important'
                        }
                    }
                },
                {
                    '@utility icon-after': {
                        '&::before': {
                            content: '"" !important'
                        },
                        '&::after': {
                            fontFamily,
                            verticalAlign: 'middle'
                        }
                    }
                },
                {
                    '@utility icon-outside': {
                        '&::before': {
                            fontFamily,
                            verticalAlign: 'middle',
                            position: 'absolute',
                            transform: 'translateX(-1.5em)'
                        },
                        '&::after': {
                            content: '"" !important'
                        }
                    }
                },
                {
                    '@utility icon-inline': {
                        fontFamily,
                        verticalAlign: 'middle'
                    }
                }
            ];

            // Styles
            Object.entries(iconStyle).forEach(([key, value]) => {
                utilities.push({
                    [`@utility icon-${key}`]: {
                        '&::before,&::after': {
                            fontWeight: value
                        }
                    }
                });
            });

            // Font families
            utilities.push({
                '@utility icon-duotone': {
                    '&.icon-inline,&::before,&::after': {
                        fontFamily: `"${fontVersion} Duotone"`
                    }
                },
                '@utility icon-brands': {
                    '&.icon-inline,&::before,&::after': {
                        fontFamily: `"${fontVersion} Brands"`
                    }
                }
            });

            // Spacing
            Object.entries(iconSpacing).forEach(([key, value]) => {
                utilities.push({
                    [`@utility icon-space-${key}`]: {
                        '&.icon-before::before': {
                            marginRight: value
                        },
                        '&.icon-after::after': {
                            marginLeft: value
                        }
                    }
                });
            });

            // Alignment
            utilities.push({
                '@utility icon-baseline': {
                    '&::before,&::after': {
                        verticalAlign: 'baseline !important'
                    }
                },
                '@utility icon-sub': {
                    '&::before,&::after': {
                        verticalAlign: 'sub !important'
                    }
                },
                '@utility icon-super': {
                    '&::before,&::after': {
                        verticalAlign: 'super !important'
                    }
                },
                '@utility icon-top': {
                    '&::before,&::after': {
                        verticalAlign: 'top !important'
                    }
                },
                '@utility icon-middle': {
                    '&::before,&::after': {
                        verticalAlign: 'middle !important'
                    }
                },
                '@utility icon-bottom': {
                    '&::before,&::after': {
                        verticalAlign: 'bottom !important'
                    }
                }
            });

            // Icons
            icons.forEach((icon) => {
                utilities.push({
                    [`@utility icon-${icon.name}`]: {
                        '&::before': {
                            content: `"\\${icon.code}"`
                        },
                        '&::after': {
                            content: `"\\${icon.code}"`
                        }
                    }
                });
            });

            addUtilities(utilities);
        }
    };
};
