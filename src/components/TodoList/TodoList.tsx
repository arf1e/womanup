import { useEffect, useState } from 'react';
import { TodoType } from '../../types/todo';
import { getAllTodos } from '../../utils/api';
import AddNewTodo from '../AddNewTodo';
import Container from '../Container';
import Todo from '../Todo/Todo';

const TodoList = () => {
  const [todos, setTodos] = useState<TodoType[]>([]);
  useEffect(() => {
    const subscribeToTodos = getAllTodos(setTodos);
    const unsubscribe = subscribeToTodos();
    return unsubscribe;
  }, []);
  return (
    <Container>
      <h1>Womanup TodoList</h1>
      <AddNewTodo />
      {todos && todos.map((todo) => <Todo key={todo.id} todo={todo} />)}
    </Container>
  );
};

export default TodoList;
