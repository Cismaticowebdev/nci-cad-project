function Article({ id, title, body, published, onDelete }) {
  const publishedText = published ? "Yes" : "No";

  return (
    <div>
      <h3>{title}</h3>
      <p>Article ID: {id}</p>
      <p>{body}</p>
      <p>Published: {publishedText}</p>
      <button onClick={onDelete}>Delete</button>
    </div>
  );
}

export default Article;
