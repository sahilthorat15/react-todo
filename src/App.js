
import { useRef, useState } from 'react';
import './App.css';

function App() {

  const [text, setText] = useState("");
  const [tasks, setTasks] = useState([]);
  let counter = useRef(0);

  function updateTextValue(e) {
    setText(e.target.value);
  }

  function addText() {
    if (text.trim() !== '') {
      let newTask = {
        id: counter.current++,
        content: text,
        isCompleted: false
      }
      setTasks([...tasks, newTask]);
      setText("");
    }
  }

  function checkHandler(id) {
    let newTaskList = []
    tasks.map(function (element) {
      if (id === element.id) {
        let temp = element;
        temp.isCompleted = !temp.isCompleted;
        newTaskList.push(temp);
      } else {
        newTaskList.push(element);
      }
    })
    setTasks(newTaskList);
  }


  function editTask(key) {
    let newTasks = [];
    let selectedTask = "";
    tasks.map(function (element) {
      if (element.id === key) {
        selectedTask = element.content;
      } else {
        newTasks.push(element);
      }
    })

    if (text !== '') {
      addText();
      let temp = {
        id: counter.current++,
        content: text,
        isCompleted: false
      }
      newTasks.push(temp);
    }

    setTasks(newTasks);
    setText(selectedTask);
  }


  function removeTask(id) {
    let newTasks = [];
    tasks.map(function (element) {
      if (element.id !== id) {
        newTasks.push(element);
      }
    })
    setTasks(newTasks);
  }

  // For enter
  function pressedEnter(e){
    if(e.key == "Enter"){
      addText();
    }
  }



  return (
    <div id='todo-container'>
      <div id='todo-header'>
        <input type='text' placeholder='Add new task' value={text} onChange={updateTextValue} onKeyDown={pressedEnter}/>
        <button onClick={addText}>Add</button>
      </div>
      <div id='todo-display'>
        
        {tasks.length ? tasks.map(function (task, index) {
          return (
            <li key={task.id}>
              <input type='checkbox' onChange={() => checkHandler(task.id)} checked={task.isCompleted} />
              <p style={task.isCompleted ? { textDecoration: "line-through" } : { textDecoration: "none" }}>{task.content}</p>
              <button className='edit' onClick={(e) => editTask(task.id)}>Edit</button>
              <button onClick={() => removeTask(task.id)}>Remove</button>
            </li>
          )
        }) : <p>Nothing to display</p>}

      </div>
    </div>
  );
}

export default App;
