/**
 * Encloses the given data in a CDATA section.
 */
export const cdata = (data: string): string => {
  if (data.includes("]]>")) {
    throw new Error('CDATA section contains forbidden string "]]>"');
  }
  return `<![CDATA[${data}]]>`;
};
