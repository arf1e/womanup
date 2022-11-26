import { db, storage } from '../config/firebase';
import { query, collection, updateDoc, doc, onSnapshot, addDoc, deleteDoc } from 'firebase/firestore';
import { TodoType } from '../types/todo';
import { getDownloadURL, ref, StorageReference, uploadBytes } from 'firebase/storage';
import { generateKindaUniqueFilename } from './files';
import { AttachmentType } from '../types/attachment';
import { Unsubscribe } from '@firebase/util';

const STORAGE_DIRECTORY = 'attachments';
const TODOS_TABLE = 'todos';
const TODOS_COLLECTION = collection(db, TODOS_TABLE);

/**
 * Gets a reference to the provided file on Firebase Storage
 *
 * @function getFileUploadStorageRef
 * @param {string} filename - Name of the file on Firebase Storage
 * @returns StorageReference
 */
const getFileUploadStorageRef = (filename: string): StorageReference =>
  ref(storage, `${STORAGE_DIRECTORY}/${filename}`);

/**
 * Allows to subscribe to todos updates on Firestore
 *
 * @function getAllTodos
 * @param update - Function handling updated todos
 * @returns unsubscribe - Function to unsubscribe from todos updates
 */
export const getAllTodos = (update: (todos: TodoType[]) => void): (() => Unsubscribe) => {
  const q = query(TODOS_COLLECTION);
  const unsubscribe = () =>
    onSnapshot(q, (querySnapshot) => {
      const todos: TodoType[] = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as TodoType));
      update(todos);
    });
  return unsubscribe;
};

/**
 * Uploads provided files to Firebase storage
 *
 * @async
 * @function uploadAttachments
 * @param attachments {FileList} - FileList provided by input[type="file"], a list of files to upload.
 * @returns Promise<{string}> - Promise resolving to a list of attachments
 */
export const uploadAttachments = async (attachments: FileList): Promise<AttachmentType[]> => {
  const promises = [];
  for (const attachment of attachments) {
    const originalFilename = attachment.name;
    const hash = generateKindaUniqueFilename(originalFilename);
    const storageRef = getFileUploadStorageRef(hash);
    promises.push(
      uploadBytes(storageRef, attachment)
        .then((uploadedFile) => getDownloadURL(uploadedFile.ref))
        .then((url) => ({ url, originalFilename } as AttachmentType))
        .catch(console.error),
    );
  }
  const uploadedFiles = await Promise.all(promises).catch(console.error);
  return uploadedFiles as AttachmentType[];
};

/**
 * Adds given todo to Firestore.
 *
 * @async
 * @function addNewTodo
 * @param todo - Todo data
 */
export const addNewTodo = async (todo: TodoType) => {
  await addDoc(TODOS_COLLECTION, { ...todo, checked: false }).catch(console.error);
};

/**
 * Updates given todo with given data.
 *
 * @async
 * @function updateTodo
 * @param todo {TodoType} - A todo to update
 */
export const updateTodo = async (todo: TodoType) => {
  const todoRef = doc(db, TODOS_TABLE, todo.id);
  await updateDoc(todoRef, todo);
};

/**
 * Deletes given todo
 *
 * @async
 * @function deleteTodo
 * @param id - Id of a todo to delete
 */
export const deleteTodo = async (id: string) => {
  const todoRef = doc(db, TODOS_TABLE, id);
  await deleteDoc(todoRef);
};

/**
 * Checks or unchecks a todo
 *
 * @async
 * @function toggleTodo
 * @param id - identifier of a todo to update
 * @param value - value of "checked" property {boolean}
 */
export const toggleTodo = async (id: string, value: boolean) => {
  const todoRef = doc(db, TODOS_TABLE, id);
  await updateDoc(todoRef, { checked: value });
};
