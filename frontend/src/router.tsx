import { BrowserRouter, Routes, Route} from 'react-router-dom'
import LoginView from './views/LoginView'
import RegisterView from './views/RegisterView'
import AuthLayout from './Layout/AuthLayout'
import AppLayout from './Layout/AppLayout'
import LinkTreeView from './views/LinkTreeView'
import ProfileView from './views/ProfileView'

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AuthLayout/>}>
                    <Route path='/auth/login' element={<LoginView />} />
                    <Route path='/auth/register' element={<RegisterView />} />
                </Route>

                <Route path= '/admin' element={<AppLayout/>}> {/**Para mayor seguridad restringir en la interfaz madre la validacion */}
                    <Route index={true} element={<LinkTreeView/>}/>
                    <Route path='profile' element={<ProfileView/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}