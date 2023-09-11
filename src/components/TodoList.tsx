import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store/config/store";
import {
  addTodo,
  toggleTodo,
  removeTodo,
  VisibilityFilter,
  setVisibilityFilter,
  deleteAll,
} from "@/store/reducer/todoSlice";

export const TodoList = () => {

  const { todos, visibilityFilter } = useSelector(
    (state: RootState) => state.todos
  );


  const dispatch: AppDispatch = useDispatch();

  const [newTodo, setNewTodo] = useState("");

  const handleAddTodo = () => {
    if (newTodo.trim() !== "") {
      dispatch(addTodo(newTodo));
      setNewTodo("");
    }
  };

  const handleToggleTodo = (id: number) => {
    dispatch(toggleTodo(id));
  };

  const handleRemoveTodo = (id: number) => {
    dispatch(removeTodo(id));
  };

  const handleSetVisibilityFilter = (filter: string) => {
    dispatch(setVisibilityFilter(filter as VisibilityFilter));
  };

  const handleDeleteAll = () => {
    dispatch(deleteAll());
  };

  const filteredTodos = () => {
    switch (visibilityFilter) {
      case VisibilityFilter.SHOW_COMPLETED:
        return todos.filter((todo) => todo.completed);
      case VisibilityFilter.SHOW_ACTIVE:
        return todos.filter((todo) => !todo.completed);
      case VisibilityFilter.SHOW_ALL:
      default:
        return todos;
    }
  };

  return {
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
    setVisibilityFilter
  };
};
