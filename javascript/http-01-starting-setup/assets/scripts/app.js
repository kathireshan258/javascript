const listElement = document.querySelector(".posts");
const postTemplate = document.getElementById("single-post");
const form = document.querySelector("#new-post form");
const fetchButton = document.querySelector("#available-posts button");
const postList = document.querySelector("ul");
function sendHTTPRequest(method, URL, body) {
  const promise = new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, URL);
    // xhr.responseType = 'json';
    xhr.onload = function () {
      if (xhr.status >= 200 && xhr.status < 300) {
        // console.log(xhr.response);
        resolve(JSON.parse(xhr.response));
        xhr.send(JSON.stringify(body));
      } else {
        reject(new Error("Error occured! Something went wrong."));
      }
    };

    xhr.onerror = function () {
      reject(
        new Error(
          "Error occured while sending the request! Something went Wrong."
        )
      );
    };
  });
  return promise;
}

async function fetchPosts() {
  // Using promise .then() method.

  // sendHTTPRequest('GET', 'https://jsonplaceholder.typicode.com/posts').then(responseData => {
  //     console.log(responseData);
  //     for(const post of responseData) {
  //         const postEl = document.importNode(postTemplate.content, true);
  //         postEl.querySelector('h2').textContent = post.title.toUpperCase();
  //         postEl.querySelector('p').textContent = post.body;
  //         listElement.append(postEl);
  //     }
  //   })

  // Using async await

  try {
    const responseData = await sendHTTPRequest(
      "GET",
      "https://jsonplaceholder.typicode.com/posts"
    );
    console.log(responseData);
    for (const post of responseData) {
      const postEl = document.importNode(postTemplate.content, true);
      postEl.querySelector("h2").textContent = post.title.toUpperCase();
      postEl.querySelector("p").textContent = post.body;
      postEl.querySelector("li").id = post.id;
      listElement.append(postEl);
    }
  } catch (e) {
    console.log(e);
  }
}

async function createPost(title, body) {
  const post = {
    title: title,
    body: body,
    userId: Math.round(Math.random() * 1000),
  };

  sendHTTPRequest("POST", "https://jsonplaceholder.typicode.com/posts", post);
}

function createElement(errText = "Please enter a valid input") {
  const newErrEl = document.createElement("p");
  newErrEl.style.color = "Red";
  newErrEl.textContent = errText;
  return newErrEl;
}

function validateAndSendPost(enteredTitle, enteredContent, currentTarget) {
  const titleTxtBox = currentTarget.querySelector("#title");
  const contentTxtBox = currentTarget.querySelector("#content");

  if (
    (titleTxtBox.nextElementSibling !== null &&
      titleTxtBox.nextElementSibling.tagName === "P") ||
    (contentTxtBox.nextElementSibling !== null &&
      contentTxtBox.nextElementSibling.tagName === "P")
  ) {
    return;
  }

  if (!enteredTitle) {
    titleTxtBox.insertAdjacentElement(
      "afterEnd",
      createElement("Please enter a valid title")
    );
  }

  if (!enteredContent) {
    contentTxtBox.insertAdjacentElement(
      "afterEnd",
      createElement("Please enter a valid content")
    );
  }

  if (!enteredTitle || !enteredContent) {
    return;
  }

  createPost(enteredTitle, enteredContent);
}

function validateOnKeyPress(currentTarget) {
  if (
    currentTarget.nextElementSibling !== null &&
    currentTarget.nextElementSibling.tagName === "P"
  ) {
    currentTarget.nextElementSibling.remove();
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const enteredTitle = event.currentTarget.querySelector("#title").value;
  const enteredContent = event.currentTarget.querySelector("#content").value;
  validateAndSendPost(enteredTitle, enteredContent, event.currentTarget);
});

// createPost('DUMMY', 'A dummy post!');
fetchButton.addEventListener("click", fetchPosts);

postList.addEventListener("click", (event) => {
  if (event.target.tagName === "BUTTON") {
    const postId = event.target.closest("li").id;
    console.log(`Deleted list item id: ${postId}`);
    sendHTTPRequest(
      "DELETE",
      `https://jsonplaceholder.typicode.com/posts/${postId}`
    );
    event.target.closest("li").remove();
  }
});
