import { useState } from "react";
import "./modal.css";

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

export default Modal;
