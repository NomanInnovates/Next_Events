import { useEffect, useState, useContext } from "react";
import NewComment from "./NewComment";
import CommentList from "./CommentList";
import classes from "./Comments.module.css";
import NotificationContext from "../../store/NotificationContext";

function Comments({ eventId }) {
  const notificationCtx = useContext(NotificationContext);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  console.log("commt state", comments);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        if (showComments) {
          notificationCtx.showNotification({
            title: "Loading comments...",
            message: "Loading comments for this event..",
            status: "pending",
          });
          let res = await fetch("/api/comments/" + eventId);
          // res.json();
          let comments = await res.json();
          setComments(comments?.comments);
          if (comments.ok) {
            return notificationCtx.showNotification({
              title: "Loaded comments...",
              message: "Successfully Loaded comments for this event..",
              status: "success",
            });
          }
          return notificationCtx.showNotification({
            title: "Error!",
            message: "Something went wrong.",
            status: "error",
          });
        }
      } catch (err) {
        notificationCtx.showNotification({
          title: "Error loading comments",
          message: err.message || "Error Loading comments for this event..",
          status: "error",
        });
      }
    };
    fetchComments();
  }, [showComments]);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  function addCommentHandler(commentData) {
    notificationCtx.showNotification({
      title: "Sending comments...",
      message: "Your comment is currently being stored in database..",
      status: "pending",
    });
    // send data to API
    fetch(`/api/comments/${eventId}`, {
      method: "POST",
      body: JSON.stringify(commentData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return res.json().then((data) => {
          throw new Error(data.message || "Something went wrong");
        });
      })
      .then((data) => {
        notificationCtx.showNotification({
          title: "Success!",
          message: "Your comment is saved.",
          status: "success",
        });
      })
      .catch((err) => {
        notificationCtx.showNotification({
          title: "Error!",
          message: err.message || "Something went wrong.",
          status: "error",
        });
      });
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? "Hide" : "Show"} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && <CommentList items={comments} />}
    </section>
  );
}

export default Comments;
