import { useState } from "react";
import { Link } from "react-router-dom";


const LogIn = ({checkSecurityToken, isAuth, setIsAuth, securityToken, setSecurityToken}) => {

    const [ checkCredentials , setCheckCredentials] = useState(false)

    const submitForm = (e) => {
        document.getElementById("loginButton").disabled = true;
        document.getElementById("hiddenLoader").className = "loader";
        document.getElementById("hiddenLoaderBar").className = "loaderBar";

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
        "email": e.target.email.value.toLowerCase(),
        "password": e.target.password.value
        });

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        fetch("https://todolistbackend-db.azurewebsites.net/auth/login", requestOptions)
        .then(response => {
            response.json()
            .then(result => {
                if (result.message) { 
                    setCheckCredentials(false);
                    //setIsAuth(result.message);
                    const expDate = new Date();
                    expDate.setTime(expDate.getTime() + 365*24*60*60*1000) // 1 year
                    document.cookie = `token=${response.headers.get("auth-token")};expires=${expDate.toUTCString()}`;
                    checkSecurityToken();
                    window.location.href = '/';
                } else {
                    setCheckCredentials(true);
                    document.getElementById("loginButton").disabled = false;
                    document.getElementById("hiddenLoader").className = "hiddenLoader";
                    document.getElementById("hiddenLoaderBar").className = "hiddenLoaderBar";    
                }
            })
        })
        .catch(error => console.log('error', error));
        e.preventDefault();
    }

    return <>
    <h1 style={{textAlign: "center"}}> To-do list </h1>
    <p> Organize your life by creating lists </p> 
    <p> Log in to start! </p>
    <form onSubmit={submitForm} method="POST">
        <label htmlFor="email"> Email: </label><br/>
        <input htmlFor="email" id="email" name="email" type="text" required/><br/>
        <label htmlFor="password"> Password </label><br/>
        <input htmlFor="password" id="password" name="password" type="password" required/><br/>
        { checkCredentials && <> Wrong email or password! </> }
        <div id="hiddenLoader" className="hiddenLoader"><div id="hiddenLoaderBar" className="hiddenLoaderBar"></div></div>
        <button id="loginButton" type="submit"> Log In </button>
        <p>Don't have an account? <Link to="/signUp">Join free today</Link></p>
    </form>
    </>
}


export default LogIn;