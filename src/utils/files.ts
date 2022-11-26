/**
 * Makeshift uuidv4 replacement, creates a somewhat unique filename for further saving on Storage
 *
 * @function generateKindaUniqueFilename
 * @param filename Actual name of a file
 * @returns Hopefully unique string
 */
export const generateKindaUniqueFilename = (filename: string): string => {
  const extension = filename.split('.').pop();
  const fakeId = Date.now() * Math.ceil(Math.random() * 1000);
  return `${fakeId}.${extension}`;
};
