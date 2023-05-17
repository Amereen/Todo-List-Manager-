import Header from "./components/header/Header";
import MainContainer from "./components/MainContainer"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ListCategory from './components/category/ListCategory';
import NewTodo from "./components/todo/NewTodo";
import TodoShow from "./components/todo/TodoShow";
import './App.css';
import UpdateTodo from "./components/todo/UpdateTodo";
function App() {
  return (
    <Router >
      <div className="bg-gray-100 w-100 h-screen">
        <Header />
        <div className="container m-auto">
          <Routes>
            <Route exact path="/categories" element={ <ListCategory /> } />
            <Route exact path="/new-todo" element={ <NewTodo /> } />
            <Route exact path="/" element={ <MainContainer /> } />
            <Route path="/todos/:id" element={ <TodoShow /> } />
            <Route path="/update/:id" element={ <UpdateTodo /> } />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
