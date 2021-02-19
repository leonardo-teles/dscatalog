import React, { useEffect, useState } from 'react';
import { getAccessTokenDecoded, logout } from 'core/utils/auth';
import { Link, NavLink, useLocation } from 'react-router-dom';

import './styles.scss';

const Navbar = () => {
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

            <div className="menu-container">
                <ul className="main-menu">
                    <li>
                        <NavLink to="/" exact className="nav-link">
                            HOME
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/produtos" className="nav-link">
                            CATÁLOGO
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/admin" className="nav-link">
                            ADMIN
                        </NavLink>
                    </li>
                </ul>
            </div>
            <div className="text-right">
                { usuarioCorrente && (
                    <>
                        {usuarioCorrente}
                        <a href="#logout" className="nav-link active d-inline" onClick={handleLogout}>
                            LOGOUT
                        </a>
                    </>
                  )
                }
                { !usuarioCorrente && (
                    <Link to="/auth/login" className="nav-link active">
                        LOGIN
                    </Link>                
                )}
            </div>
        </nav>
    )
};

export default Navbar;