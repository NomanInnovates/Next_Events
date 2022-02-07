import { useContext } from "react";
import MainHeader from "./mainHeader";
import Notification from "../notification/notification";
import NotificationContext from "../../store/notificationContext";

function Layout(props) {
  const notificationCtx = useContext(NotificationContext);
  const activeNotification = notificationCtx.notification;
  return (
    <>
      <MainHeader />
      <main>{props.children}</main>
      {activeNotification && (
        <Notification
          title={activeNotification.title}
          message={activeNotification.message}
          status={activeNotification.status}
        />
      )}
    </>
  );
}

export default Layout;
