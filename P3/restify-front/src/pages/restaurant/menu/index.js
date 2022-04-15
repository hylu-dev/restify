//import React, {useEffect, useState} from 'react';
import MenuItem from "../../../components/Common/menu-item"

const Menu = () => {
    return <>
        <div class="section" id="Menu-list" style={{backgroundColor: "white"}}>
            <div class="container">
                <nav class="level">
                    <div class="level-left">
                    </div>
                
                    <div class="level-right">
                        <p class="level-item">
                            <a href="restaurant-profile-menu-form.html" class="button is-primary" style={{width: "100px"}}>
                                <span class="icon-text">
                                    <span class="icon">
                                        <i class="fas fa-edit"></i>
                                    </span>
                                    <span>Edit</span>
                                </span>
                            </a>
                        </p>
                    </div>
                </nav>
            
                <div class="box p-auto mx-6 has-shadow" style={{backgroundColor: "rgb(214, 159, 135)"}}>
                    <div class="container box has-text-grey-lighter" style={{backgroundColor: "rgb(59, 59, 63)"}}>
                        <MenuItem name="Fresh Garden Salad" price="4" description="Better call Saul-ad!"/>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default Menu