// Google Books
var googleBooksURL = 'https://www.googleapis.com/books/v1/volumes?q=authors&maxResults=5';
$.ajax({
  url: googleBooksURL,
  method: 'GET',
  dataType: 'jsonp'
}).done(function(result) {
  console.log('Google Books', result);
}).fail(function(error) {
  console.log('Google Books: An error occurred.');
});



// NY Times
var nyTimesKey = 'a9c6282043404e258f246983bccaf593';
var nyTimesURL = 'https://api.nytimes.com/svc/books/v3/lists/overview.json?api-key=' + nyTimesKey;
$.ajax({
  url: nyTimesURL,
  method: 'GET'
}).done(function(result) {
  console.log('NY Times', result);
}).fail(function(error) {
  console.log('NY Times: An error occurred.');
});



// Open Library
var openLibraryURL = 'https://openlibrary.org/api/books?bibkeys=ISBN:0451526538&jscmd=data';
$.ajax({
  url: openLibraryURL,
  method: 'GET',
  dataType: 'jsonp'
}).done(function(result) {
  console.log('Open Library', result);
}).fail(function(error) {
  console.log('Open Library: An error occurred.');
});
