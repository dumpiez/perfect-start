import { useEffect, useState } from "react";
import "./clock.css";

function Clock() {
  // states for the live clock
  const [time, setTime] = useState(
    new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
  );

  // intervals for the live clock
  useEffect(() => {
    const timerId = setInterval(() => {
      setTime(
        new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      );
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  return (
    <span className="top" id="clock">
      • &nbsp;{time}
    </span>
  );
}

export default Clock;
