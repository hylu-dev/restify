//import React, {useEffect, useState} from 'react';
import React, { useEffect, useState } from 'react';
import MenuItem from "../../../components/Common/menu-item"
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";

const Menu = () => {
    const { id } = useParams();
    const [menu, setMenu] = useState([]);

    useEffect(() => {
        fetch("http://127.0.0.1:8000/restaurants/api/restaurant/" + id + "/menu/", {
            method: 'GET',
        })
            .then(response => response.json())
            .then(json => setMenu(json.data))
    }, [id])

    const menu_list = menu ? 
        <div class="box p-auto mx-6 has-shadow" style={{backgroundColor: "rgb(214, 159, 135)"}}>
            <div class="container box has-text-grey-lighter" style={{backgroundColor: "rgb(59, 59, 63)"}}>
                {menu.map(item => (
                    <MenuItem key={item.id} name={item.name} price={item.price} description={item.description}/>
                ))}
            </div>
        </div>
        : 
        <div>
            <p>There are no items in the menu yet</p>
            <button>Add item</button>
        </div>

    return <>
        <div class="section" id="Menu-list" style={{backgroundColor: "white"}}>
            <div class="container">
                <nav class="level">
                    <div class="level-left">
                    </div>
                
                    <div class="level-right">
                        <p class="level-item">
                            <Link to="/edit-menu" class="button is-primary" style={{width: "100px"}}>
                                <span class="icon-text">
                                    <span class="icon">
                                        <i class="fas fa-edit"></i>
                                    </span>
                                    <span>Edit</span>
                                </span>
                            </Link>
                        </p>
                    </div>
                </nav>
            
                { menu_list }
            </div>
        </div>
    </>
}

export default Menu