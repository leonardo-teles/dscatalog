import React, { useEffect, useState } from 'react';
import { getAccessTokenDecoded, logout } from 'core/utils/auth';
import { Link, NavLink, useLocation } from 'react-router-dom';
import Menu from 'core/assets/imagens/menu.svg';

import './styles.scss';

const Navbar = () => {
    const [menuActive, setMenuActive] = useState(false);
    const [usuarioCorrente, setUsuarioCorrente] = useState('');
    const location = useLocation();

    useEffect(() => {
        const usuarioCorrenteData = getAccessTokenDecoded();
        setUsuarioCorrente(usuarioCorrenteData.user_name);
    }, [location]);


    const handleLogout = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        event.preventDefault();
        logout();
    }

    return (
        <nav className="bg-primary main-nav">

            <Link to="/" className="nav-logo-text">
                <h4>DS Catalog</h4>
            </Link>
            <button className="btn-menu-mobile" type="button" onClick={() => setMenuActive(!menuActive)}>
                <img src={Menu} alt="Mobile Menu"/>
            </button>            

            <div className={menuActive ? "menu-mobile-container" : "menu-container"}>
                <ul className="main-menu">
                    <li>
                        <NavLink to="/" exact className="nav-link" onClick={() => setMenuActive(false)}>
                            HOME
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/produtos" className="nav-link" onClick={() => setMenuActive(false)}>
                            CATÁLOGO
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/admin" className="nav-link" onClick={() => setMenuActive(false)}>
                            ADMIN
                        </NavLink>
                    </li>
                    {menuActive && (
                            <li>
                                {
                                    usuarioCorrente && (
                                        <a 
                                            href="#logout" 
                                            className="nav-link active d-inline" 
                                            onClick={(e) => {
                                                setMenuActive(false);
                                                handleLogout(e)
                                            }}
                                        >

                                            {`LOGOUT - ${usuarioCorrente}`}
                                        </a>
                                    )
                                }
                            </li>
                    )}
                    {menuActive && 
                        <>
                            {
                                !usuarioCorrente && <li>
                                    <Link to="/auth/login" className="nav-link active" onClick={() => setMenuActive(false)}>
                                        LOGIN
                                    </Link>
                                </li>
                            
                            }
                        </>
                    }
                </ul>
            </div>
            <div className="info-usuario-dnone text-right">
                { usuarioCorrente && (
                    <>
                        {usuarioCorrente}
                        <a  href="#logout" 
                            className="nav-link active d-inline" 
                            onClick={(e) => {
                              setMenuActive(false);
                              handleLogout(e)
                            }}
                        >
                            LOGOUT
                        </a>
                    </>
                  )
                }
                { !usuarioCorrente && (
                    <Link to="/auth/login" className="nav-link active" onClick={() => setMenuActive(false)}>
                        LOGIN
                    </Link>                
                )}
            </div>
        </nav>
    )
};

export default Navbar;