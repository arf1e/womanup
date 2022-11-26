import dayjs from 'dayjs';

export const TODO_COMPLETED = 'COMPLETED';
export const TODO_OUTDATED = 'OUTDATED';
export const TODO_OK = 'OK';

type StatusOutput = typeof TODO_COMPLETED | typeof TODO_OUTDATED | typeof TODO_OK;

/**
 * Detects status of a todo
 *
 * @param checked {boolean} - Flag describing if todo is completed
 * @param deadline {string} - Date in format DD-MM-YYYY of a todo deadline
 * @returns status {string} - The status of a todo
 */
const getTodoStatus = (checked: boolean, deadline: string): StatusOutput => {
  const outdated = dayjs(deadline).isBefore(dayjs(undefined, 'day'));
  const status = checked ? TODO_COMPLETED : outdated ? TODO_OUTDATED : TODO_OK;
  return status;
};

export default getTodoStatus;
