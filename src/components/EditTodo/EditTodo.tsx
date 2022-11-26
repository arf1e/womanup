import dayjs from 'dayjs';
import { FormEvent, SyntheticEvent, useCallback, useRef, useState } from 'react';
import { AttachmentType } from '../../types/attachment';
import { TodoType } from '../../types/todo';
import { deleteTodo, uploadAttachments } from '../../utils/api';
import Attachments from '../Attachments';
import Button from '../Button/Button';
import './EditTodo.css';

type Props = {
  todo?: TodoType;
  onClose: () => void;
  onSubmit: (todo: TodoType) => Promise<void>;
};

const initialValues = {
  id: '',
  title: '',
  description: '',
  deadline: '',
  attachments: [],
};

const EditTodo = ({ onClose, onSubmit, todo = initialValues }: Props) => {
  /*
    Normally i'd use here formik/yup instead of a bunch of useStates
  */
  const { title, description, deadline, attachments } = todo;
  const [titleValue, setTitleValue] = useState(title);
  const [descriptionValue, setDescriptionValue] = useState(description);
  const [deadlineValue, setDeadlineValue] = useState(deadline);
  const [attachmentsValue, setAttachmentsValue] = useState(attachments);
  const [attachmentsLoading, setAttachmentsLoading] = useState(false);
  const attachmentsRef = useRef<HTMLInputElement>(null);

  const TODO_EXISTS = Boolean(todo.id);

  const clearForm = useCallback(() => {
    setTitleValue(initialValues.title);
    setDescriptionValue(initialValues.description);
    setDeadlineValue(initialValues.deadline);
    setAttachmentsValue(initialValues.attachments);
  }, []);

  const handleClose = useCallback(
    (e: SyntheticEvent) => {
      e.preventDefault();
      onClose();
    },
    [onClose],
  );

  const handleDeleteAttachment = useCallback(
    (attachment: AttachmentType) => {
      const filteredAttachments = attachmentsValue?.filter((el) => el.url !== attachment.url);
      setAttachmentsValue(filteredAttachments);
    },
    [attachmentsValue],
  );

  /**
   * Uploads files to storage every time the FileInput element gets new files.
   */
  const handleFileUploads = useCallback(
    async (e: { target: EventTarget & HTMLInputElement }) => {
      const { files } = e.target;
      if (!files) return;
      setAttachmentsLoading(true);
      const attachmentsReferences = await uploadAttachments(files);
      setAttachmentsLoading(false);
      setAttachmentsValue([...(attachmentsValue as AttachmentType[]), ...attachmentsReferences]);
      // Reset UI FileInput Element
      e.target.value = '';
    },
    [attachmentsValue],
  );

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const data = {
        title: titleValue,
        description: descriptionValue,
        deadline: deadlineValue,
        attachments: attachmentsValue,
        ...(todo.id && { id: todo.id }),
      } as TodoType;
      await onSubmit(data);
      clearForm();
    },
    [attachmentsValue, clearForm, deadlineValue, descriptionValue, onSubmit, titleValue, todo.id],
  );

  const handleDelete = useCallback(async () => {
    await deleteTodo(todo.id);
  }, [todo.id]);

  const FORM_LOADING = attachmentsLoading;

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <div className="todo-form__header">
        <h3>{todo.id ? 'Редактировать задачу' : 'Добавить новую задачу'}</h3>
        <Button onClick={handleClose} className="todo-form__button todo-form__button--cancel">
          Закрыть
        </Button>
      </div>
      <div className="todo-form__primary">
        <label className="todo-form__field todo-form__field--title">
          <span className="todo-form__field-label">Название задачи</span>
          <input
            type="text"
            name="title"
            className="todo-form__input"
            required
            value={titleValue}
            onChange={(e) => setTitleValue(e.target.value)}
          />
        </label>
        <label className="todo-form__field todo-form__field--deadline">
          <span className="todo-form__field-label">Срок выполнения</span>
          <input
            type="date"
            name="deadline"
            className="todo-form__input"
            min={dayjs(Date.now()).format('YYYY-MM-DD')}
            required
            value={deadlineValue}
            onChange={(e) => setDeadlineValue(e.target.value)}
          />
        </label>
      </div>
      <label className="todo-form__field todo-form__field--description">
        <span className="todo-form__field-label">Описание</span>
        <textarea
          name="description"
          value={descriptionValue}
          placeholder="Краткость - сестра таланта"
          onChange={(e) => setDescriptionValue(e.target.value)}
          className="todo-form__input todo-form__input--textarea"
        />
      </label>
      <Attachments
        edit={true}
        loading={attachmentsLoading}
        attachments={attachmentsValue}
        onDelete={handleDeleteAttachment}
      />
      <label className="todo-form__field todo-form__field--files">
        <span className="todo-form__field-label">Добавить файлы</span>
        <input
          type="file"
          className="todo-form__input"
          ref={attachmentsRef}
          name="attachments"
          multiple={true}
          disabled={attachmentsLoading}
          onChange={handleFileUploads}
        />
      </label>
      <div className="todo-form__controls">
        <Button type="submit" className="todo-form__submit-btn" disabled={FORM_LOADING}>
          Подтвердить
        </Button>
        {TODO_EXISTS && (
          <Button
            type="button"
            onClick={handleDelete}
            className="todo--form__button todo-form__button--delete"
            disabled={FORM_LOADING}
          >
            Удалить задачу
          </Button>
        )}
      </div>
    </form>
  );
};

export default EditTodo;
