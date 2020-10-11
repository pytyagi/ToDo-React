import React, { useState } from "react";
import uuid from "react-uuid";
import "./styles.css";

function Header({ addTask, handleChange }) {
  return (
    <>
      <h1 className="head">Task List</h1>
      <div className="form-input">
        <textarea
          type="text"
          placeholder="Add a task.."
          onFocus={clearText}
          onChange={handleChange}
        />
        <img
          className="add"
          src={require("../src/addIcon.jpg")}
          alt=""
          onClick={addTask}
        />
      </div>
    </>
  );
}

const RenderList = ({ task, deleteTask }) => {
  return (
    <>
      {task.length > 0 && (
        <div className="list-container">
          {task.map(
            ({ id, text }) =>
              text && (
                <div className="list-item" key={id}>
                  <div className="text-item">{text}</div>
                  <img
                    className="delete"
                    src={require("../src/deleteIcon.jpg")}
                    alt=""
                    onClick={deleteTask}
                    id={id}
                  />
                </div>
              )
          )}
        </div>
      )}
    </>
  );
};

const clearText = (e) => {
  e.target.value = "";
};

export default function App() {
  const [val, setVal] = useState("");
  const [task, setTask] = useState([]);

  const handleChange = (e) => {
    e.preventDefault();
    setVal(e.target.value);
  };
  const addTask = () => {
    setTask([...task, { id: uuid(), text: val }]);
  };
  const deleteTask = (e) => {
    const targetId = e.target.getAttribute("id");
    const updatedTask = task.filter((item) => item.id !== targetId);
    setTask(updatedTask);
  };

  return (
    <div className="container">
      <Header addTask={addTask} handleChange={handleChange} />
      <RenderList task={task} deleteTask={deleteTask} />
    </div>
  );
}
