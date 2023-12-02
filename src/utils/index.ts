export const getOffSetToTheEnd = (element: any) => {
  const range = window.getSelection()!.getRangeAt(0);
  const preCaretRange = range.cloneRange();
  preCaretRange.selectNodeContents(element);
  preCaretRange.setStart(range.endContainer, range.endOffset);
  return preCaretRange.toString().length;
};

export const getOffSetToTheStart = (element: any) => {
  const range = window.getSelection()!.getRangeAt(0);
  const preCaretRange = range.cloneRange();
  preCaretRange.selectNodeContents(element);
  preCaretRange.setEnd(range.endContainer, range.endOffset);
  return preCaretRange.toString().length;
};

export const getCurrentCellIndex = (htmlNode: any) => {
  const parent = htmlNode.parentElement?.children;
  return Array.prototype.indexOf.call(parent, htmlNode);
};

export const generateRandId = () => {
  return (Math.random() + 1).toString(36);
};
