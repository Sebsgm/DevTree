import {Link} from 'react-router-dom'

export default function LoginView() {
    return (
        <>            
        <h1 className=' text-4xl text-white font-bold'>Iniciar Sesion</h1>

        <nav className=' mt-7'> 
                {/*Se utiliza Link para navegar de manera interna en la aplicacion, y se debe utilizar la etiqueda <a></a> para paginas externas*/}
                <Link className='text-center text-white text-lg block' to="/auth/register"> ¿No tienes cuenta? Crea una aqui</Link>
            </nav>
        </>
    )
}
