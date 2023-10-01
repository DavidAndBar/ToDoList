//import { useState } from "react";
import AddItems from "../addItems/AddItems";
import ItemList from "../itemlist/ItemList";

const Task = ({item, setItem}) => {
    //const [item, setItem] = useState([])
    /*const setDate = () => {
        const dateNow = new Date();
            
        return <>{`${dateNow.getDate()} - ${dateNow.getMonth() + 1 } - ${dateNow.getFullYear()}`}</>;
    }*/

    return <>
            <AddItems item={item} setItem={setItem}/>
            <ItemList item={item} setItem={setItem}/>
        </>
        ;
}

export default Task