import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import '../../css/Post/notification.css';

function NotificationPage() {
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const userEmail = localStorage.getItem("userEmail");

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/notifications?userEmail=${userEmail}`);
        setNotifications(response.data);
        setIsLoading(false);
      } catch (error) {
        toast.error("Failed to load notifications");
        setIsLoading(false);
      }
    };

    fetchNotifications();
  }, [userEmail]);


  const deleteAllNotifications = async () => {
  try {
    await axios.delete(`http://localhost:8080/notifications/all?userEmail=${userEmail}`);
    setNotifications([]); // Clear notifications from the UI
    toast.success("All notifications deleted");
  } catch (error) {
    toast.error("Failed to delete all notifications");
  }
};


  return (
    <div className="notification-page">
      <h1>Notifications</h1>
      <div className="notifications-container">
        {isLoading ? (
          <p>Loading notifications...</p>
        ) : notifications.length > 0 ? (
          <div className="notifications-list">
            {notifications.map((notification, index) => (
              <div
                key={index}
                className={`notification-item ${notification.read ? 'read' : 'unread'}`}
              >
                
                <div className="notification-text">
                  <p className="notification-message">
                    <strong>{notification.userName}</strong> {notification.message}
                  </p>
                  <p className="notification-time">{notification.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No notifications available.</p>
        )}
      </div>
      <button className="mark-all-read-btn" onClick={deleteAllNotifications}>
        Mark All as Read
      </button>
      <ToastContainer />
    </div>
  );
}

export default NotificationPage;
