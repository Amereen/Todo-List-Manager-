import React, { useState } from 'react';
import axios from 'axios';

function NewCategory() {
    const buttonStyle = {
        background: '#487eb0',
        cursor: 'pointer'
    };
    const [categoryName, setCategoryName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const url = `http://localhost:9292/categories?name=${categoryName}`;
        axios.post(url)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                window.location.reload();
            })
            .catch((error) => {
                console.log(error);
            });
        setCategoryName('');
    }

    const handleChange = (e) => {
        setCategoryName(e.target.value);
    }

    return (
        <div className='bg-white shadow-md rounded-lg p-6 my-6 category-card'>
            <form onSubmit={ handleSubmit } className="flex items-center">
                <div className='flex flex-col'>
                    <label htmlFor="categoryName" className="hidden md:inline-block mr-4 block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Category Name:</label>
                    <input
                        type="text"
                        id="categoryName"
                        value={ categoryName }
                        onChange={ handleChange }
                        className="border rounded-lg py-2 px-4 mr-4 bg-white"
                        required={ true }
                    />
                </div>
                <button
                    type="submit"
                    className="text-white font-bold mt-6 py-2 px-4" style={buttonStyle}
                >
                    Create
                </button>
            </form>
        </div>
    )
}

export default NewCategory;
