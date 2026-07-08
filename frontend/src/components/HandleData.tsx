import { getBackgroundStyle, getButtonClassName, getFontClassName, parseTheme } from "../data/theme"
import type { SocialNetwork, UserHandle } from "../types"

type HandleDataProps = {
    data: UserHandle
}
export default function HandleData({ data }: HandleDataProps) {

    const links: SocialNetwork[] = JSON.parse(data.links).filter((link: SocialNetwork) => link.enabled)
    const theme = parseTheme(data.theme)
    const buttonClassName = getButtonClassName(theme.buttonStyle)

    return (
        <div
            className={`space-y-6 text-white p-6 rounded-3xl ${getFontClassName(theme.font)}`}
            style={getBackgroundStyle(theme)}
        >
            <p className="text-5xl text-center font-black bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent">
                @{data.handle}
            </p>

            {data.image && (
                <div className="flex justify-center">
                    <img
                        src={data.image}
                        className="w-[200px] h-[200px] rounded-full object-cover ring-4 ring-purple-400/60 ring-offset-4 ring-offset-slate-950 shadow-lg shadow-purple-900/60"
                        alt="Imagen de perfil"
                    />
                </div>
            )}

            <p className="text-lg text-center text-purple-200 font-medium">{data.description}</p>

            <div className="border-t border-purple-500/30 my-2" />

            <div className="flex flex-col gap-4">
                {links.length ?
                    links.map(link => (
                        <a
                            key={link.name}
                            className={`bg-gradient-to-r from-purple-900/80 to-blue-900/80 border border-purple-500/40 px-5 py-3 flex items-center gap-4 hover:border-purple-400/70 hover:shadow-purple-700/50 transition-all duration-200 group ${buttonClassName}`}
                            href={link.url}
                            target="_blank"
                            rel="noreferrer noopener"
                        >
                            <img src={`/social/icon_${link.name}.svg`} alt="imagen red social" className="w-10 flex-shrink-0" />
                            <p className="text-white capitalize font-bold text-lg group-hover:text-purple-200 transition-colors">
                                Visita mi: {link.name}
                            </p>
                        </a>
                    ))
                : <p className="text-center text-purple-300">No hay enlaces en este perfil</p>}
            </div>
        </div>
    )
}
