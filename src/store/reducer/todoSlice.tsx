// redux/todosSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum VisibilityFilter {
  SHOW_ALL = 'SHOW_ALL',
  SHOW_COMPLETED = 'SHOW_COMPLETED',
  SHOW_ACTIVE = 'SHOW_ACTIVE',
}

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

// Utilizamos una variable para mantener un contador de ID
let nextTodoId = 1;

const todosSlice = createSlice({
  name: 'todos',
  initialState: {
    todos: [] as Todo[],
    visibilityFilter: VisibilityFilter.SHOW_ALL,
  },
  reducers: {
    addTodo: {
      reducer: (state, action: PayloadAction<Todo>) => {
        state.todos.push(action.payload);
      },
      prepare: (text: string) => ({
        payload: {
          id: nextTodoId++,
          text,
          completed: false,
        },
      }),
    },
    toggleTodo: (state, action: PayloadAction<number>) => {
      const todo = state.todos.find((t) => t.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    removeTodo: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    setVisibilityFilter: (state, action: PayloadAction<VisibilityFilter>) => {
      state.visibilityFilter = action.payload;
    },
    deleteAll: (state) => {
      state.todos = [];
    },
  },
});

export const {
  addTodo,
  toggleTodo,
  removeTodo,
  setVisibilityFilter,
  deleteAll,
} = todosSlice.actions;
export default todosSlice.reducer;
