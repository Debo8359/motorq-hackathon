const Home = () => {
  return (
    <div>
      <center>
        <h1>WELCOME TO RIVERA</h1>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <button onClick={() => (window.location = "/login")} className="btn">
          Click Here for participants
        </button>
        <br />
        <button
          onClick={() => (window.location = "/adminlogin")}
          className="btn"
        >
          Click here for admins
        </button>
        <br />
      </center>
    </div>
  );
};

export default Home;
