import axios from "axios";
import { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { Menu } from "./menu.tsx";
import { ReactDimmer } from "react-dimmer";
import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import image from "./placeholder.png";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";

const Event = () => {
  const [regev, setRegev] = useState([]);
  const [events, setEvents] = useState([]);

  const [validate, setValidate] = useState(false);
  const Return = async () => {
    await axios.get("http://localhost:4000/app/resetdata");
    window.location = "/";
  };

  const ListEvents = async () => {
    try {
      const result = await axios.get("http://localhost:4000/app/events");

      console.log(result.data);
      let data1 = result.data;
      return data1;
    } catch (err) {
      alert(err);
    }
  };
  const ListRegEvents = async () => {
    try {
      const result = await axios.get("http://localhost:4000/app/allregevents");

      console.log(result.data);
      let data1 = result.data;
      return data1;
    } catch (err) {
      alert(err);
    }
  };
  const [isMenuOpen, setMenu] = useState(false);

  const handleMenu = () => {
    setMenu((prevState) => !prevState);
  };
  useEffect(() => {
    const getEvents = async () => {
      const data = await ListEvents();
      setEvents(data);
    };
    getEvents();

    const getRegEvents = async () => {
      const data = await ListRegEvents();
      setRegev(data);
    };
    getRegEvents();

    const getValidate = async () => {
      const val = await axios.get("http://localhost:4000/app/validateUser");
      if (val.data === true) {
        setValidate(true);
      }
    };
    getValidate();
  }, []);
  return (
    <>
      {validate ? (
        <>
          <div className="app">
            <div className="header">
              <GiHamburgerMenu className="menu-btn" onClick={handleMenu} />
              <h1>Upcoming Events</h1>
              <div className="nav"></div>
            </div>
            <center>
              <h3>List of Events</h3>
              <br />
            </center>
            <div className="right-align">
              <button
                className="btn"
                onClick={() => {
                  window.location = "/newevent";
                }}
              >
                + New
              </button>
            </div>
            <div className="grid">
              {events.map((event) => (
                <div className="grid-item">
                  <Card sx={{ maxWidth: 345 }}>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        height="140"
                        image={image}
                        alt="green iguana"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {event.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          <table>
                            <tr>
                              <td>Start Date:</td>
                              <td> {event.sdate}</td>
                            </tr>
                            <tr>
                              <td>End Date:</td>
                              <td> {event.edate}</td>
                            </tr>
                            <tr>
                              <td>Start Time:</td>
                              <td> {event.stime}</td>
                            </tr>
                            <tr>
                              <td>End Time:</td>
                              <td> {event.etime}</td>
                            </tr>
                            <tr>
                              <td>Vanacies:</td>
                              <td> {event.vacancy}</td>
                            </tr>
                          </table>
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                    <CardActions>
                      <Button
                        size="small"
                        color="primary"
                        onClick={async () => {
                          await axios.post(
                            "http://localhost:4000/app/whichevent",
                            event
                          );
                          window.location = "/modify";
                        }}
                      >
                        Modify
                      </Button>
                    </CardActions>
                  </Card>
                </div>
              ))}
            </div>
            <br />
            <center>
              <button className="btn" onClick={Return}>
                Log Out
              </button>
            </center>
          </div>
          <Menu isMenuOpen={isMenuOpen} />
          <ReactDimmer
            isOpen={isMenuOpen}
            exitDimmer={setMenu}
            zIndex={100}
            blur={1.5}
          />
        </>
      ) : (
        <>
          <center>
            <h2>Error: Please Log In to access this page</h2>
          </center>
        </>
      )}
    </>
  );
};

export default Event;
