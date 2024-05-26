const ActivationPage = () => {
  const data = localStorage.getItem("nonActivate");
  console.log(data);
  return (
    <div>
      Hello {data.username}, please activate your email.
      <p>Activation message sent {data.email}</p>
    </div>
  );
};

export default ActivationPage;
