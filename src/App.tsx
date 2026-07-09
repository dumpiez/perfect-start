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

const Shortcuts = ({
  name,
  url,
  editMode,
  deleteFunc,
}: {
  name: string;
  url: string;
  editMode: boolean;
  deleteFunc: (url: string) => void;
}) => {
  const domain = url.replace("https://", "").split("/")[0];

  return (
    <div className="shortcut-card">
      <a href={url}>
        <button type="button">
          <img
            src={`https://favicon.im/${domain}?theme=dark&larger=true`}
            alt={`${name} Icon`}
          />
          <span>{name}</span>
        </button>
      </a>

      {editMode && (
        <button className="deleteBtn" onClick={() => deleteFunc(url)}>
          Delete
        </button>
      )}
    </div>
  );
};

type ModalProps = {
  passedFunction: (name: string, url: string) => void;
  close: () => void;
};

const Modal = ({ passedFunction, close }: ModalProps) => {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");

  const submit = () => {
    let tempUrl = url;

    if (!tempUrl.startsWith("https://") && !tempUrl.startsWith("http://")) {
      tempUrl = `https://${url}`;
    }
    passedFunction(name, tempUrl);
    close();
  };
  return (
    <div className="modal">
      <div>
        <span
          className="closeBtn"
          role="button"
          onClick={() => {
            close();
          }}
        >
          &times;
        </span>
        <div className="modalContent">
          <form onSubmit={() => submit()}>
            <p>Shortcut Name</p>
            <input
              type="text"
              onChange={(event) => setName(event.target.value)}
            />
            <p>Shortcut URL</p>
            <input
              type="text"
              onChange={(event) => setUrl(event.target.value)}
            />
            <button onClick={() => submit()}>Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const [editMode, setEditMode] = useState(false);
  const [modalVisibility, setModalVisibility] = useState(false);
  const [shortcuts, setShortcuts] = useState([
    {
      name: "HackClub",
      url: "https://hackclub.com",
    },
    {
      name: "Slack",
      url: "https://slack.com",
    },
    {
      name: "Stardance",
      url: "https://stardance.hackclub.com",
    },
    {
      name: "YouTube",
      url: "https://youtube.com",
    },
    {
      name: "Hackatime",
      url: "https://hackatime.hackclub.com",
    },
  ]);

  function deleteShortcut(url: string) {
    // filter shortcuts, if result is false then remove, if result is true then don't remove
    setShortcuts(shortcuts.filter((shortcut) => shortcut.url !== url));
  }

  function addShortcut(name: string, url: string) {
    setShortcuts([...shortcuts, { name, url }]);
  }

  function closeModal() {
    setModalVisibility(!modalVisibility);
  }

  return (
    <div>
      <h1 className="top">
        <span id="greeting">Hello&nbsp;</span>
        <Clock />
      </h1>

      <DateTime />
      <SearchBar />

      <div className="shortcuts">
        {shortcuts.map((shortcut) => {
          return (
            <Shortcuts
              name={shortcut.name}
              url={shortcut.url}
              editMode={editMode}
              deleteFunc={deleteShortcut}
            />
          );
        })}
      </div>

      <div className="editBtn">
        <button
          onClick={() => {
            setEditMode(!editMode);
          }}
        >
          {editMode ? "Exit Edit Mode" : "Edit Shortcuts"}
        </button>

        {editMode ? (
          <button
            onClick={() => {
              setModalVisibility(!modalVisibility);
            }}
          >
            {editMode && "Add Shortcuts"}
          </button>
        ) : (
          ""
        )}
      </div>

      {modalVisibility && (
        <Modal passedFunction={addShortcut} close={closeModal} />
      )}
    </div>
  );
};

export default App;
