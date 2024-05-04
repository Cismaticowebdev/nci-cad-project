function Article({ id, title, body, onDelete, onUpdate }) {
  return (
    <div>
      <h3>{title}</h3>
      <p>{id}</p>
      <p>{body}</p>
      <button onClick={onDelete}>Delete</button>
      <button onClick={onUpdate}>Update</button>
    </div>
  );
}

export default Article;
