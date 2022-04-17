import React, { useEffect, useState } from 'react';
import PhotoCard from "../../../components/Common/photo-card"
import Modal from "../photo-modal";

const Gallery = () => {
    const [isOpen, setIsOpen] = useState(false);

    return <>
        <div id="Photos-list" style={{backgroundColor: "white"}}>
            <br></br>
            <br></br>

            <div class="columns mx-3">
                <div class="column is-one-third">
                    <PhotoCard photo="https://th.bing.com/th/id/R.ee5befb6305871bd80c2bd95d734cf7a?rik=hPezj8hrEB05Mg&riu=http%3a%2f%2f4.bp.blogspot.com%2f-2RxTrhz8HS8%2fUNfHl08Q9KI%2fAAAAAAAACAg%2fYFOc4OjNeiI%2fs1600%2fDSCF8782.JPG&ehk=sd4udouHztxR6g4nPXriWW9g3ztRW70HIAf9SIDbS90%3d&risl=&pid=ImgRaw&r=0"
                    name="Prime Rib Roast"
                    date="11:09 PM - 1 Jan 2016"/>
                </div>

                <div class="column is-one-third">
                    <PhotoCard photo="https://www.lemoosecrepecafe.com/wp-content/uploads/2018/08/CAESAR-SALAD.jpg"
                    name="Caesar Salad"
                    date="11:09 PM - 1 Jan 2016"/>
                </div>

                <div class="column is-one-third">
                    <PhotoCard photo="https://th.bing.com/th/id/R.3182db5fd3af776ee5ca9a219236c8b4?rik=ItRI1HPls7%2fNaQ&riu=http%3a%2f%2fthesuburbansoapbox.com%2fwp-content%2fuploads%2f2015%2f02%2fLobster-Bisque.jpg&ehk=YQDqbJy2bl1ODya9fAUa483bcp8WtAE5C2H%2b4pWGwUM%3d&risl=&pid=ImgRaw&r=0"
                    name="Lobster Bisque"
                    date="11:09 PM - 1 Jan 2016"/>
                </div>
            </div>

            <div class="columns mx-3">
                <div class="column is-one-third">
                    <PhotoCard photo="https://www.eazypeazymealz.com/wp-content/uploads/2016/06/zuppa-toscana-slow-cooker-low-carb-10.jpg"
                    name="Zuppa Toscana"
                    date="11:09 PM - 1 Jan 2016"/>
                </div>

                <div class="column is-one-third">
                    <PhotoCard photo="https://th.bing.com/th/id/R.10d08e2a7e13a612d3231ff3dcc06a43?rik=8h8%2fHJaxGcn4Rg&riu=http%3a%2f%2fs3.amazonaws.com%2fstudio-me%2fsystem%2fphotos%2fphotos%2f000%2f434%2f154%2foriginal%2fosso-buco.jpg%3f1394183111&ehk=Fh5N9vptBswwKFOzMKOGZ3vq4W1T7BszO9S6MpWpIGQ%3d&risl=&pid=ImgRaw&r=0"
                    name="Osso Buco"
                    date="11:09 PM - 1 Jan 2016"/>
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

            <br/>
        </div>
    </>
}

export default Gallery