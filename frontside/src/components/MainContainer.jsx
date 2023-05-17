import React from 'react'
import {NavLink} from "react-router-dom";
import AllTodos from './todo/AllTodos';

function CategoryContainer() {
    const buttonStyle = {
        background: '#487eb0',
        cursor: 'pointer'
    };
    return (
        <div>
            <div className="mt-4 flex justify-end">
                <NavLink to='new-todo'>
                    <button className="text-white font-bold py-2 px-4" style={buttonStyle}>
                        Create New Todo
                    </button>
                </NavLink>
            </div>
            <div>
                <AllTodos/>
            </div>
        </div>
    )
}

export default CategoryContainer
