////////////////////////////////////////
// CONSTRUCTORS: BOOK / UI
////////////////////////////////////////

// Book Constructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

// User Interface (UI) Constructor
function UI() {}

////////////////////////////////////////
// PROTOTYPES: ADD BOOK / DELETE BOOK / CLEAR TEXT FIELDS
////////////////////////////////////////

// Prototype to dynamically creates and populate the table after user inputs data into form
UI.prototype.addBookToList = function(book) {
  // Get the node where we want to insert a new book
  const list = document.getElementById("book-list");

  // Create a row to insert a new book
  const row = document.createElement("tr");

  // Insert columns
  row.innerHTML = `  <td>${book.title}</td>
  <td>${book.author}</td>
  <td>${book.isbn}</td>
  <td><a href="#" class="delete">X</a></td>`;

  // Append row to the list.
  list.appendChild(row);
};

// Prototype to show generate a div and show an alert when user submits empty text
UI.prototype.showAlert = function(message, className) {
  // Create DIV Element
  const div = document.createElement("div");
  div.className = `alert ${className}`;
  div.innerText = message;

  // Get Parent Node to Insert Alert Node
  const container = document.querySelector(".container");
  const form = document.querySelector("#book-form");
  container.insertBefore(div, form);

  // A setTimeout function to Remove Alert
  setTimeout(function() {
    document.querySelector(".alert").remove();
  }, 2000);
};

// Prototype to delete a single book
UI.prototype.deleteBook = function(target) {
  if (target.className === "delete") {
    target.parentElement.parentElement.remove();
  }
};

// Prototype to clear text fields
UI.prototype.clearFields = function() {
  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("isbn").value = "";
};

////////////////////////////////////////
// SUBMIT A BOOK
////////////////////////////////////////

// Register EventListener for Submit Button
const bookForm = document.getElementById("book-form");
bookForm.addEventListener("submit", handlerSubmit);

// Function to handle action on the submit button
function handlerSubmit(e) {
  // Get values from HTML form
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const isbn = document.getElementById("isbn").value;

  // Instaniate Object Book
  const book = new Book(title, author, isbn);

  // Instantiate UI
  const ui = new UI();

  // Validate whether user input is empty or text
  if (title === "" || author === "" || isbn === "") {
    // Run the showAlert function
    ui.showAlert(
      "Hey you Dinosaur Head! Learn how to type and put some values in all fields",
      "error"
    );
  } else {
    // Add Book to HTML Book List
    ui.addBookToList(book);

    // Clear Fields
    ui.clearFields();
  }

  e.preventDefault();
}

////////////////////////////////////////
// DELETE A BOOK
////////////////////////////////////////

// Get book-list and run delete book prototype
document.getElementById("book-list").addEventListener("click", function(e) {
  ui = new UI();
  ui.deleteBook(e.target);
  ui.showAlert("Book Removed", "success");
});
