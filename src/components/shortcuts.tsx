import "./shortcuts.css";

type ModalMode = "add" | "edit" | null;

type ShortcutsProp = {
  id: string;
  name: string;
  url: string;
  editMode: boolean;
  deleteShortcut: (url: string) => void;
  setModalMode: (modalMode: ModalMode) => void;
  setSelectedShortcut: (id: string) => void;
};

function Shortcuts({
  id,
  name,
  url,
  editMode,
  deleteShortcut,
  setModalMode,
  setSelectedShortcut,
}: ShortcutsProp) {
  const domain = url.replace("https://", "").split("/")[0];

  return (
    <div className={editMode ? "shortcut-card editing" : "shortcut-card"}>
      <a
        href={editMode ? undefined : url}
        onClick={() => {
          if (editMode) {
            setSelectedShortcut(id);
            setModalMode("edit");
          }
        }}
      >
        <img
          src={`https://favicon.im/${domain}?theme=dark&larger=true`}
          alt={`${name} Icon`}
        />
        <span>{name}</span>
      </a>

      {editMode && (
        <button className="deleteBtn" onClick={() => deleteShortcut(id)}>
          Delete
        </button>
      )}
    </div>
  );
}

export default Shortcuts;
