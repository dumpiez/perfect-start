import { useEffect, useState } from "react";
import "./App.css";
import SearchBar from "./components/searchbar.tsx";
import Clock from "./components/clock.tsx";
import DateTime from "./components/datetime.tsx";
import Shortcuts from "./components/shortcuts.tsx";
import Modal from "./components/modal.tsx";

export type Shortcut = {
  id: string;
  name: string;
  url: string;
};

type ModalMode = "add" | "edit" | null;

function App() {
  const [editMode, setEditMode] = useState(false);
  const [modalMode, setModalMode] = useState<ModalMode>(null);
  const [selectedShortcutId, setSelectedShortcutId] = useState("");
  const [shortcuts, setShortcuts] = useState<Shortcut[]>(() => {
    const saved = localStorage.getItem("shortcuts");

    if (!saved) {
      return [
        {
          id: "hackclub",
          name: "HackClub",
          url: "https://hackclub.com",
        },
        {
          id: "slack",
          name: "Slack",
          url: "https://slack.com",
        },
        {
          id: "stardance",
          name: "Stardance",
          url: "https://stardance.hackclub.com",
        },
        {
          id: "youtube",
          name: "YouTube",
          url: "https://youtube.com",
        },
        {
          id: "hackatime",
          name: "Hackatime",
          url: "https://hackatime.hackclub.com",
        },
      ];
    } else {
      return JSON.parse(saved);
    }
  });

  function deleteShortcut(id: string) {
    // filter shortcuts, if result is false then remove, if result is true then don't remove
    setShortcuts(shortcuts.filter((shortcut) => shortcut.id !== id));
  }

  function addShortcut(id: string, name: string, url: string) {
    setShortcuts([...shortcuts, { id, name, url }]);
  }

  function editShortcut(id: string, name: string, url: string) {
    setShortcuts(
      shortcuts.map((shortcut) => {
        if (shortcut.id === selectedShortcutId) {
          return {
            id: id,
            name,
            url,
          };
        }

        return shortcut;
      }),
    );
  }

  const selectedShortcut = shortcuts.find(
    (shortcut) => shortcut.id === selectedShortcutId,
  );
  function closeModal() {
    setModalMode(null);
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
              // everything that has to do with shortcut list
              key={shortcut.id}
              id={shortcut.id}
              name={shortcut.name}
              url={shortcut.url}

              // states
              editMode={editMode}
              deleteShortcut={deleteShortcut}

              // set states
              setModalMode={setModalMode}
              setSelectedShortcut={setSelectedShortcutId}
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
              // setModalVisibility(!modalVisibility);
              setModalMode("add");
            }}
          >
            {editMode && "Add Shortcuts"}
          </button>
        )}
      </div>

      {modalMode === "add" && (
        <Modal editFunction={addShortcut} close={closeModal} />
      )}
      {modalMode === "edit" && selectedShortcut && (
        <Modal
          editFunction={editShortcut}
          close={closeModal}
          selectedShortcut={selectedShortcut}
        />
      )}
    </div>
  );
}

export default App;
