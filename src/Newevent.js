import { useState } from "react";
import axios from "axios";
const Newevent = () => {
  const [name, setName] = useState("");
  const [stime, setStime] = useState("");
  const [etime, setEtime] = useState("");
  const [sdate, setSdate] = useState("");
  const [edate, setEdate] = useState("");
  const [vacancy, setVacancy] = useState(0);
  const [lat, SetLat] = useState("");
  const [Long, SetLong] = useState("");
  async function onSubmit(e) {
    e.preventDefault();
    const newevent = {
      name: name,
      stime: stime,
      etime: etime,
      sdate: sdate,
      edate: edate,
      vacancy: vacancy,
      location: {
        Lat: lat,
        Long: Long,
      },
    };
    try {
      await axios
        .post("http://localhost:4000/app/newevent", newevent)
        .then((res) => console.log(res.data));

      alert("Successfully Added!");
      window.location = "/events";
    } catch (error) {
      alert(error);
    }
  }
  return (
    <div className="container">
      <form className="add-form" onSubmit={onSubmit}>
        <div className="form-control">
          <h1 align="center">ADD NEW EVENT</h1>
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></input>
          <label>Start time (24h format)</label>
          <input
            type="text"
            value={stime}
            onChange={(e) => setStime(e.target.value)}
          ></input>
          <label>End time (24h format)</label>
          <input
            type="text"
            value={etime}
            onChange={(e) => setEtime(e.target.value)}
          ></input>
          <label>Start Date (YYYY-MM-DD)</label>
          <input
            type="text"
            placeholder="YYYY-MM-DD"
            value={stime}
            onChange={(e) => setSdate(e.target.value)}
          ></input>
          <label>End Date (YYYY-MM-DD)</label>
          <input
            type="text"
            placeholder="YYYY-MM-DD"
            value={edate}
            onChange={(e) => setEdate(e.target.value)}
          ></input>

          <label>Vacancy</label>
          <input
            type="number"
            value={vacancy}
            onChange={(e) => setVacancy(e.target.value)}
          ></input>
          <label>Latitude</label>
          <input
            type="text"
            value={lat}
            onChange={(e) => SetLat(e.target.value)}
          ></input>
          <label>Latitude</label>
          <input
            type="text"
            value={Long}
            onChange={(e) => SetLong(e.target.value)}
          ></input>
          <input
            className="btn btn-block"
            type="submit"
            value="Register"
          ></input>
          <button
            className="btn"
            onClick={() => {
              window.location = "/events";
            }}
          >
            Back
          </button>
        </div>
      </form>
    </div>
  );
};

export default Newevent;
