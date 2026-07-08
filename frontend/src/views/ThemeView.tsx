import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { updateProfile } from '../api/DevTreeAPI'
import { buttonStyleOptions, fontOptions, getBackgroundStyle, getButtonClassName, getFontClassName, parseTheme } from '../data/theme'
import type { BackgroundType, Theme, User } from '../types'

export default function ThemeView() {
    const queryClient = useQueryClient()
    const data: User = queryClient.getQueryData(['user'])!
    const [theme, setTheme] = useState<Theme>(parseTheme(data.theme))

    const updateProfileMutation = useMutation({
        mutationFn: updateProfile,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: () => {
            toast.success('Personalización guardada')
            queryClient.invalidateQueries({ queryKey: ['user'] })
        }
    })

    const handleChange = (changes: Partial<Theme>) => {
        setTheme(prev => ({ ...prev, ...changes }))
    }

    const handleSave = () => {
        const user: User = queryClient.getQueryData(['user'])!
        updateProfileMutation.mutate({ ...user, theme: JSON.stringify(theme) })
    }

    return (
        <div className="bg-gradient-to-r from-purple-900 to-blue-900 border border-purple-500/40 shadow-lg shadow-purple-900/40 rounded-2xl p-10 space-y-6">
            <legend className="text-2xl text-white text-center font-bold tracking-wide">Personalizar Perfil</legend>

            <div className="grid grid-cols-1 gap-2">
                <label className="text-purple-200 text-sm font-medium">Tipo de fondo:</label>
                <div className="flex gap-3">
                    {(['solid', 'gradient', 'image'] as BackgroundType[]).map(type => (
                        <button
                            key={type}
                            type="button"
                            onClick={() => handleChange({ backgroundType: type })}
                            className={`flex-1 py-2 rounded-lg text-sm font-bold capitalize transition-colors ${theme.backgroundType === type ? 'bg-purple-500 text-white' : 'bg-white/10 text-purple-200'}`}
                        >
                            {type === 'solid' ? 'Sólido' : type === 'gradient' ? 'Degradado' : 'Imagen'}
                        </button>
                    ))}
                </div>
            </div>

            {theme.backgroundType === 'solid' && (
                <div className="grid grid-cols-1 gap-2">
                    <label className="text-purple-200 text-sm font-medium">Color de fondo:</label>
                    <input
                        type="color"
                        value={theme.backgroundColor}
                        onChange={e => handleChange({ backgroundColor: e.target.value })}
                        className="h-10 w-full rounded-lg cursor-pointer"
                    />
                </div>
            )}

            {theme.backgroundType === 'gradient' && (
                <div className="grid grid-cols-2 gap-4">
                    <div className="grid grid-cols-1 gap-2">
                        <label className="text-purple-200 text-sm font-medium">Color inicial:</label>
                        <input
                            type="color"
                            value={theme.gradientFrom}
                            onChange={e => handleChange({ gradientFrom: e.target.value })}
                            className="h-10 w-full rounded-lg cursor-pointer"
                        />
                    </div>
                    <div className="grid grid-cols-1 gap-2">
                        <label className="text-purple-200 text-sm font-medium">Color final:</label>
                        <input
                            type="color"
                            value={theme.gradientTo}
                            onChange={e => handleChange({ gradientTo: e.target.value })}
                            className="h-10 w-full rounded-lg cursor-pointer"
                        />
                    </div>
                </div>
            )}

            {theme.backgroundType === 'image' && (
                <div className="grid grid-cols-1 gap-2">
                    <label className="text-purple-200 text-sm font-medium">URL de la imagen:</label>
                    <input
                        type="text"
                        value={theme.backgroundImage}
                        onChange={e => handleChange({ backgroundImage: e.target.value })}
                        placeholder="https://..."
                        className="bg-white/10 border border-purple-400/30 text-white placeholder-purple-300/50 rounded-lg px-3 py-2 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-colors"
                    />
                </div>
            )}

            <div className="grid grid-cols-1 gap-2">
                <label className="text-purple-200 text-sm font-medium">Tipografía:</label>
                <select
                    value={theme.font}
                    onChange={e => handleChange({ font: e.target.value as Theme['font'] })}
                    className="bg-white/10 border border-purple-400/30 text-white rounded-lg px-3 py-2 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-colors"
                >
                    {fontOptions.map(option => (
                        <option key={option.value} value={option.value} className="bg-slate-900">{option.label}</option>
                    ))}
                </select>
            </div>

            <div className="grid grid-cols-1 gap-2">
                <label className="text-purple-200 text-sm font-medium">Forma de los botones:</label>
                <select
                    value={theme.buttonStyle}
                    onChange={e => handleChange({ buttonStyle: e.target.value as Theme['buttonStyle'] })}
                    className="bg-white/10 border border-purple-400/30 text-white rounded-lg px-3 py-2 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-colors"
                >
                    {buttonStyleOptions.map(option => (
                        <option key={option.value} value={option.value} className="bg-slate-900">{option.label}</option>
                    ))}
                </select>
            </div>

            <div className="grid grid-cols-1 gap-2">
                <label className="text-purple-200 text-sm font-medium">Vista previa:</label>
                <div
                    className={`p-6 rounded-2xl space-y-4 ${getFontClassName(theme.font)}`}
                    style={getBackgroundStyle(theme)}
                >
                    <p className="text-white text-center font-bold text-lg">@{data.handle}</p>
                    <div className={`bg-white/10 border border-white/20 px-4 py-3 text-white text-center ${getButtonClassName(theme.buttonStyle)}`}>
                        Enlace de ejemplo
                    </div>
                </div>
            </div>

            <button
                type="button"
                onClick={handleSave}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 transition-all duration-200 p-3 text-lg w-full uppercase text-white rounded-xl font-bold shadow-lg shadow-purple-900/40 tracking-widest cursor-pointer"
            >Guardar Cambios</button>
        </div>
    )
}
