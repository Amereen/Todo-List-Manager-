import React from 'react';
import { FaPlus } from 'react-icons/fa';
import './Header.css';
import { NavLink } from "react-router-dom";

function Header() {
    return (
        <header className="header">
            <NavLink to='/'>
                <h1 className="header-title">
                    Reminders
                </h1>
            </NavLink>
            <NavLink to="/categories">
                <button className="header-button mr-8 underline text-md font-sans">Categories</button>
            </NavLink>
        </header>
    );
}

export default Header;
