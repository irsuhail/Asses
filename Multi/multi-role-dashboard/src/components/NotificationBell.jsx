import React from "react";
import { useNotification } from "../context/NotificationContext";

const NotificationBell = React.memo(() => {
  const { notifications } = useNotification();
  return (
    <div style={{ position: "relative", cursor: "pointer" }}>
      🔔
      {notifications.length > 0 && (
        <span style={{
          position: "absolute",
          top: -5,
          right: -5,
          background: "red",
          color: "white",
          borderRadius: "50%",
          padding: "2px 6px",
          fontSize: "12px"
        }}>
          {notifications.length}
        </span>
      )}
    </div>
  );
});

export default NotificationBell;
