import { useState } from "react";
import "./modal.css";

type ModalProps = {
  editFunction: (id: string, name: string, url: string) => void;
  close: () => void;
};

const Modal = ({ editFunction, close }: ModalProps) => {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");

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
          <form onSubmit={() => submit()}>
            <p>Shortcut Name</p>
            <input
              type="text"
              onChange={(event) => setName(event.target.value)}
            />
            <br />
            <br />
            <p>Shortcut URL</p>
            <input
              type="text"
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
