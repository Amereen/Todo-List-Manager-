import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import axios from 'axios';
import { Link } from 'react-router-dom';


function TodoShow() {
    const { id } = useParams();
    const [todo, setTodo] = useState(null);
    const [category, setCategory] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:9292/todos/${id}`)
            .then(res => {
                setTodo(res.data);
                axios.get(`http://localhost:9292/categories/${res.data.category_id}`)
                    .then(res => {
                        setCategory(res.data.name);
                    })
                    .catch(err => {
                        console.log(err);
                    });
            })
            .catch(err => {
                console.log(err);
            });
    }, [id]);

    const handleDelete = () => {
        axios.delete(`http://localhost:9292/todos/${todo.id}`)
            .then(() => {
                window.location.reload();
            })
            .catch((error) => {
                console.log(error);
            });
    };

    if (!todo) {
        return <div>Loading...</div>;
    }

    return (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                        { todo.name }
                    </h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">
                        { category && `Category: ${category}` }
                    </p>
                    <div className="flex justify-end mt-2">
                        <button onClick={ handleDelete } className="bg-red-500 hover:bg-red-600 rounded-md px-4 py-2 text-white mr-2">
                            <AiFillDelete />
                        </button>
                        <Link to={ `/update/${todo.id}` }>
                            <button className="bg-blue-500 hover:bg-blue-600 rounded-md px-4 py-2 text-white">
                                <AiFillEdit />
                            </button>
                        </Link>
                    </div>
                </div>
                <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                    <dl className="sm:divide-y sm:divide-gray-200">
                        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                                Description
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                { todo.description }
                            </dd>
                        </div>

                        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                                Status
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                { todo.status }
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>
        </div>
    );
}

export default TodoShow;
