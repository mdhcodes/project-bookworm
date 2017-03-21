$('.search').on('click', function() {
    $('#results-div').html("");
    var search = $(this).attr("id");
    console.log(search);

    var googleBooksURL = 'https://www.googleapis.com/books/v1/volumes?q=' + search + '&maxResults=5';

    var h3 = $('<h3 class="list-name">');
    h3.text($(this).text());

    $.ajax({
        url: googleBooksURL,
        method: 'GET',
        dataType: 'jsonp'
    }).done(function(result) {
        console.log('Google Books', result);


        $('#results-div').append(h3);
        $('#results-div').append('<div class="api-data">');
        setTimeout(function() {
            $('#results-collapse').trigger('click');
        }, 200);
        for (var i = 0; i < result.items.length; i++) {
            console.log(result.items[i].volumeInfo.imageLinks.thumbnail)
            $('.api-data').append(
                '<!--   Icon Section   -->' +
                '<div class="col s12 m6 l3">' +
                '<div class="icon-block">' +
                '<div class="card">' +
                '<div class="card-image waves-effect waves-block waves-light">' +
                '<img class="activator book-img" src="' + result.items[i].volumeInfo.imageLinks.thumbnail + '">' +
                '</div>' +
                '<div class="card-content">' +
                '<span class="card-title activator grey-text text-darken-4">' + result.items[i].volumeInfo.title + '<i class="material-icons right">more_vert</i></span>' +
                '<p><a href="#">This is a link</a></p>' +
                '</div>' +
                '<div class="card-reveal">' +
                '<span class="card-title grey-text text-darken-4">' + result.items[i].volumeInfo.title + '<br>' + result.items[i].volumeInfo.authors + '<i class="material-icons right">close</i></span>' +
                '<p>' + result.items[i].volumeInfo.description + '</p>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>'
            );
        }
    }).fail(function(error) {
        console.log('Google Books: An error occurred.');
    });

});


// Google Books API - Author Search

$("#author-search").on('click', function() {

    //Grab the text from the user
    var author = $("#author").val().trim();


    var googleBooksURL = 'https://www.googleapis.com/books/v1/volumes?q=' + author + '&maxResults=10';

    $.ajax({
        url: googleBooksURL,
        method: 'GET',
        dataType: 'jsonp'
    }).done(function(result) {
        console.log('Google Books', result);
        var h3 = $('<h3 class="list-name">');
        h3.text(author);
        $('#results-div').append(h3);
        $('#results-div').append('<div class="api-data">');
        setTimeout(function() {
            $('#results-collapse').trigger('click');
        }, 200);
        for (var i = 0; i < result.items.length; i++) {

            $('.api-data').append(
                '<!--   Icon Section   -->' +
                '<div class="col s12 m6 l3">' +
                '<div class="icon-block">' +
                '<div class="card">' +
                '<div class="card-image waves-effect waves-block waves-light">' +
                '<img class="activator book-img" src="' + result.items[i].volumeInfo.imageLinks.thumbnail + '">' +
                '</div>' +
                '<div class="card-content">' +
                '<span class="card-title activator grey-text text-darken-4">' + result.items[i].volumeInfo.title + '<i class="material-icons right">more_vert</i></span>' +
                '<p><a href="#">This is a link</a></p>' +
                '</div>' +
                '<div class="card-reveal">' +
                '<span class="card-title grey-text text-darken-4">' + result.items[i].volumeInfo.title + '<br>' + result.items[i].volumeInfo.authors + '<i class="material-icons right">close</i></span>' +
                '<p>' + result.items[i].volumeInfo.description + '</p>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>'
            );
        }
    }).fail(function(error) {
        console.log('Google Books: An error occurred.');
    });

});

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
        $('#results-div').append(h3);
        $('#results-div').append('<div class="api-data">');
        setTimeout(function() {
            $('#results-collapse').trigger('click');
        }, 200);
        for (var i = 0; i < result.results.lists.length; i++) {

            $('.api-data').append('<!--   Icon Section   -->' +
                '<div class="col s12 m6 l3">' +
                '<div class="icon-block">' +
                '<div class="card">' +
                '<div class="card-image waves-effect waves-block waves-light">' +
                '<img class="activator book-img" src="' + result.results.lists[0].books[i].book_image + '">' +
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
                '</div>'
            );
        }

    }).fail(function(error) {
        console.log('NY Times: An error occurred.');
    });
}); // end #nytButton click event


// Collapsible Behavior
$('#search-collapse').on('click', function() {
    // $('#apiData').fadeOut('slow');
    $('#search-collapse').fadeOut('fast');
    $('#results-collapse').fadeIn('fast');
});
$('#results-collapse').on('click', function() {
    // $('#apiData').delay('fast').fadeIn('slow');
    $('#results-collapse').fadeOut('fast');
    $('#search-collapse').fadeIn('fast');
});


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
