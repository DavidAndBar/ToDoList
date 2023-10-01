import { useState } from "react";
import "./styleLoading.css";

const SignUp = () => {

    const [matchPasswords, setMatchPasswords] = useState(true);

    const submitForm = (e) => {
        e.preventDefault();
        document.getElementById("signUpButton1").disabled = true;
        document.getElementById("hiddenLoader").className = "loader";
        document.getElementById("hiddenLoaderBar").className = "loaderBar";
        
        if (e.target.password.value === e.target.confirmpassword.value) {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({
            "name": e.target.name.value.toLowerCase(),
            "email": e.target.email.value.toLowerCase(),
            "password": e.target.password.value
            });

            var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
            };

            fetch("https://todolistbackend-db.azurewebsites.net/auth/register", requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.message) {
                    alert("User Created!"); // Let the user know that their user were created.
                    window.location.href = '../'; //Once I get the result I need to redirect the user to the index page.
                } else {
                    alert("Email already exists. Please enter a new email!");
                    document.getElementById("signUpButton1").disabled = false;
                    document.getElementById("hiddenLoader").className = "hiddenLoader";
                    document.getElementById("hiddenLoaderBar").className = "hiddenLoaderBar";
                }                
            })
            .catch(error => console.log('error', error));
        } else {
            setMatchPasswords(false)
        }
    }

    return <>
        <h1> To Do List </h1>
        <form onSubmit={submitForm} method="POST">
            <label htmlFor="name"> Name: </label><br/>
            <input htmlFor="name" id="name" name="name" type="text" required/><br/>
            <label htmlFor="email"> Email: </label><br/>
            <input htmlFor="email" id="email" name="email" type='email' required/><br/>
            <label htmlFor="password"> Password: </label><br/>
            <input htmlFor="password" id="password" name="password" type="password" required minLength={6}/><br/>
            <label htmlFor="confirmpassword"> Confirm Password : </label><br/>
            <input htmlFor="confirmpassword" id="confirmpassword" name="confirmpassword" type="password" required minLength={6}/><br/>
            <> {matchPasswords ? <></> : <p className="password-mismatch"> Passwords Must Match! </p> } </>
            <div>
                <div id="hiddenLoader" className="hiddenLoader"><div id="hiddenLoaderBar" className="hiddenLoaderBar"></div></div>
                <button id="signUpButton1" type="submit" style={{width: "45%"}}> Create Account </button>
                <button id="signUpButton2" type="button" style={{width: "45%"}} onClick={() => window.location.href = '../'}> Back </button>
            </div>
        </form>
    </>
}

export default SignUp;