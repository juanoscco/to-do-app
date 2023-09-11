"use client";
import React, { useState } from "react";
import { TodoList } from "@/components/TodoList";
import { Montserrat } from "next/font/google";
import { Raleway } from "next/font/google";

const raleway = Raleway({ subsets: ["latin"] });
const montserrat = Montserrat({ subsets: ["cyrillic"] });

export default function Home() {
  const {
    newTodo,
    setNewTodo,
    handleAddTodo,
    handleToggleTodo,
    handleSetVisibilityFilter,
    VisibilityFilter,
    filteredTodos,
    handleRemoveTodo,
    handleDeleteAll,
    visibilityFilter,
  } = TodoList();

  // Estado local para rastrear el filtro activo
  const [activeFilter, setActiveFilter] = useState(VisibilityFilter.SHOW_ALL);

  // Función para manejar el cambio de filtro
  const handleFilterChange = (filter: typeof visibilityFilter) => {
    handleSetVisibilityFilter(filter);
    setActiveFilter(filter);
  };

  return (
    <main className="container mx-auto px-6 min-h-screen flex flex-col justify-between">
      <section>
        <h1
          className={`
        ${raleway.className} 
        text-center 
        font-bold 
        text-3xl 
        tracking-tighter
        pt-6
        `}
        >
          #todo
        </h1>

        <section className={`${montserrat.className} mt-6`}>
          <section
            className="flex justify-around pt-4 pl-4 pr-4"
            style={{ borderBottom: "1px solid #BDBDBD" }}
          >
            {/* Botón "All"  */}
            <button
              onClick={() => handleFilterChange(VisibilityFilter.SHOW_ALL)}
              className={`${
                activeFilter === VisibilityFilter.SHOW_ALL
                  ? "active-button"
                  : ""
              }transition duration-150 ease-out h-12 font-semibold md:text-sm text-xs`}
              style={{
                width: "5.5625rem",
                borderBottom:
                  activeFilter === VisibilityFilter.SHOW_ALL
                    ? "0.25rem solid #2F80ED"
                    : "none",
              }}
            >
              All
            </button>

            {/* Botón "Active" */}
            <button
              onClick={() => handleFilterChange(VisibilityFilter.SHOW_ACTIVE)}
              className={`${
                activeFilter === VisibilityFilter.SHOW_ACTIVE
                  ? "active-button"
                  : ""
              } transition duration-150 ease-out h-12 font-semibold md:text-sm text-xs`}
              style={{
                width: "5.5625rem",
                borderBottom:
                  activeFilter === VisibilityFilter.SHOW_ACTIVE
                    ? "0.25rem solid #2F80ED"
                    : "none",
              }}
            >
              Active
            </button>

            {/* Botón "Completed" */}
            <button
              onClick={() =>
                handleFilterChange(VisibilityFilter.SHOW_COMPLETED)
              }
              className={`${
                activeFilter === VisibilityFilter.SHOW_COMPLETED
                  ? "active-button"
                  : ""
              }transition duration-150 ease-out h-12 font-semibold md:text-sm text-xs`}
              style={{
                width: "5.5625rem",

                borderBottom:
                  activeFilter === VisibilityFilter.SHOW_COMPLETED
                    ? "0.25rem solid #2F80ED"
                    : "none",
              }}
            >
              Completed
            </button>
          </section>
          {/* Aquí se agrega la condición para ocultar el input */}
          <div className="flex justify-between gap-2">
            {visibilityFilter !== VisibilityFilter.SHOW_COMPLETED && (
              <React.Fragment>
                <input
                  type="text"
                  placeholder="add details"
                  value={newTodo}
                  onChange={(e) => setNewTodo(e.target.value)}
                  className="outline-none h-14 w-11/12 rounded-xl p-4 border-2 border-gay-300 mt-4 placeholder:text-sm text-sm"
                  style={{
                    border: "1px solid #BDBDBD",
                  }}
                />
                <button
                  className="flex items-center justify-center	mt-4 h-14 lg:w-24 w-1/4  bg-blue-600	rounded-xl text-neutral-50"
                  onClick={handleAddTodo}
                >
                  Add
                </button>
              </React.Fragment>
            )}
          </div>
          <ul className="mt-3">
            {filteredTodos().map((todo) => (
              <li className="flex justify-between	items-center mt-3" key={todo.id}>
                <div className="flex gap-2 items-center">
                  <input
                    type="checkbox"className="checked:bg-blue-500"
                    checked={todo.completed}
                    onChange={() => handleToggleTodo(todo.id)}
                    
                  />
                  <p
                    className="font-medium text-sm"
                    onClick={() => handleToggleTodo(todo.id)}
                    style={{
                      textDecoration: todo.completed ? "line-through" : "none",
                    }}
                  >
                    {todo.text}
                  </p>
                </div>

                {visibilityFilter === VisibilityFilter.SHOW_COMPLETED && (
                  <button onClick={() => handleRemoveTodo(todo.id)}>
                    <i className="icon-trash"></i>
                  </button>
                )}
              </li>
            ))}
          </ul>
          {visibilityFilter === VisibilityFilter.SHOW_COMPLETED && (
            <div className="flex justify-end mt-2">
              <button
                className="flex justify-center items-center bg-red-500	w-28 h-10	 rounded"
                onClick={handleDeleteAll}
              >
                <i className="icon-trash-small"></i>
                <p className="text-white text-xs">delete All</p>
              </button>
            </div>
          )}
        </section>
      </section>
      <footer className={`${montserrat.className} text-center pb-4`}>
        <p className="" style={{ color: "rgba(169, 169, 169, 1)" }}>
          created by
          <a
            className="font-bold"
            href="https://github.com/jcom-dev/"
            target="_blank"
          >
             Juan Oscco Mori 
          </a>
           - devChallenges.io
        </p>
      </footer>
    </main>
  );
}
