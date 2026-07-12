import "./shortcuts.css";
import Modal from "./modal.tsx";

type ModalMode = "add" | "edit" | null;

type ShortcutsProp = {
  id: string;
  name: string;
  url: string;
  editMode: boolean;
  deleteShortcut: (url: string) => void;
  editShortcut: (id: string, name: string, url: string) => void;
  modalMode: ModalMode;
  setModalMode: (modalMode: ModalMode) => void;
  closeModal: () => void;
};

function Shortcuts({
  id,
  name,
  url,
  editMode,
  deleteShortcut,
  editShortcut,
  closeModal,
  modalMode,
  setModalMode,
}: ShortcutsProp) {
  const domain = url.replace("https://", "").split("/")[0];

  return (
    <div className={editMode ? "shortcut-card editing" : "shortcut-card"}>
      {/* <div className="editOverlay"> */}
      <a
        href={editMode ? undefined : url}
        onClick={() => {
          if (editMode) {
            setModalMode("edit");
          }
        }}
      >
        {/* <button type="button"> */}
        <img
          src={`https://favicon.im/${domain}?theme=dark&larger=true`}
          alt={`${name} Icon`}
        />
        <span>{name}</span>
        {/* </button> */}
      </a>
      {/* </div> */}

      {editMode && (
        <button className="deleteBtn" onClick={() => deleteShortcut(id)}>
          Delete
        </button>
      )}

      {modalMode === "edit" && (
        <Modal editFunction={editShortcut} close={closeModal} />
      )}
    </div>
  );
}

export default Shortcuts;
