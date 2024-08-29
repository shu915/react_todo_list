import { useState } from 'react';
import './App.css'

function App() {
  const [todos, setTodos] = useState([
    { text: "todo1", isCompleted: false },
    { text: "todo2", isCompleted: false },
    { text: "todo3", isCompleted: false }
  ]);

  const [newTodoText, setNewTodoText] = useState('');

  const [editText, setEditText] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  const onChangeNewTodoText = (e) => {
    setNewTodoText(e.target.value)
  }

  const onClickCreateNew = () => {
    if (newTodoText === "") {
      return
    }
    const newTodos = [...todos, { text: newTodoText, isCompleted: false }]
    setTodos(newTodos);
    setNewTodoText('');
  }

  const onClickDelete = (index) => {
    const isConfirmed = window.confirm('本当に削除していいですか？');
    if (isConfirmed) {
      const newTodos = [...todos]
      newTodos.splice(index, 1);
      setTodos(newTodos);
    }
  }
  const onClickEdit = (index) => {
    setEditIndex(index);
    setEditText(todos[index].text);
  }

  const onChangeEditText = (e) => {
    setEditText(e.target.value)
  }


  const onClickUpdate = (index) => {
    const newTodos = [...todos];
    newTodos[index].text = editText;
    setTodos(newTodos);
    setEditIndex(null);
  }

  const onChangeCompleted = (index) => {
    const newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
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

          {todos.map((todo, index) => (
            <li key={todo.text}>
              {editIndex === index ? (
                <>
                  <input type="text" value={editText} onChange={onChangeEditText} />
                  <button onClick={() => onClickUpdate(index)}>更新</button>
                </>
              ) : (
                <>
                  <input type="checkbox" checked={todo.isCompleted} onChange={() => onChangeCompleted(index)} />
                  <span>{todo.text}</span>
                  <button onClick={() => onClickEdit(index)}>編集</button>
                  <button onClick={() => onClickDelete(index)}>削除</button>
                </>
              )}
            </li>
          )
          )}
        </ul>
        <div className="counter-wrap">
          <p>未完了:{todos.filter(todo => todo.isCompleted === false).length}</p>
          <p>完了:{todos.filter(todo => todo.isCompleted === true).length}</p>
          <p>合計:{todos.length}</p>
        </div>
      </div>
    </>
  )
}

export default App
