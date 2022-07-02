import classes from "./CommentList.module.css";

function CommentList({ items }) {
  return (
    <ul className={classes.comments}>
      {/* Render list of comments - fetched from API */}
      {items?.map((comment) => (
        <li key={comment._id}>
          <p>{comment.text}</p>
          <div>
            By <address>{comment.name}</address>
          </div>
        </li>
      ))}
      <li>
        <p>My comment is amazing!</p>
        <div>
          By <address>Maximilian</address>
        </div>
      </li>
    </ul>
  );
}

export default CommentList;
