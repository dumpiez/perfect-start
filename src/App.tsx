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
          autoComplete="off"
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

const DateTime = () => {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const date = new Intl.DateTimeFormat("en-US", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date());

  return (
    <div className="dateTime">
      <h3>
        Showing time for&nbsp;<span id="timezone">{timezone}</span>
      </h3>
      <h4 id="date">{date}</h4>
    </div>
  );
};

const Shortcut = ({ name, url }: { name: string; url: string }) => {
  const domain = url.replace("https://", "").split("/")[0];

  return (
    <a href={url}>
      <button>
        <img
          src={`https://favicon.im/${domain}?theme=dark&larger=true`}
          alt={`${name} Icon`}
        />
        <span>{name}</span>
      </button>
    </a>
  );
};

const App = () => {
  return (
    <div>
      <h1 className="top">
        <span id="greeting">Hello&nbsp;</span>
        <Clock />
      </h1>

      <DateTime />
      <SearchBar />

      <div className="shortcuts">
        <Shortcut name="HackClub" url="https://hackclub.com" />
        <Shortcut name="slack" url="https://slack.com" />
        <Shortcut name="Stardance" url="https://stardance.hackclub.com" />
        <Shortcut name="YouTube" url="https://youtube.com" />
        <Shortcut name="Hackatime" url="https://hackatime.hackclub.com" />
      </div>
    </div>
  );
};

export default App;
