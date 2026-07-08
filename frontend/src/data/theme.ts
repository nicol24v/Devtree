import type { CSSProperties } from "react"
import type { ButtonStyle, FontOption, Theme } from "../types"

export const DEFAULT_THEME: Theme = {
    backgroundType: 'gradient',
    backgroundColor: '#0f172a',
    gradientFrom: '#581c87',
    gradientTo: '#1e3a8a',
    backgroundImage: '',
    font: 'sans',
    buttonStyle: 'shadow'
}

export const fontOptions: { value: FontOption, label: string, className: string }[] = [
    { value: 'sans', label: 'Sans Serif', className: 'font-sans' },
    { value: 'serif', label: 'Serif', className: 'font-serif' },
    { value: 'mono', label: 'Monoespaciada', className: 'font-mono' },
]

export const buttonStyleOptions: { value: ButtonStyle, label: string, className: string }[] = [
    { value: 'rounded', label: 'Redondeados', className: 'rounded-full' },
    { value: 'square', label: 'Rectangulares', className: 'rounded-none' },
    { value: 'shadow', label: 'Con sombra', className: 'rounded-xl shadow-lg shadow-purple-900/50' },
]

export function parseTheme(theme?: string): Theme {
    if (!theme) return DEFAULT_THEME
    try {
        return { ...DEFAULT_THEME, ...JSON.parse(theme) }
    } catch {
        return DEFAULT_THEME
    }
}

export function getFontClassName(font: FontOption): string {
    return fontOptions.find(option => option.value === font)?.className ?? fontOptions[0].className
}

export function getButtonClassName(buttonStyle: ButtonStyle): string {
    return buttonStyleOptions.find(option => option.value === buttonStyle)?.className ?? buttonStyleOptions[0].className
}

export function getBackgroundStyle(theme: Theme): CSSProperties {
    if (theme.backgroundType === 'solid') {
        return { backgroundColor: theme.backgroundColor }
    }
    if (theme.backgroundType === 'image' && theme.backgroundImage) {
        return {
            backgroundImage: `url(${theme.backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
        }
    }
    return {
        backgroundImage: `linear-gradient(to bottom right, ${theme.gradientFrom}, ${theme.gradientTo})`
    }
}
