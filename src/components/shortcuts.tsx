import "./shortcuts.css";

function Shortcuts({
  name,
  url,
  editMode,
  deleteFunc,
}: {
  name: string;
  url: string;
  editMode: boolean;
  deleteFunc: (url: string) => void;
}) {
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
}

export default Shortcuts;
