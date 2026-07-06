import { useState, useEffect } from "react";
import "./App.css";

const SearchBar = () => {
  return (
    <div className="searchbar">
      <form action="https://www.google.com/search" method="get">
        <input
          type="text"
          name="q"
          id="searchbarInput"
          placeholder="Start typing and press Enter!"
        />
      </form>
    </div>
  );
};

// const Weather = () => {
//   return;
// };

const Clock = () => {
  // states for the live clock
  const [time, setTime] = useState(
    new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
  );

  // intervals for the live clock
  useEffect(() => {
    const timerId = setInterval(() => {
      setTime(
        new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      );
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  return (
    <span className="top" id="clock">
      • &nbsp;{time}
    </span>
  );
};

const Calendar = () => {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const date = new Intl.DateTimeFormat("en-US", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date());

  return (
    <div className="timeCard">
      <h3 id="timezoneText">
        Showing time for&nbsp;<span id="timezone">{timezone}</span>
      </h3>
      <h4 id="date">{date}</h4>
    </div>
  );
};

const App = () => {
  return (
    <div>
      <h1 className="top">
        <span id="greeting">Hello&nbsp;</span>
        <Clock />
      </h1>
      <Calendar />
      <SearchBar />
    </div>
  );
};

export default App;
