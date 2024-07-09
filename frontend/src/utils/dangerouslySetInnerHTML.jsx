export const formatDescriptionAsList = (description) => {
  return description
    .split("\n")
    .map((item, index) => <li key={index}>{item}</li>);
};

export const formatBioWithNewLines = (bio) => {
  return bio.split("\n").map((line, index) => (
    <span key={index}>
      {line}
      <br />
    </span>
  ));
};
