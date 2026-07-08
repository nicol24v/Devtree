import { Switch } from '@headlessui/react'
import type { DevTreeLink } from "../types"
import { classNames } from '../utils'

type DevTreeInputProps = {
    item: DevTreeLink
    handleUrlChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    handleEnableLink: (socialNetwork: string) => void
}

export default function DevTreeInput({ item, handleUrlChange, handleEnableLink }: DevTreeInputProps) {

    return (
        <div className="bg-gradient-to-r from-purple-900 to-blue-900 border border-purple-500/40 shadow-lg shadow-purple-900/40 rounded-2xl p-5 flex items-center gap-4">
            <div
                className="w-12 h-12 bg-cover rounded-full bg-white/10 p-1 flex-shrink-0"
                style={{ backgroundImage: `url('/social/icon_${item.name}.svg')` }}
            ></div>

            <input
                type="text"
                className="flex-1 bg-white/10 border border-purple-400/30 text-white placeholder-purple-300/50 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-colors"
                value={item.url}
                onChange={handleUrlChange}
                name={item.name}
            />

            <Switch
                checked={item.enabled}
                name={item.name}
                onChange={() => handleEnableLink(item.name)}
                className={classNames(
                    item.enabled
                        ? 'bg-gradient-to-r from-purple-500 to-blue-500'
                        : 'bg-slate-700',
                    'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-purple-900'
                )}
            >
                <span
                    aria-hidden="true"
                    className={classNames(
                        item.enabled ? 'translate-x-5' : 'translate-x-0',
                        'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                    )}
                />
            </Switch>
        </div>
    )
}
