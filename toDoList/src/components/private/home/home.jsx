import Form from '../form/Form.jsx'


const Home = ({isAuth, setIsAuth, securityToken, setSecurityToken}) => {

const logout = () => {
    setIsAuth(false);
    setSecurityToken("");
    document.cookie = `token=`
}

return <>
        <section>
            <div style={{display: "grid", gridTemplateColumns: ".75fr .25fr"}}>
            <h2 style={{textAlign: "center", fontFamily: "arial", fontSize:"1.5em"}}> 
            To do list: <br/> 
            <span style={{textAlign: "center", fontFamily: "arial", fontSize:"0.5em"}}>
                To start, insert a new list of tasks and then insert the title double clicking in "Insert Title Here" and then double click again to save it!
            </span>  
            </h2>
            <button style={{height:"40%", margin:"auto"}} onClick={logout}> Log out </button>
            </div>
            <Form />
        </section>
        </>;
}

export default Home;