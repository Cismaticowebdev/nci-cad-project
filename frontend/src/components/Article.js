function Article({ id, title, body, onDelete }) {
  return (
    <div>
      <h3>{title}</h3>
      <p>Article ID: {id}</p>
      <p>{body}</p>
      <button onClick={onDelete}>Delete</button>
    </div>
  );
}

export default Article;
