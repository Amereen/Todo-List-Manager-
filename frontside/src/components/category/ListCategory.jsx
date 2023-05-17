import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MdDelete } from 'react-icons/md';
import NewCategory from "./NewCategory";

function ListCategory() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:9292/categories')
            .then((response) => {
                setCategories(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const handleDelete = (categoryId) => {
        axios.delete(`http://localhost:9292/categories/${categoryId}`)
            .then(() => {
                axios.delete(`http://localhost:9292/todos/category/${categoryId}`)
                    .then((res) => {
                        console.log(res);
                    })
                window.location.href = '/categories';
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div className="bg-gray-100 min-h-screen py-8">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl mb-8 text-center font-sans uppercase headerss">List of Categories</h1>
                <div className="w-1/2 pl-2">
                    <NewCategory/>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    { categories.map((category) => (
                        <div key={ category.id } className="bg-white rounded-lg shadow-lg overflow-hidden">
                            <div className="p-4">
                                <h2 className="text-xl font-semibold mb-4 uppercase text-blue-400">{ category.name }</h2>
                                <button
                                    onClick={ () => handleDelete(category.id) }
                                    className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-full"
                                >
                                    <MdDelete size={ 20 } />
                                </button>
                            </div>
                        </div>
                    )) }
                </div>
            </div>
        </div>
    );
}

export default ListCategory;
