import React, { useState, useCallback, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faPlus, faEdit } from '@fortawesome/free-solid-svg-icons';
import './Todo.css'; // Import the CSS file
import axios from 'axios';
import LoadingPopup from './LoadingPopup';

const url = 'https://todo-backend-hbc4.onrender.com/api/todo';
//const url = 'http://localhost:9000/api/todo';

const Todo = () => {
  const location = useLocation();
  const token = location.state?.token;
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [newTodo, setNewTodo] = useState('');
  const [todos, setTodos] = useState([]);
  const [editTodoId, setEditTodoId] = useState(null);
  const [editTodoText, setEditTodoText] = useState('');

  useEffect(() => {
    if (!token) {
      navigate('/login');
    } else {
      fetchTodos();
    }
  }, [token, navigate]);

  const fetchTodos = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(url, { headers: { 'x-token': token } });
      if (response.status === 200) {
        setTodos(response.data);
      }
    } catch (error) {
      console.error('Error fetching todos:', error);
    } finally {
      setLoading(false);
    }
  }, [token]);

  const handleClick = async () => {
    try {
      if (newTodo.trim() !== '') {
        setLoading(true);
        const res = await axios.post(url, { text: newTodo }, { headers: { 'x-token': token } });
        if (res.status === 200) {
          setNewTodo('');
          fetchTodos();
        }
      }
    } catch (err) {
      console.error('Error adding todo:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (todoId) => {
    try {
      setLoading(true);
      const res = await axios.delete(`${url}/${todoId}`, { headers: { 'x-token': token } });
      if (res.status === 200) {
        fetchTodos();
      }
    } catch (err) {
      console.error('Error deleting todo:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (todoId, currentText) => {
    setEditTodoId(todoId);
    setEditTodoText(currentText);
  };

  const handleEditSave = async () => {
    try {
      setLoading(true);
      const res = await axios.put(
        `${url}/${editTodoId}`,
        { text: editTodoText },
        { headers: { 'x-token': token } }
      );
      if (res.status === 200) {
        setEditTodoId(null);
        setEditTodoText('');
        fetchTodos();
      }
    } catch (err) {
      console.error('Error updating todo:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleEditCancel = () => {
    setEditTodoId(null);
    setEditTodoText('');
  };

  const handleLogout = () => {
  
    navigate('/login');
  };

  return (
    <>
      {loading && <LoadingPopup />}
      <nav>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </nav>
      <div className="todo-container">
        <div className="input-container">
          <input
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            className="input-field"
            placeholder="Enter new todo"
          />
          <button onClick={handleClick} className="add-button">
            <FontAwesomeIcon icon={faPlus} style={{ marginRight: '5px' }} />
            Add
          </button>
        </div>
        {todos.map((item) => (
          <div key={item._id} className="todo-item">
            <div className="todo-text">
              {editTodoId === item._id ? (
                <input
                  value={editTodoText}
                  onChange={(e) => setEditTodoText(e.target.value)}
                  className="input-field"
                />
              ) : (
                <p>{item.text}</p>
              )}
            </div>
            {editTodoId === item._id ? (
              <>
                <button
                  onClick={handleEditSave}
                  className="save-button"
                  style={{
                    marginLeft: '10px',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  Save
                </button>
                <button
                  onClick={handleEditCancel}
                  className="cancel-button"
                  style={{
                    marginLeft: '10px',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => handleEditClick(item._id, item.text)}
                  style={{
                    marginLeft: '10px',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  <FontAwesomeIcon icon={faEdit} color="blue" />
                </button>
                <button
                  onClick={() => handleDelete(item._id)}
                  style={{
                    marginLeft: '10px',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  <FontAwesomeIcon icon={faTrashAlt} color="red" />
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default Todo;
