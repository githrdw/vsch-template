import React, { useEffect, useState } from "react";

export default function Widget() {
  const [pos, setPos] = useState({});

  const css = {
    clock: {
      position: "relative",
      display: "block",
      paddingTop: "100%",
      borderRadius: "50%",
      border: "1px solid white",
    },
    hand: {
      position: "absolute",
      display: "block",
      top: "50%",
      left: "50%",
      marginLeft: "-3px",
      marginop: "-1px",
      background: "white",
      transformOrigin: "6px",
      borderRadius: "10px",
      height: "2px",
    },
  };

  const setClock = () => {
    const time = new Date();
    const minute = time.getMinutes();
    const second = time.getSeconds();
    const hour = time.getHours();
    setPos({
      minute: (360 * (minute + second / 60)) / 60 - 90,
      hour: 30 * ((hour % 12) + minute / 60) - 90,
    });
  };
  useEffect(() => {
    setClock();
    const interval = setInterval(setClock, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <span style={css.clock}>
      <span
        style={{
          transform: `rotate(${pos.hour}deg)`,
          width: "25%",
          ...css.hand,
        }}
      ></span>
      <span
        style={{
          transform: `rotate(${pos.minute}deg)`,
          width: "45%",
          ...css.hand,
        }}
      ></span>
    </span>
  );
}
