//import React, {useEffect, useState} from 'react';
import React, { useEffect, useState } from 'react';
import MenuItem from "../../../components/Common/menu-item"
import Button from "../../../components/Common/button";
import { useParams, useNavigate } from 'react-router-dom';

const Menu = () => {
    const { id } = useParams();
    const [menu, setMenu] = useState([]);
    const [query, setQuery] = useState({search: '', page: 1})
    const [totalPages, setTotalPages] = useState(1)
    let navigate = useNavigate();

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
                    <MenuItem id={item.id} name={item.name} price={item.price} description={item.description} edit="false"/>
                ))}
            </div>
        </div>
        : 
        <div>
            <p>There are no items in the menu yet</p>
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
            </div>
        </div>
    </>
}

export default Menu