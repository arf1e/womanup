import { AttachmentType } from './attachment';

/**
 * A todo
 *
 * @typedef {Object} TodoType
 * @property id {string} - Todo id
 * @property title {string} - Todo title
 * @property description {string} - Todo description
 * @property deadline {string} - Date in format DD-MM-YYYY of a todo deadline
 * @property attachment {AttachmentType[] | undefined} - Attachments of a todo
 * @property checked {boolean | undefined} - Flag describing if a todo is checked
 */
export type TodoType = {
  id: string;
  title: string;
  description: string;
  deadline: string;
  attachments?: AttachmentType[];
  checked?: boolean;
};
