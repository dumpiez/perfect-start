import { useState } from "react";
import type { Shortcut } from "../App.tsx";
import "./modal.css";

type ModalProps = {
  editFunction: (id: string, name: string, url: string) => void;
  close: () => void;
  selectedShortcut?: Shortcut;
};

const Modal = ({ editFunction, close, selectedShortcut }: ModalProps) => {
  const [name, setName] = useState(() =>
    selectedShortcut ? selectedShortcut.name : "",
  );
  const [url, setUrl] = useState(() =>
    selectedShortcut ? selectedShortcut.url : "",
  );

  const submit = () => {
    let tempUrl = url;

    if (!tempUrl.startsWith("https://") && !tempUrl.startsWith("http://")) {
      tempUrl = `https://${url}`;
    }

    editFunction(crypto.randomUUID(), name, tempUrl);
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
          <form
            onSubmit={(event) => {
              event.preventDefault();
              submit();
            }}
          >
            <p>Shortcut Name</p>
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
            <br />
            <br />
            <p>Shortcut URL</p>
            <input
              type="text"
              value={url}
              onChange={(event) => setUrl(event.target.value)}
            />
            <div>
              <button onClick={() => submit()}>Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modal;
