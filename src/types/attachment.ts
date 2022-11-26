/**
 * An attachment
 * @typedef {Object} AttachmentType
 * @property {string} url - URL of a file on Storage
 * @property {string} originalFilename - Human-friendly filename
 */
export type AttachmentType = {
  url: string;
  originalFilename: string;
};
