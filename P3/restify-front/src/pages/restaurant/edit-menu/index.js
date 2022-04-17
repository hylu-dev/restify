import ReactDOM from 'react-dom';
import React, { useEffect, useState } from 'react';
import MenuItem from "../../../components/Common/menu-item";
import Button from "../../../components/Common/button";
import { useParams, useNavigate } from 'react-router-dom';
import Modal from "../../../components/Common/modal";

const Menu = () => {
    const { id } = useParams();
    const [menu, setMenu] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    let navigate = useNavigate();

    useEffect(() => {
        fetch("http://127.0.0.1:8000/restaurants/api/restaurant/" + id + "/menu/", {
            method: 'GET',
        })
            .then(response => response.json())
            .then(data => setMenu(data.results))
    }, [isOpen, id])

    const menu_list = menu ? 
        <div id="menu-list">
            {menu.map(item => (
                <MenuItem id={item.id} name={item.name} price={item.price} description={item.description} edit="true"/>
            ))}
        </div>
        : 
        <div></div>

    const back_menu = () => {
        navigate("/restaurant/" + id + "/menu")
    };

    return <>
        <div className="section" id="Menu-list" style={{backgroundColor: "white"}}>
            <div className="container">
                <nav className="level">
                    <div className="level-left">
                    </div>
                
                    <div className="level-right">
                        <p className="level-item">
                            <button className={`button is-primary`} onClick={ back_menu } style={{width: "100px"}}>
                                <span className="icon-text">
                                    <span className="icon">
                                        <i className="fas fa-arrow-left"></i>
                                    </span>
                                    <span>Back</span>
                                </span>
                            </button>
                        </p>
                    </div>
                </nav>

                <div className="box p-auto mx-6 has-shadow" style={{backgroundColor: "rgb(214, 159, 135)"}}>
                    <div className="container box has-text-grey-lighter" style={{backgroundColor: "rgb(59, 59, 63)"}}>
                        <br></br>
                        { menu_list }
                    </div>
                </div>

                <div className="columns mt-4" style={{ marginLeft: "10%", marginRight: "5%" }}>
                    <section className="container has-text-centered">
                        <button className="button is-success js-modal-trigger" data-target="add-item-modal" onClick={() => setIsOpen(true)}>
                            <span className="icon" style={{ marginRight: "10px"}}>
                                <i className="fas fa-plus-circle fa-2x"></i>
                            </span>
                            <span> Add Item</span>
                        </button>
                        {isOpen ? <Modal setIsOpen={setIsOpen} /> : <div></div>}
                    </section>
                </div>
            </div>
        </div>
    </>
}

export default Menu