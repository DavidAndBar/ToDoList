import { useState } from "react";
import "./style.css";

const ItemList = ({item, setItem}) => {

    const [itemsCompleted, setItemsCompleted] = useState([]);

    const isCheckedItem = (checkbox) => { /* We take advantage of the value of the item clicked (id) to look for the complete information about the 
                                    that entry using item.find, we know the exact location in the array through the item.idexOf function. Then, if
                                    the completed attribute is true, once we click the button that attribute is set as false, same logic if it's false
                                    it turns true.*/
        const indexItem = item.indexOf(item.find(o => o.id === parseInt(checkbox.target.value))); // value is a string, so it needs to be transformed in int.
        const modifingEntry = item[indexItem]; //Creates an array with the entire entry to modify
        modifingEntry.completed = !modifingEntry.completed; // Converts the complete value to true
        const newArrayCompleted = [...itemsCompleted] // Creates a new array for the list of completed items
        newArrayCompleted.push(modifingEntry) // Adds the completed entry to the list of completed items
        setItemsCompleted(newArrayCompleted) // Update the items completed list to render the page
        const newArray = [...item]; // Creates a new array for the list of uncompleted items
        newArray.splice(indexItem,1); // Delete the the entry completed
        setItem(newArray); // Update the items uncompleted. 
        /*
        if (newArray[indexItem].completed === true) { // This if it's set to put in the last of the list completed items, if they are unchecked, then they go to the top of the list.
            newArray.push(modifingEntry);
            newArray.splice(indexItem,1);
        } else {
            const indexUncompleted = item.indexOf(item.find(o => o.id === parseInt(checkbox.target.value)));
            newArray.splice(indexUncompleted,1);
            newArray.splice(0,0,modifingEntry);
        }*/
        /*item[indexItem].completed = !item[indexItem].completed;   This way to update the entry doesn't work because it doesn't render the changes
                                                                    in the item array, use pass-by-reference*/
        };

    const isCheckedItemCompleted = (checkbox) => {
        const indexItem = itemsCompleted.indexOf(itemsCompleted.find(o => o.id === parseInt(checkbox.target.value))); // value is a string, so it needs to be transformed in int.
        const modifingEntry = itemsCompleted[indexItem]; //Creates an array with the entire entry to modify
        modifingEntry.completed = !modifingEntry.completed; // Converts the complete value to false
        const newArray = [...item]; // Creates a new array for the list of uncompleted items
        newArray.unshift(modifingEntry); // Add the entry modified to the start of the list.
        setItem(newArray); // Update item list
        const newArrayCompleted = [...itemsCompleted] // Creates a new array for the list of completed items
        newArrayCompleted.splice(indexItem,1) // Delete the uncompleted entry in the list of completed items
        setItemsCompleted(newArrayCompleted) // Update the items completed list to render the page
    }

    const deleteButton = (event) => {
        const indexItem = item.indexOf(item.find(o => o.id === parseInt(event.target.value)));
        const indexItemCompleted = itemsCompleted.indexOf(itemsCompleted.find(o => o.id === parseInt(event.target.value)));
        if (indexItem === -1) {
            const newArray = [...itemsCompleted];
            newArray.splice(indexItemCompleted,1);
            setItemsCompleted(newArray);
        } else {
            const newArray = [...item];
            newArray.splice(indexItem,1);
            setItem(newArray);
        }
    }

    return <>
        { item.length === 0 && itemsCompleted.length === 0 ?
        <p style={{textAlign: "center"}}>No tasks</p>:
        <table>
            <thead>
                <tr>
                    <th>Task description</th>
                    <th>Completed?</th>
                    <th>Delete task</th>
                </tr>
            </thead>
            <tbody>
            {
                item.map( ({ id, task, completed}) => 
                
                    <tr key={`row${id}`} className="row">
                        <td key={`task${id}`} className={"task"}>
                            {task}
                        </td>
                        <td key={`input${id}`}>
                            <input type="checkbox" onClick={isCheckedItem} value={id} defaultChecked={completed}/>
                        </td>
                        {/* This input is type checkbox to make it have 2 options, in this case, the task is completed or not. onClick attribute activate the 
                        function isChecked once it's clicked (more info in isChecked function). Value is setted as item.id as I need to give that value to 
                        isChecked function since they can read that variable from event.target.value*/}
                        <td key={`button${id}`}>
                            <button type="button" onClick={deleteButton} value={id} className="deleteButton"><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z"/></svg>
                            </button>
                        </td>
                    </tr>
                )
            }
            </tbody>
            {   
                itemsCompleted.length === 0 ? 
                <></> :
                itemsCompleted.map(({id, task,completed}) => 
                    <tbody key={id}>
                        <tr key={`row${id}`} className="row">
                            <td key={`task${id}`} className={"task-completed"}>{task}</td>
                            <td key={`input${id}`}><input type="checkbox" onClick={isCheckedItemCompleted} value={id} defaultChecked={completed}/></td>
                            <td key={`button${id}`}><button type="button" onClick={deleteButton} value={id} className="deleteButton"><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z"/></svg></button></td>
                        </tr>
                    </tbody>
                )
            }
        </table>}
    </>
}

export default ItemList;