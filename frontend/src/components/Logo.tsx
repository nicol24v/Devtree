import { Link } from 'react-router-dom'

export default function Logo() {
    return (
        <Link to={'/'}>
            <img src="/the-internet.svg" className="h-14 w-auto block mx-auto md:mx-0" alt='Logotipo Devtree' />
        </Link>
    )
}
