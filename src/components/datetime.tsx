import "./datetime.css";

function DateTime() {
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
}

export default DateTime;
