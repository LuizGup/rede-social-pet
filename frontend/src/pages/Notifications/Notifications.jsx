import { useState, useEffect } from "react";
import "./Notifications.css";
import notificationService from "../../services/notificationService";
import { formatDateTime } from "../../utils/formatters";

const messageByType = {
  LIKE: "curtiu seu post",
  COMMENT: "comentou no seu post",
  FOLLOW: "começou a seguir você",
};

const iconByType = {
  LIKE: "♥",
  COMMENT: "💬",
  FOLLOW: "👤",
};

function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await notificationService.getNotifications();
        setNotifications(data);
        // ao abrir a página, marca tudo como lido
        await notificationService.markAllRead();
      } catch {
        // silencioso
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <main className="notifications-main">
      <div className="custom-title">
        <h1>Notificações</h1>
        <p>Atividades recentes relacionadas a você.</p>
      </div>

      <div className="notifications-container">
        {loading ? (
          <p className="notifications-status">Carregando...</p>
        ) : notifications.length === 0 ? (
          <p className="notifications-status">Você ainda não tem notificações. 🐾</p>
        ) : (
          notifications.map((n) => (
            <div
              className={`notification-item ${n.notification_read ? "" : "unread"}`}
              key={n.notification_id}
            >
              <img
                className="notification-avatar"
                src={n.actor?.user_photo || "/images/DEFAULTIMAGE.png"}
                alt={n.actor?.user_name}
              />
              <div className="notification-body">
                <p className="notification-text">
                  <span className="notification-icon">
                    {iconByType[n.notification_type]}
                  </span>{" "}
                  <strong>{n.actor?.user_name}</strong>{" "}
                  {messageByType[n.notification_type]}
                </p>
                <span className="notification-date">
                  {formatDateTime(n.created_at)}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </main>
  );
}

export default Notifications;
