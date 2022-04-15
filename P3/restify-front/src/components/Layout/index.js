import {Link, Outlet} from "react-router-dom";

const Layout = () => {
    return <>
        <nav className="navbar has-shadow is-primary is-fixed-top">
            <div className="navbar-brand pl-2">
                <Link to="/" className="navbar-item">
                    <span className="icon is-large has-text-primary-dark">
                        <i className="fas fa-store fa-2x"></i>
                    </span>
                    <a href="/" className="navbar-burger">
                        <span></span>
                        <span></span>
                        <span></span>
                    </a>
                </Link>
            </div> 
            
            <div className="navbar-menu">
                <div className="navbar-item">
                    <div className="field">
                        <p className="control is-expanded has-icons-right">
                            <input className="input" type="search" placeholder="Search..."/>
                            <span className="icon is-small is-right"><i className="fas fa-search"></i></span>
                        </p>
                    </div>
                </div>
                <div className="navbar-end pr-2">
                    <Link to="/" className="navbar-item">
                        <span className="icon-text">
                            <span className="icon">
                                <i className="fas fa-home"></i>
                            </span>
                            <span>Home</span>
                        </span>
                    </Link>
                    <Link to="/browse" className="navbar-item">
                        <span className="icon-text">
                            <span className="icon">
                                <i className="fas fa-utensils"></i>
                            </span>
                            <span>Browse</span>
                        </span>
                    </Link>
                    <Link to="/restaurant/1/menu" className="navbar-item">
                        <span className="icon-text">
                            <span className="icon">
                                <i className="fas fa-store"></i>
                            </span>
                            <span>My Restaurant</span>
                        </span>
                    </Link>
                    <div className="navbar-item has-dropdown is-hoverable">
                        <Link to="/profile" className="navbar-link">
                            <span className="icon-text">
                                <span className="icon">
                                    <i className="fas fa-user"></i>
                                </span>
                                <span>Profile</span>
                            </span>
                        </Link>
        
                        <div className="navbar-dropdown is-right" style={{width: '380px'}}>
                            <article className="media">
                                <div className="media-left pt-5 pl-5">
                                    <img className="is-64x64 is-rounded" src={'https://vistapointe.net/images/stick-man-1.jpg'} alt="Person"/>
                                </div>
                                <div className="media-content py-2">
                                    <div className="content mt-1">
                                    <div className="media-content">
                                        <p className="title is-4">John Doe</p>
                                        <p className="subtitle is-6">@megabillionaire</p>
                                    </div>
                                    </div>
                                </div>
                                <div className="media-right pr-5 pt-4">
                                    <div className="box has-background-grey-lighter has-text-centered p-2" style={{width: '80px'}}>Owner</div>
                                </div>
                            </article>
        
                            <hr className="navbar-divider"/>
        
                            <Link to="/account" className="navbar-item">
                                <span className="icon is-large">
                                    <i className="fas fa-edit"></i>
                                </span>
                                <span>Edit Profile</span>
                            </Link>
        
                            <Link to="/login" className="navbar-item">
                                <span className="icon is-large">
                                    <i className="fas fa-door-open"></i>
                                </span>
                                <span>Logout</span>
                            </Link>
                        </div>
                    </div>

                    <div className="dropdown is-right is-hoverable">
                        <div className="dropdown-trigger">
                            <Link to="/notifications" className="navbar-item">
                                <span className="icon is-large has-text-light">
                                    <i className="fas fa-bell fa-2x"></i>
                                </span>
                            </Link>
                        </div>
                        <div className="dropdown-menu" id="dropdown-menu2" role="menu">
                            <div className="dropdown-content">
                                <div className="dropdown-item">Placeholder</div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </nav>

        <Outlet />
    </>
}

export default Layout