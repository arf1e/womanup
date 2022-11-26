import { ReactElement } from 'react';
import { AttachmentType } from '../../types/attachment';
import './Attachment.css';

type Props = {
  attachment: AttachmentType;
  onDelete?: (attachment: AttachmentType) => void;
};

const Attachment = ({ attachment, onDelete }: Props): ReactElement => {
  const { url, originalFilename } = attachment;
  return (
    <a href={url} download="ass" className="attachment">
      <span className="attachment__filename">{originalFilename}</span>
      {onDelete && (
        <button
          className="attachment__clear"
          onClick={(e) => {
            e.preventDefault();
            onDelete(attachment);
          }}
        >
          X
        </button>
      )}
    </a>
  );
};

export default Attachment;
