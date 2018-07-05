// ES5 Code


// Book Constructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

// UI Constructor
function UI() {}

// Add Book To List
UI.prototype.addBookToList = function(book) {
  const list = document.getElementById('book-list');
  // Create tr element
  const row = document.createElement('tr');
  // Insert cols
  row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">X<a></td>
  `;

  // Append row to list
  list.appendChild(row);
}

// Delete Book
UI.prototype.deleteBook = function(target) {
  target.parentElement.parentElement.remove();
}

// Show Alert
UI.prototype.showAlert = function(msg, className) {
  // Create a div element
  const div = document.createElement('div');
  // Add classes
  div.className = `alert ${className}`;
  // Add text
  div.appendChild(document.createTextNode(msg));
  // Get Parent
  const container = document.querySelector('.container');
  // Grab form
  const form = document.querySelector('#book-form');
  // Insert alert
  container.insertBefore(div, form);

  // Clear error after 3 seconds
  setTimeout(function() {
    document.querySelector('.alert').remove();
  }, 3000);
}

// Clear Fields
UI.prototype.clearFields = function() {
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('isbn').value = '';
}

// Event Listener For Add Book
document.getElementById('book-form').addEventListener('submit', function(e) {
  //Get form values
  const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value;

  // Instantiate book
  const book = new Book(title, author, isbn);
  
  // Instantiate UI
  const ui = new UI();

  // Validate
  if(title === '' || author === '' || isbn === '') {
    // Error alert
    ui.showAlert('Please fill in all fields', 'error');
  } else {
    // Add book to list
    ui.addBookToList(book);

    // Show success
    ui.showAlert('Book Added!', 'success');

    // Clear fields
    ui.clearFields();
  }
  
  e.preventDefault();
});

// Event Listener for delete book (Event Delegation)
document.getElementById('book-list').addEventListener('click', function(e) {
  // Instantiate UI
  const ui = new UI();
  
  const target = e.target.className === 'delete' ? e.target : null;
  
  if(target) {
    // Delete book
    ui.deleteBook(target);

    // Show success
    ui.showAlert('Book Deleted!', 'success');
  }

  e.preventDefault();
});