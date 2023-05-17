import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function AllTodos() {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:9292/todos')
            .then(res => {
                setTodos(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    const handleDelete = (id) => {
        axios.delete(`http://localhost:9292/todos/${id}`)
            .then(res => {
                setTodos(todos.filter(todo => todo.id !== id));
            })
            .catch(err => {
                console.log(err);
            });
    };

    return (
        <div className="bg-gray-100 min-h-screen">
            <div className="max-w-4xl mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4 text-center headerss">My Todo List</h1>
                <ul className="divide-y divide-gray-300">
                    {todos.map((todo) => (
                        <li key={todo.id} className="py-2 shadow-lg px-4 bgWhite mb-4">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h2 className="text-lg font-medium uppercase">{todo.name}</h2>
                                    <p className="text-sm text-gray-600">{todo.description}</p>
                                </div>
                                <div className="flex items-center">
                <span
                    className={`px-2 py-1 rounded-full text-xs font-bold ${
                        todo.status === "done"
                            ? "bg-green-500 text-white"
                            : todo.status === "progress"
                                ? "bg-yellow-500 text-gray-900"
                                : todo.status === "waiting"
                                    ? "bg-red-500 text-white"
                                    : ""
                    }`}
                >
                  {todo.status}
                </span>
                                    <Link to={`/todos/${todo.id}`} className="ml-4 text-blue-500">
                                        View
                                    </Link>
                                    <button
                                        className="ml-4 text-red-500"
                                        onClick={() => handleDelete(todo.id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );

}

export default AllTodos;
