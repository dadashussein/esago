export const saveTextSizeToLocalStorage = (textSize) => {
  localStorage.setItem("text_size", textSize);
};

export const getTextSizeFromLocalStorage = () => {
  const textSize = localStorage.getItem("text_size");
  return textSize ? parseInt(textSize, 10) : 16;
};
