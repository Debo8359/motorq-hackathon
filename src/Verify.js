import axios from "axios";
import { useState } from "react";

const Verify = () => {
  const k = window.location.href.substring(
    window.location.href.length - 10,
    window.location.href.length
  );
  const [veri, setVeri] = useState([]);

  return (
    <div>
      <center>
        <button
          className="btn"
          onClick={async () => {
            setVeri({ id: k });
            const val = await axios.post("http://localhost:4000/app/verify", {
              id: k,
            });
            if (val.data === "done") {
              alert("Verified Succesfully");
            } else if (val.data === "alr") {
              alert("Already Verified!");
            } else if (val.data === "no") {
              alert("ID not found");
            }
          }}
        >
          Verify
        </button>
      </center>
    </div>
  );
};

export default Verify;
