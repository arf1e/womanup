import { useState } from 'react';
import { addNewTodo } from '../../utils/api';
import Button from '../Button/Button';
import EditTodo from '../EditTodo';
import './AddNewTodo.css';

const IDLE = 'IDLE';
const ACTIVE = 'ACTIVE';

type STATES = typeof IDLE | typeof ACTIVE;

/**
 * A button which activates form to create a new todo
 * @component
 */
const AddNewTodo = () => {
  const [state, setState] = useState<STATES>(IDLE);
  return (
    <>
      {state === IDLE && (
        <Button onClick={() => setState(ACTIVE)} className="add-new-todo">
          Добавить задачу
        </Button>
      )}
      {state === ACTIVE && <EditTodo onSubmit={addNewTodo} onClose={() => setState(IDLE)} />}
    </>
  );
};

export default AddNewTodo;
