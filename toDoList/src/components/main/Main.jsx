import { useState } from 'react'; // We import useState from react to use it to render variables.
import { Route, BrowserRouter, Routes} from 'react-router-dom';
import Home from '../private/home/home.jsx';
import Index from '../public/LogIn.jsx';
import SignUp from '../public/SignUp.jsx';

const Main = () =>{    
    const [isAuth, setIsAuth] = useState(false);
    const [securityToken, setSecurityToken] = useState(document.cookie.slice(6));

    const checkSecurityToken = () => {
        
        if (securityToken !== "") {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
    
            var raw = JSON.stringify({
                "token": securityToken
            });
    
            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };
    
            fetch("https://todolistbackend-db.azurewebsites.net/auth/checktoken", requestOptions)
            .then(result => result.json())
            .then(result => {
                if (result.message) {
                    setIsAuth(true);
                }
            })
            .catch(error => console.log('error', error));
        }
    }
    
    checkSecurityToken();

    return <>
            <BrowserRouter>
                <Routes>
                    {
                        !!!isAuth ?<>
                        <Route path="/" element={<Index checkSecurityToken={checkSecurityToken} isAuth={isAuth} setIsAuth={setIsAuth}
                                                        securityToken={securityToken} setSecurityToken={setSecurityToken}/>} />
                        <Route path="/signUp" element={<SignUp />}/>
                        </> :
                        <> 
                        <Route path="/" element={<Home isAuth={isAuth} setIsAuth={setIsAuth}
                                                        securityToken={securityToken} setSecurityToken={setSecurityToken}/>} /></>
                    }
                </Routes>
            </BrowserRouter>
        </>
};

export default Main;