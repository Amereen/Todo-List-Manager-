import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AllCategory() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:9292/categories')
            .then(response => {
                setCategories(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    return (
        <div className="flex flex-col">
            <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Select a category:</label>
            <select id="category" className="cursor-default relative w-full rounded-md border border-gray-300 bg-white pl-3 pr-10 py-3 text-left focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition ease-in-out duration-150 sm:text-sm sm:leading-5">
                { categories.map(category => (
                    <option key={ category.id } value={ category.id }>{ category.name }</option>
                )) }
            </select>
        </div>
    );
}

export default AllCategory;
