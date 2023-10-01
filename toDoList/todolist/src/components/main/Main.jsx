import { useState } from 'react'; // We import useState from react to use it to render variables.
import { Route, BrowserRouter, Routes} from 'react-router-dom';
import Home from '../private/home/home.jsx';
import Index from '../public/LogIn.jsx';
import SignUp from '../public/SignUp.jsx';

const Main = () =>{

    const [isAuth, setIsAuth] = useState(false)
    const [securityToken, setSecurityToken] = useState();

    return <>
            <BrowserRouter>
                <Routes>
                    {
                        isAuth && securityToken ? <> 
                        <Route path="/" element={<Home isAuth={isAuth} setIsAuth={setIsAuth}
                                                        securityToken={securityToken} setSecurityToken={setSecurityToken}/>} /></>: 
                        <>
                        <Route path="/" element={<Index isAuth={isAuth} setIsAuth={setIsAuth}
                                                        securityToken={securityToken} setSecurityToken={setSecurityToken}/>} />
                        <Route path="/signUp" element={<SignUp />}/>
                        </>
                    }
                </Routes>
            </BrowserRouter>
        </>
};

export default Main;