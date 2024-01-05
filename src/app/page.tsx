"use client";
import { Itim } from "next/font/google";
import styles from "./page.module.css";
import { useEffect, useMemo, useRef, useState } from "react";

function Home() {
  const [todos, setTodos] = useState([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const [flag, setFlag] = useState(false);
  const [flagBut, setFlagBut] = useState(true);

  const BtnState = () => {
    if (inputRef.current) {
      const text = inputRef.current.value;
      if (text.length > 0) {
        setFlagBut(false);
      } else {
        setFlagBut(true);
      }
    }
  }

  const handleAddTodo = () => {
    if (inputRef.current) {
      const text = inputRef.current.value;
      if (text.length > 5) {
        const newItem = { completed: false, text };
        setTodos([...todos, newItem]);
        inputRef.current.value = "";
        setFlag(false);
        setFlagBut(true)
      } else {
        setFlag(true);
      }
    }
   
  };


  const handleItemDone = (index: number) => {
    // let doneItems= todos.filter((item)=> item.completed === true );
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  };


  

  const handleDeleteItem = (index: number) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  }

  return (
    <main className={styles.main}>
      <div className={styles.app}>
        <h2 className={styles.title}>To Do List</h2>

        <div className={styles.todoContainer}>
          <ul>
            {todos.map(({ text, completed }, index) => {
              return (
                <>
                  <div className={styles.item }>
                    <li
                      className={completed ? styles.done : ""  }
                      key={index}
                      onClick={() => handleItemDone(index)}
                    >
                      {text}
                    </li>
                    <span className={styles.delete} onClick={() => handleDeleteItem(index)}>❌</span>
                  </div>

                </>
              );
            })}
          </ul>

          <input onChange={BtnState}
            ref={inputRef}
            className={styles.input}
            placeholder="Enter item"
          />
          <h2 className={flag ? styles.massege : styles.hidMassege}>
            Please enter at least 6 characters
          </h2>
          <button onClick={handleAddTodo} className={styles.button} disabled={flagBut} >
            Add
          </button>
        </div>
      </div>
    </main>
  );
}

export default Home;
