import "./styles.css";
const PageLoader = ({ status, children }) => {
  return (
    <>
      <div
        className={`loader ${status === "loading" ? "loader-active" : ""}`}
      ></div>
      {children}
    </>
  );
};

export default PageLoader;
