// Google Books API - General Search

$('.search').on('click', function() {

    var search = $(this).text();
    console.log(search);

    var googleBooksURL = 'https://www.googleapis.com/books/v1/volumes?q=' + search + '&maxResults=5';

    $.ajax({
        url: googleBooksURL,
        method: 'GET',
        dataType: 'jsonp'
    }).done(function(result) {
        console.log('Google Books', result);
    }).fail(function(error) {
        console.log('Google Books: An error occurred.');
    });

}); // end .search click event




// Google Books API - Author Search

var googleBooksURL = 'https://www.googleapis.com/books/v1/volumes?q=authors&maxResults=5';





// NY Times Books API

$('#nytButton').on('click', function() {

    var nyTimesKey = 'a9c6282043404e258f246983bccaf593';
    var nyTimesURL = 'https://api.nytimes.com/svc/books/v3/lists/overview.json?api-key=' + nyTimesKey;
    $.ajax({
        url: nyTimesURL,
        method: 'GET'
    }).done(function(result) {
        console.log('NY Times', result);

        var h3 = $('<h3 class="nyt-list-name">');
        h3.text(result.results.lists[0].display_name);
        $('#apiData').append(h3);
        $('#apiData').append('<div class="container api-data">');

        for (var i = 0; i < result.results.lists.length; i++) {

            $('.api-data').append('<div class="section">' +
                '<!--   Icon Section   -->' +
                '<div class="row">' +
                '<div class="col s12 m6 l3">' +
                '<div class="icon-block">' +
                '<div class="card">' +
                '<div class="card-image waves-effect waves-block waves-light">' +
                '<img class="activator book-img" src="' + result.results.lists[0].books[i]["book_image"] + '">' +
                '</div>' +
                '<div class="card-content">' +
                '<span class="card-title activator grey-text text-darken-4">' + result.results.lists[0].books[i].title + '<i class="material-icons right">more_vert</i></span>' +
                '<p><a href="#">This is a link</a></p>' +
                '</div>' +
                '<div class="card-reveal">' +
                '<span class="card-title grey-text text-darken-4">' + result.results.lists[0].books[i].title + '<br>' + result.results.lists[0].books[i].author + '<i class="material-icons right">close</i></span>' +
                '<p>' + result.results.lists[0].books[i].description + '</p>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>'
            );
        }

    }).fail(function(error) {
        console.log('NY Times: An error occurred.');
    });

}); // end #nytButton click event



// Open Library API
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
