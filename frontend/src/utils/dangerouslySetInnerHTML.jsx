export const formatDescriptionAsList = (description) => {
  return description
    .split("\n")
    .map((item, index) => <li key={index}>{item}</li>);
};
