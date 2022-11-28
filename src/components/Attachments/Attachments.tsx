import { ReactElement } from 'react';
import { AttachmentType } from '../../types/attachment';
import Attachment from '../Attachment';
import './Attachments.css';

type Props = {
  attachments?: AttachmentType[];
  edit?: boolean;
  loading?: boolean;
  onDelete?: (attachment: AttachmentType) => void;
};

/**
 * A list of attachments
 * @component
 */
const Attachments = ({ attachments = [], loading = false, edit = false, onDelete }: Props): ReactElement | null => {
  if (loading) {
    return <p className="attachments-title">Файлы загружаются...</p>;
  }

  if (attachments.length > 0) {
    return (
      <div className="attachments-container">
        <p className="attachments-title">Прикреплённые файлы</p>
        <div className="attachments-list">
          {attachments.map((attachment) => (
            <Attachment attachment={attachment} {...(edit && { onDelete })} key={attachment.url} />
          ))}
        </div>
      </div>
    );
  }

  return null;
};

export default Attachments;
