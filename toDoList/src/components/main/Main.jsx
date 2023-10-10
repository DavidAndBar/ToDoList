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

    /*const expDate = new Date();
    const expToken = "token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"+
    ".eyJpZCI6IjY1MTQzY2E2OGYzZDNhMjAwNjIwMjMwMyIsImlhdCI6MTY5Njk1NTQwOCwiZXhwIjoyMDEyNTMxNDA4fQ"+
    ".rMgXyuk5K7pUsPa0hJye9S7aqTFEIV2BJQ93yZuBssw";
    expDate.setTime(expDate.getTime() + 365*24*60*60*1000) // 1 year
    console.log(expToken + ";expires=" +expDate.toUTCString());*/

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