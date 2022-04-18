import React, { useEffect, useState } from 'react';
import PhotoCard from "../../../components/Common/photo-card"
import Button from "../../../components/Common/button";
import Modal from "../photo-modal";
import { useParams, useOutletContext } from 'react-router-dom';

const Gallery = () => {
    const does_own = useOutletContext();

    const { id } = useParams();
    const [gallery, setGallery] = useState([]);
    const [query, setQuery] = useState({search: '', page: 1})
    const [totalPages, setTotalPages] = useState(1)
    const [isOpen, setIsOpen] = useState(false);
    const [isDelete, setIsDelete] = useState(false);

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/restaurants/api/restaurant/` + id + `/photos/?search=${query.search}&page=${query.page}`, {
            method: 'GET',
        })
            .then(response => response.json())
            .then(data => {
                setGallery(data.results)
                setTotalPages(Math.ceil(data.count / 8))
            })
    }, [id, query, isOpen, isDelete])

    const photo_list = gallery ? <>
            <div class="columns mx-3">
                {gallery.slice(0, 3).map(photo => (
                    <div class="column is-one-third">
                        <PhotoCard id={photo.id} name={photo.name} photo={photo.image} edit={ does_own } state={ setIsDelete }/>
                    </div>
                ))}
            </div>
            <div class="columns mx-3">
                {gallery.slice(3, 6).map(photo => (
                    <div class="column is-one-third">
                        <PhotoCard id={photo.id} name={photo.name} photo={photo.image} edit={ does_own } state={ setIsDelete }/>
                    </div>
                ))}
            </div>
            <div class="columns mx-3">
                {gallery.slice(6).map(photo => (
                    <div class="column is-one-third">
                        <PhotoCard id={photo.id} name={photo.name} photo={photo.image} edit={ does_own } state={ setIsDelete }/>
                    </div>
                ))}
            </div>
        </>
        : 
        <div>
            <p>There are no items in the menu yet</p>
        </div>

    return <>
        <div id="Photos-list" style={{backgroundColor: "white"}}>
            <br/>
            <br/>

            <div className="columns is-centered" style={{marginLeft: "5%", marginRight: "5%"}}>
                <div className="column is-centered">
                    <h1 className="title is-4">Page {query.page} of {totalPages}</h1>
                </div>
            </div>

            {photo_list}

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
                        <span> Add Photo</span>
                    </button>
                    {isOpen ? <Modal setIsOpen={setIsOpen} /> : <div></div>}
                </section>
            </div> : ""}

            <br/>
        </div>
    </>
}

export default Gallery