import { useState } from 'react';
import './App.css'
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [todos, setTodos] = useState([
    { id: uuidv4(), text: "todo1", isCompleted: false },
    { id: uuidv4(), text: "todo2", isCompleted: false },
    { id: uuidv4(), text: "todo3", isCompleted: false }
  ]);

  const [newTodoText, setNewTodoText] = useState('');

  const [editText, setEditText] = useState('');
  const [editId, setEditId] = useState(null);

  const onChangeNewTodoText = (e) => {
    setNewTodoText(e.target.value)
  }

  const onClickCreateNew = () => {
    if (newTodoText === "") {
      return
    }
    const newTodos = [...todos, { id: uuidv4(), text: newTodoText, isCompleted: false }]
    setTodos(newTodos);
    setNewTodoText('');
  }

  const onClickDelete = (id) => {
    const isConfirmed = window.confirm('本当に削除していいですか？');
    if (isConfirmed) {
      const newTodos = todos.filter(todo => todo.id !== id);
      setTodos(newTodos);
    }
  }
  const onClickEdit = (todo) => {
    setEditId(todo.id);
    setEditText(todo.text);
  }

  const onChangeEditText = (e) => {
    setEditText(e.target.value)
  }

  const onClickUpdate = () => {
    const newTodos = [...todos];
    newTodos.forEach(todo => {
      if (todo.id === editId) {
        todo.text = editText;
      }
    });
    setTodos(newTodos);
    setEditId(null);
  }

  const onChangeCompleted = (id) => {
    const newTodos = [...todos];
    newTodos.forEach(todo => {
      if (todo.id === id) {
        todo.isCompleted = !todo.isCompleted;
      }
    });
    setTodos(newTodos);
  }

  return (
    <>
      <div className="inner">

        <h2>React Todo</h2>
        <div className="create-wrap">
          <input type="text" className="create-input" value={newTodoText} onChange={onChangeNewTodoText} />
          <button className="create-button" onClick={onClickCreateNew}>登録</button>
        </div>
        <ul>

          {todos.map((todo) => (
            <li key={todo.id}>
              {editId === todo.id ? (
                <>
                  <input type="text" value={editText} onChange={onChangeEditText} />
                  <button onClick={() => onClickUpdate()}>更新</button>
                </>
              ) : (
                <>
                  <input type="checkbox" checked={todo.isCompleted} onChange={() => onChangeCompleted(todo.id)} />
                  <span>{todo.text}</span>
                  <button onClick={() => onClickEdit(todo)}>編集</button>
                  <button onClick={() => onClickDelete(todo.id)}>削除</button>
                </>
              )}
            </li>
          )
          )}
        </ul>
        <div className="counter-wrap">
          <p>未完了:{todos.filter(todo => !todo.isCompleted).length}</p>
          <p>完了:{todos.filter(todo => todo.isCompleted).length}</p>
          <p>合計:{todos.length}</p>
        </div>
      </div>
    </>
  )
}

export default App
