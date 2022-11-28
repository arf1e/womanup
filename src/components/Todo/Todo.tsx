import { useCallback, useState } from 'react';
import { TodoType } from '../../types/todo';
import { toggleTodo, updateTodo } from '../../utils/api';
import Attachments from '../Attachments';
import Button from '../Button/Button';
import EditTodo from '../EditTodo';
import './Todo.css';
import TodoStatus from './TodoStatus';
import 'dayjs/locale/ru';
import getTodoStatus, { TODO_COMPLETED, TODO_OK, TODO_OUTDATED } from '../../utils/getTodoStatus';
import dayjs from 'dayjs';

type Props = {
  todo: TodoType;
};

const VIEWING = 'VIEWING';
const EDITING = 'EDITING';

type STATES = typeof VIEWING | typeof EDITING;

const todoContainerStatusMapper = {
  [TODO_COMPLETED]: 'todo--completed',
  [TODO_OUTDATED]: 'todo--outdated',
  [TODO_OK]: 'todo--ok',
};

/**
 * React Component rendering a todo.
 * @component
 */
const Todo = ({ todo }: Props) => {
  const [state, setState] = useState<STATES>(VIEWING);

  const handleUpdateTodo = useCallback(async (data: TodoType) => {
    await updateTodo(data);
    setState(VIEWING);
  }, []);

  const handleToggleTodo = useCallback(async () => {
    await toggleTodo(todo.id, !todo.checked);
  }, [todo.checked, todo.id]);

  if (state === EDITING) {
    return <EditTodo todo={todo} onClose={() => setState(VIEWING)} onSubmit={handleUpdateTodo} />;
  }

  const { title, description, deadline, attachments, checked = false } = todo;
  const containerClassNames = `todo ${todoContainerStatusMapper[getTodoStatus(checked, deadline)]}`;

  return (
    <div className={containerClassNames}>
      <div className="todo__info">
        <b className="todo__title">{title}</b>
        <span className="todo__deadline">{dayjs(deadline).format('LL')}</span>
      </div>
      <TodoStatus deadline={deadline} checked={todo.checked} />
      {description && <p className="todo__description">{description}</p>}
      {attachments && <Attachments attachments={attachments} />}
      <div className="todo__controls">
        <label className="todo__toggler">
          <input type="checkbox" checked={todo.checked} onChange={handleToggleTodo} />
          <span className="todo__toggle">Задача завершена</span>
        </label>
        <Button onClick={() => setState(EDITING)} className="todo__edit-btn">
          Редактировать задачу
        </Button>
      </div>
    </div>
  );
};

export default Todo;
