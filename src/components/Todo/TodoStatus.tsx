import getTodoStatus, { TODO_COMPLETED, TODO_OK, TODO_OUTDATED } from '../../utils/getTodoStatus';
import './Todo.css';

type Props = {
  checked?: boolean;
  deadline: string;
};

const statusMapper = {
  [TODO_COMPLETED]: {
    class: 'todo__status--completed',
    message: 'Завершена',
  },
  [TODO_OUTDATED]: {
    class: 'todo__status--outdated',
    message: 'Просрочена',
  },
  [TODO_OK]: {
    class: 'todo__status--ok',
    message: 'Ждёт выполнения',
  },
};

const TodoStatus = ({ checked = false, deadline }: Props) => {
  const status = getTodoStatus(checked, deadline);
  return <span className={`todo__status ${statusMapper[status].class}`}>{statusMapper[status].message}</span>;
};

export default TodoStatus;
