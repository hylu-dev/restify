//import React, {useEffect, useState} from 'react';
import React, { useEffect, useState } from 'react';
import MenuItem from "../../../components/Common/menu-item"
import { useParams, useNavigate } from 'react-router-dom';

const Menu = () => {
    const { id } = useParams();
    const [menu, setMenu] = useState([]);
    let navigate = useNavigate();

    useEffect(() => {
        fetch("http://127.0.0.1:8000/restaurants/api/restaurant/" + id + "/menu/", {
            method: 'GET',
        })
            .then(response => response.json())
            .then(data => setMenu(data.results))
    }, [id])

    const menu_list = menu ? 
        <div className="box p-auto mx-6 has-shadow" style={{backgroundColor: "rgb(214, 159, 135)"}}>
            <div className="container box has-text-grey-lighter" style={{backgroundColor: "rgb(59, 59, 63)"}}>
                <br></br>
                {menu.map(item => (
                    <MenuItem id={item.id} name={item.name} price={item.price} description={item.description} edit="false"/>
                ))}
            </div>
        </div>
        : 
        <div>
            <p>There are no items in the menu yet</p>
            <button>Add item</button>
        </div>

    const edit_menu = () => {
        navigate("/restaurant/" + id + "/edit-menu")
    };

    return <>
        <div className="section" id="Menu-list" style={{backgroundColor: "white"}}>
            <div className="container">
                <nav className="level">
                    <div className="level-left">
                    </div>
                
                    <div className="level-right">
                        <p className="level-item">
                            <button className={`button is-primary`} onClick={ edit_menu } style={{width: "100px"}}>
                                <span className="icon-text">
                                    <span className="icon">
                                        <i className="fas fa-edit"></i>
                                    </span>
                                    <span>Edit</span>
                                </span>
                            </button>
                        </p>
                    </div>
                </nav>
            
                { menu_list }
            </div>
        </div>
    </>
}

export default Menu