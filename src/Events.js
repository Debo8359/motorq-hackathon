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
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";

const Events = () => {
  const [search, setSearch] = useState("");
  const [regev, setRegev] = useState([]);
  const [events, setEvents] = useState([]);
  const [activeEvent, setActiveEvent] = useState(null);

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
      const result = await axios.get("http://localhost:4000/app/regevents");

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
            <form className="add-form">
              <div className="form-control">
                <input
                  type="text"
                  placeholder="Search any Event..."
                  onChange={(e) => setSearch(e.target.value)}
                ></input>
              </div>
            </form>
            <div className="grid">
              {events.map((event) =>
                event.name.includes(search) ? (
                  <>
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
                            <Typography
                              gutterBottom
                              variant="h5"
                              component="div"
                            >
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
                            onClick={() => {
                              events.forEach(async (event1) => {
                                if (event1.name === event.name) {
                                  if (event1.vacancy > 0) {
                                    let flag = false,
                                      flag1 = false;
                                    regev.forEach((regev1) => {
                                      if (regev1.name === event1.name) {
                                        flag1 = true;
                                      }
                                    });
                                    if (!flag1) {
                                      regev.forEach((regev1) => {
                                        let sdate1 = new Date(
                                          regev1.sdate.split("-")[0],
                                          regev1.sdate.split("-")[1] - 1,
                                          regev1.sdate.split("-")[2]
                                        );
                                        let edate1 = new Date(
                                          regev1.edate.split("-")[0],
                                          regev1.edate.split("-")[1] - 1,
                                          regev1.edate.split("-")[2]
                                        );
                                        let sdate = new Date(
                                          event1.sdate.split("-")[0],
                                          event1.sdate.split("-")[1] - 1,
                                          event1.sdate.split("-")[2]
                                        );
                                        let edate = new Date(
                                          event1.edate.split("-")[0],
                                          event1.edate.split("-")[1] - 1,
                                          event1.edate.split("-")[2]
                                        );
                                        let stime1 = regev1.stime.split(":");
                                        let etime1 = regev1.etime.split(":");
                                        let stime = event1.stime.split(":");
                                        let etime = event1.etime.split(":");
                                        if (
                                          (sdate >= sdate1 &&
                                            sdate <= edate1 &&
                                            stime >= stime1 &&
                                            stime <= etime1) ||
                                          (edate >= sdate1 &&
                                            edate <= edate1 &&
                                            etime >= stime1 &&
                                            etime <= etime1)
                                        ) {
                                          flag = true;
                                        }
                                      });
                                      if (!flag) {
                                        console.log(event1);
                                        await axios.post(
                                          "http://localhost:4000/app/postevent",
                                          event1
                                        );
                                        alert("Successfully Registered!");

                                        window.location = window.location;
                                      } else {
                                        alert(
                                          "Cannot register since there is a clash with another event in the same time slot"
                                        );
                                      }
                                    } else {
                                      alert(
                                        "Cannot register for an already registered event"
                                      );
                                    }
                                  } else {
                                    alert(
                                      "Cannot register for this event as there is no vacancy"
                                    );
                                  }
                                }
                              });
                            }}
                          >
                            Register
                          </Button>
                        </CardActions>
                      </Card>
                    </div>
                  </>
                ) : (
                  <></>
                )
              )}
            </div>
            <center>
              <br />
              <br />
              <h3>Registered Events</h3>
              <br />
            </center>
            <div className="grid">
              {regev.map((event) => (
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
                              <td>ID:</td>
                              <td> {event.id}</td>
                            </tr>
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
                              <td>Status:</td>
                              <td> {event.status}</td>
                            </tr>
                          </table>
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                    <CardActions>
                      <Button
                        size="small"
                        color="primary"
                        onClick={() => {
                          regev.forEach(async (event1) => {
                            if (event1.name === event.name) {
                              console.log(event1);
                              await axios
                                .post(
                                  "http://localhost:4000/app/removeevent",
                                  event1
                                )
                                .then(() => {
                                  alert("Succesfully de-registered");
                                  window.location = window.location;
                                });
                            }
                          });
                        }}
                      >
                        De-register
                      </Button>
                    </CardActions>
                  </Card>
                </div>
              ))}
            </div>
            <br /> <br />
            <h3>Interactive Map</h3>
            <br />
            <MapContainer
              center={[20.593683, 48.962883]}
              zoom={5}
              scrollWheelZoom={true}
            >
              {events.map((eachData) => (
                <Marker
                  key={eachData.name}
                  position={[eachData.location.Lat, eachData.location.Long]}
                  eventHandlers={{
                    click: () => {
                      setActiveEvent(eachData);
                    },
                  }}
                />
              ))}

              {activeEvent && (
                <Popup
                  position={[
                    activeEvent.location.Lat,
                    activeEvent.location.Long,
                  ]}
                  onClose={() => {
                    setActiveEvent(null);
                  }}
                >
                  <div>
                    <h1>{activeEvent.name}</h1>
                    <p>Start date: {activeEvent.sdate}</p>
                    <p>End date: {activeEvent.edate}</p>

                    <p>Start time: {activeEvent.stime}</p>

                    <p>End time: {activeEvent.etime}</p>
                    <p>Vacancy: {activeEvent.vacancy}</p>
                  </div>
                </Popup>
              )}

              <TileLayer
                attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
                url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
              />
            </MapContainer>
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

export default Events;
