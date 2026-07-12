import "./shortcuts.css";
import Modal from "./modal.tsx";

type ShortcutsProp = {
  id: string;
  name: string;
  url: string;
  editMode: boolean;
  deleteShortcut: (url: string) => void;
  editShortcut: (id: string, name: string, url: string) => void;
  modalVisibility: boolean;
  setModalVisibility: (modalVisibility: boolean) => void;
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
  modalVisibility,
  setModalVisibility,
}: ShortcutsProp) {
  const domain = url.replace("https://", "").split("/")[0];

  return (
    <div className={editMode ? "shortcut-card editing" : "shortcut-card"}>
      {/* <div className="editOverlay"> */}
      <a
        href={editMode ? undefined : url}
        onClick={() => {
          if (editMode) {
            setModalVisibility(true);
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

      {modalVisibility && (
        <Modal passedFunction={editShortcut} close={closeModal} />
      )}
    </div>
  );
}

export default Shortcuts;
