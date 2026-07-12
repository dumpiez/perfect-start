import { useEffect, useState } from "react";
import "./App.css";
import SearchBar from "./components/searchbar.tsx";
import Clock from "./components/clock.tsx";
import DateTime from "./components/datetime.tsx";
import Shortcuts from "./components/shortcuts.tsx";
import Modal from "./components/modal.tsx";

type Shortcut = {
  name: string;
  url: string;
};

const App = () => {
  const [editMode, setEditMode] = useState(false);
  const [modalVisibility, setModalVisibility] = useState(false);
  const [shortcuts, setShortcuts] = useState<Shortcut[]>(() => {
    const saved = localStorage.getItem("shortcuts");

    if (!saved) {
      return [
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
      ];
    } else {
      return JSON.parse(saved);
    }
  });

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

  useEffect(() => {
    localStorage.setItem("shortcuts", JSON.stringify(shortcuts));
  }, [shortcuts]);

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

        {editMode && (
          <button
            onClick={() => {
              setModalVisibility(!modalVisibility);
            }}
          >
            {editMode && "Add Shortcuts"}
          </button>
        )}
      </div>

      {modalVisibility && (
        <Modal passedFunction={addShortcut} close={closeModal} />
      )}
    </div>
  );
};

export default App;
