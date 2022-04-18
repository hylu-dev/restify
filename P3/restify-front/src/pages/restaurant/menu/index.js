//import React, {useEffect, useState} from 'react';
import React, { useEffect, useState } from 'react';
import MenuItem from "../../../components/Common/menu-item"
import Button from "../../../components/Common/button";
import { useParams, useNavigate, useOutletContext } from 'react-router-dom';
import Modal from "../menu-modal";

const Menu = () => {
    const does_own = useOutletContext();

    const { id } = useParams();
    const [menu, setMenu] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState({search: '', page: 1})
    const [totalPages, setTotalPages] = useState(1)

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/restaurants/api/restaurant/` + id + `/menu/?search=${query.search}&page=${query.page}`, {
            method: 'GET',
        })
            .then(response => response.json())
            .then(data => {
                setMenu(data.results)
                setTotalPages(Math.ceil(data.count / 8))
            })
    }, [id, query])

    const menu_list = menu ? 
        <div className="box p-auto mx-6 has-shadow" style={{backgroundColor: "rgb(214, 159, 135)"}}>
            <div className="container box has-text-grey-lighter" style={{backgroundColor: "rgb(59, 59, 63)"}}>
                <div className="columns is-centered" style={{marginLeft: "5%", marginRight: "5%"}}>
                    <div className="column is-centered">
                        <h1 className="title is-4 has-text-grey-lighter">Page {query.page} of {totalPages}</h1>
                    </div>
                </div>

                <br/>
                {menu.map(item => (
                    does_own ? <MenuItem id={item.id} name={item.name} price={item.price} description={item.description} edit="true"/>
                    : <MenuItem id={item.id} name={item.name} price={item.price} description={item.description} edit="false"/>
                ))}
            </div>
        </div>
        : 
        <div>
            <p>There are no items in the menu yet</p>
        </div>

    return <>
        <div className="section" id="Menu-list" style={{backgroundColor: "white"}}>
            <div className="container">
                { menu_list }

                <div className="columns mt-4" style={{ marginLeft: "10%", marginRight: "5%" }}>
                    <section className="container has-text-centered">
                        <div className="column is-narrow">
                            {query.page > 1 ? <Button styles="" value="Previous" handler={() => setQuery({...query, page: query.page - 1})} /> : <></>}
                        </div>
                        <div className="column is-narrow">
                            {query.page < totalPages ? <Button styles="" value="Next" handler={() => setQuery({...query, page: query.page + 1})} /> : <></>}
                        </div>
                    </section>
                </div>

                {does_own ? <div className="columns mt-4" style={{ marginLeft: "10%", marginRight: "5%" }}>
                    <section className="container has-text-centered">
                        <button className="button is-success js-modal-trigger" data-target="add-item-modal" onClick={() => setIsOpen(true)}>
                            <span className="icon" style={{ marginRight: "10px"}}>
                                <i className="fas fa-plus-circle fa-2x"></i>
                            </span>
                            <span> Add Item</span>
                        </button>
                        {isOpen ? <Modal setIsOpen={setIsOpen} /> : <div></div>}
                    </section>
                </div> : ""}
            </div>
        </div>
    </>
}

export default Menu