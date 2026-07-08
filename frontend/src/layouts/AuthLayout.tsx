import {Outlet} from 'react-router-dom'
import { Toaster } from 'sonner'

export default function AuthLayout() {
return (
    <>
        <div className="bg-gradient-to-br from-slate-950 via-purple-950 to-blue-950 min-h-screen">
                <div className=" max-w-lg mx-auto pt-10 px-5 ">
                    <div className="flex items-center justify-center gap-3">
                        <img src='/the-internet.svg' alt='Logo' className="h-12 w-auto" />
                        <span className="text-2xl font-bold bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent">MyLink</span>
                    </div>
                    <div className="py-10">
                        <Outlet />
                    </div>
                </div>

                
        </div>
        <Toaster richColors position='top-right' />
    </>
    
    )
}
