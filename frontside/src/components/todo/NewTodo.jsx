import React, { useState, useEffect } from 'react';
import { FiPlus } from 'react-icons/fi';
import { FaUser, FaFileAlt, FaCheckCircle, FaFolder } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function NewTodo() {
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('waiting');
    const [categoryId, setCategoryId] = useState('');
    const navigate = useNavigate();


    useEffect(() => {
        axios.get('http://localhost:9292/categories')
            .then(response => {
                setCategories(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    const handleSubmit = event => {
        event.preventDefault();

        const data = {
            name,
            description,
            status,
            category_id: categoryId
        };

        axios.post('http://localhost:9292/todos', data)
            .then(response => {
                console.log(response.data);
                navigate("/");
            })
            .catch(error => {
                console.log(error);
            });
    };

    return (
        <div className="bg-white shadow-lg rounded-lg p-6 my-2 m-auto w-96 mt-8">
            <h1 className="text-2xl font-bold mb-4 text-center uppercase textColor">New Todo</h1>
            <form onSubmit={ handleSubmit } className="flex flex-col">
                <div className="mb-4">
                    <label htmlFor="name" className="block textColor font-bold mb-2">
                        <FaUser className="inline-block mr-2" />
                        Name:
                    </label>
                    <input type="text" id="name" value={ name } onChange={ event => setName(event.target.value) } className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required='true' />
                </div>
                <div className="mb-4">
                    <label htmlFor="description" className="block textColor font-bold mb-2">
                        <FaFileAlt className="inline-block mr-2" />
                        Description:
                    </label>
                    <textarea id="description" value={ description } onChange={ event => setDescription(event.target.value) } className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required='true'></textarea>
                </div>
                <div className="mb-4">
                    <label htmlFor="status" className="block textColor font-bold mb-2">
                        <FaCheckCircle className="inline-block mr-2" />
                        Status:
                    </label>
                    <select id="status" value={ status } onChange={ event => setStatus(event.target.value) } className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required='true'>
                        <option selected value="waiting">Not Started</option>
                        <option value="progress">In Progress</option>
                        <option value="done">Completed</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label htmlFor="category" className="block textColor font-bold mb-2">
                        <FaFolder className="inline-block mr-2" />
                        Category:
                    </label>
                    <select id="category" value={ categoryId } onChange={ event => setCategoryId(event.target.value) } className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required='true'>
                        <option value="">Select a category</option>
                        { categories.map(category => (
                            <option key={ category.id } value={ category.id }>{ category.name }</option>
                        )) }
                    </select>
                </div>
                <button
                    type="submit"
                    className="bgColor justify-center text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center"
                >
                    <FiPlus className="mr-2" />
                    Create Todo
                </button>
            </form>
        </div>

    );
}

export default NewTodo;
