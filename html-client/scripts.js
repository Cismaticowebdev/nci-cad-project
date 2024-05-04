const articlesDiv = document.getElementById("articles");
const getBtn = document.getElementById("get-btn");
getBtn.addEventListener("click", getArticles);
const postBtn = document.getElementById("post-btn");
postBtn.addEventListener("click", postArticle);
const updateBtn = document.getElementById("update-btn");
updateBtn.addEventListener("click", updateArticle);

async function getArticles() {
  articlesDiv.textContent = "";
  let url = "http://localhost:3000/articles";
  let response = await fetch(url, {
    method: "GET",
    headers: { Accept: "application/json" },
  });
  let data = await response.json();
  printArticles(data);
}

async function postArticle(event) {
  event.preventDefault();

  let titleInput = document.getElementById("post-title-input");
  let bodyInput = document.getElementById("post-body-input");

  let title = titleInput.value;
  let body = bodyInput.value;

  let url = "http://localhost:3000/articles";
  let response = await fetch(url, {
    method: "POST",
    body: JSON.stringify({
      title: title,
      body: body,
    }),
    headers: { "Content-Type": "application/json" },
  });
  if (response.ok) {
    let data = await response.json();
    printArticles(data);
    console.log("Article posted successfully");
    titleInput.value = "";
    bodyInput.value = "";
    return data;
  } else {
    console.error("Failed to post article");
    return null;
  }
}

async function deleteArticle(event) {
  const articleDiv = event.target.closest(".article");
  const articleId = articleDiv.querySelector("p").textContent;

  console.log(articleDiv);

  const url = `http://localhost:3000/articles/${articleId}`;
  const response = await fetch(url, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    articleDiv.remove();
    console.log("Article deleted successfully");
  } else {
    console.error("Failed to delete article");
  }
}

async function updateArticle(event) {
  event.preventDefault();

  let articleIdInput = document.getElementById("article-id");
  let titleInput = document.getElementById("update-title-input");
  let bodyInput = document.getElementById("update-body-input");

  let articleId = articleIdInput.value;
  let title = titleInput.value;
  let body = bodyInput.value;

  let url = `http://localhost:3000/articles/${articleId}`;
  let response = await fetch(url, {
    method: "PUT",
    body: JSON.stringify({
      title: title,
      body: body,
    }),
    headers: { "Content-Type": "application/json" },
  });
  if (response.ok) {
    let data = await response.json();
    printUpdatedArticle(data);
    console.log("Article updated successfully");
    console.log(data);
    articleIdInput.value = "";
    titleInput.value = "";
    bodyInput.value = "";
    return data;
  } else {
    console.error("Failed to update article");
    return null;
  }
}

function printArticles(data) {
  if (Array.isArray(data)) {
    data.forEach((article) => printArticle(article));
  } else {
    printArticle(data);
  }
}

function printArticle(article) {
  let div = document.createElement("div");
  div.classList.add("article");
  div.classList.add(`article-${article.id}`);
  let title = document.createElement("h3");
  title.classList.add("article-title");
  let articleId = document.createElement("p");
  let body = document.createElement("p");
  body.classList.add("article-body");
  let deleteBtn = document.createElement("button");
  deleteBtn.addEventListener("click", deleteArticle);
  title.textContent = article.title;
  articleId.textContent = article.id;
  body.textContent = article.body;
  deleteBtn.textContent = "Delete";
  div.appendChild(title);
  div.appendChild(articleId);
  div.appendChild(body);
  div.appendChild(deleteBtn);
  articlesDiv.appendChild(div);
}

function printUpdatedArticle(data) {
  let articleDiv = document.querySelector(`.article-${data.id}`);
  console.log(articleDiv);
  if (articleDiv) {
    let title = articleDiv.querySelector(".article-title");
    console.log(title);
    let body = articleDiv.querySelector(".article-body");
    console.log(body);
    title.textContent = data.title;
    body.textContent = data.body;
  }
}
