import { useState } from "react"
import "./App.css"

function App() {
  const [todoList, setTodoList] = useState([
    { id: 0, content: "123", completed: false },
    { id: 1, content: "코딩 공부하기", completed: false },
    { id: 2, content: "잠 자기", completed: false },
  ])

  return (
    <>
      <TodoList todoList={todoList} setTodoList={setTodoList} />
      <hr />
      <TodoInput todoList={todoList} setTodoList={setTodoList} />
    </>
  )
}

function TodoInput({ todoList, setTodoList }) {
  const [inputValue, setInputValue] = useState("")

  return (
    <>
      <input value={inputValue} onChange={(event) => setInputValue(event.target.value)} />
      <button
        onClick={() => {
          const newTodo = { id: Number(new Date()), content: inputValue }
          const newTodoList = [...todoList, newTodo]
          setTodoList(newTodoList)
          setInputValue("")
        }}
      >
        추가하기
      </button>
    </>
  )
}

function TodoList({ todoList, setTodoList }) {
  return (
    <ul>
      {todoList.map((todo) => (
        <Todo key={todo.id} todo={todo} setTodoList={setTodoList} />
      ))}
    </ul>
  )
}

// 완료 체크박스
function CheckBox({ todo, setTodoList }) {
  return (
    <>
      <input
        type="checkbox"
        onChange={() => {
          setTodoList((prev) => prev.map((el) => (el.id === todo.id ? { ...el, completed: !el.completed } : el)))
        }}
      ></input>
    </>
  )
}

function Todo({ todo, setTodoList }) {
  const [inputValue, setInputValue] = useState("")
  const [isEdit, setIsEdit] = useState(false)

  return (
    <>
      <CheckBox todo={todo} setTodoList={setTodoList} />

      <li>
        {todo.completed ? <del>{todo.content}</del> : todo.content}

        {/* isEdit이 true일 때만 input창 보여주기 */}
        {isEdit && <input value={inputValue} onChange={(event) => setInputValue(event.target.value)} />}

        {/* 수정버튼 */}
        <button
          onClick={() => {
            if (isEdit) {
              setTodoList((prev) => prev.map((el) => (el.id === todo.id ? { ...el, content: inputValue } : el)))
              setIsEdit(false)
              setInputValue("")
            } else {
              setIsEdit(true)
            }
          }}
        >
          수정
        </button>

        {/* 삭제버튼 */}
        <button
          onClick={() => {
            setTodoList((prev) => {
              return prev.filter((el) => el.id !== todo.id)
            })
          }}
        >
          삭제
        </button>
      </li>
    </>
  )
}

export default App
