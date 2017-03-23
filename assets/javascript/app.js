// Stored function - Creates results card HTML and modal trigger
function resultsHTML(imageFn, titleFn, authorFn, descriptionFn, isbnFn, iFn) {
    // Create result card HTML
    $('.api-data').append('<!--   Icon Section   -->');
    var col = $('<div/>', {
        class: 'col s12 m6 l3'
    });
    $('.api-data').append(col);
    var iconBlock = $('<div/>', {
        class: 'icon-block'
    });
    col.append(iconBlock);
    var card = $('<div/>', {
        class: 'card medium'
    });
    iconBlock.append(card);
    var cardImage = $('<div/>', {
        class: 'card-image waves-effect waves-block waves-light'
    });
    card.append(cardImage);
    var imageDisp = $('<img/>', {
        class: 'activator',
        src: imageFn
    });
    cardImage.append(imageDisp);
    var cardContent = $('<div/>', {
        class: 'card-content'
    });
    card.append(cardContent);
    var cardTitle = $('<span/>', {
        class: 'card-title activator grey-text text-darken-4',
        text: titleFn
    });
    cardContent.append(cardTitle);
    // Create results modal trigger button HTML
    var modalBtn = $('<button/>', {
        id: 'btn-modal-' + iFn,
        class: 'modal-btn btn-floating waves-effect waves-light',
        'data-img': imageFn,
        'data-title': titleFn,
        'data-author': authorFn,
        'data-description': descriptionFn,
        'data-isbn': isbnFn
    });
    var modalIcon = $('<i/>', {
        class: 'material-icons',
        text: 'add'
    });
    $(modalBtn).append(modalIcon);
    cardContent.append(modalBtn);
} // End resultsHTML stored function


// Stored function - Google Books API HTML write
function resultsGoogle (obj) {
    // For loop through results
    for (var i = 0; i < obj.items.length; i++) {
        var title = obj.items[i].volumeInfo.title;
        var author = obj.items[i].volumeInfo.authors[0];
        var image = obj.items[i].volumeInfo.imageLinks.thumbnail;
        var description = obj.items[i].volumeInfo.description;
        // var isbn = obj.items[i].volumeInfo.industryIdentifiers[0].identifier;

        // Filter for only ISBN-10 values
        for(var j = 0; j < obj.items[i].volumeInfo.industryIdentifiers.length; j++) {
            if(obj.items[i].volumeInfo.industryIdentifiers[j].identifier.length === 10) {
                var isbn = obj.items[i].volumeInfo.industryIdentifiers[j].identifier;
                // Call function to write result cards and modal trigger
                resultsHTML(image, title, author, description, isbn, i);
                console.log('ISBN', isbn);
            } // end if
         } // end j loop
    } //End i loop
} //End resultsGoogle stored function


// Stored function - NYT API HTML write
function resultsNyt (obj) {
    // Loop through results categories
    for(var i = 0; i < obj.results.lists.length; i++) {
        // If statement to only select certain best-seller result categories
        if(i === 2 || i === 3 ||  i === 4 || i === 5 || i === 11 || i === 12 || i === 13) {
            // Write results title to DOM
            var h3 = $('<h3>');
            h3.text(obj.results.lists[i].display_name);
            $('#results-div').append(h3);
            $('#results-div').append('<div class="api-data">');
            // Loop through results inside each category
            for(var j = 0; j < (obj.results.lists[i].books.length-1); j++) {
                var title = obj.results.lists[i].books[j].title;
                var author = obj.results.lists[i].books[j].author;
                var image = obj.results.lists[i].books[j].book_image;
                var description = obj.results.lists[i].books[j].description;
                var isbn = obj.results.lists[i].books[j].primary_isbn10;

                // Call function to write result cards, modal trigger, and Open Library button
                resultsHTML(image, title, author, description, isbn, i);
                console.log('ISBN', isbn);
            } // end j for loop
        } // end if statement
    } // end i for loop
} // end resultsNyt stored function


$(document).ready(function() {

// Initialize Modals
    $('.modal').modal();

// Initialize Google Book Preview
    google.books.load();

// Mood Search AND Genre Search- Google Books API
    $('.search').on('click', function() {
        // Reset results div
        $('#results-div').html("");

        // Store title of search
        var h3 = $('<h3 class="list-name">');
        h3.text($(this).text());
        // Set search term
        var shelfID = $(this).attr("data-shelf");
        var googleBooksURL = 'https://www.googleapis.com/books/v1/users/108392193120593106688/bookshelves/' + shelfID + '/volumes?maxResults=8';
        // API Call
        $.ajax({
            url: googleBooksURL,
            method: 'GET',
            dataType: 'jsonp'
        }).done(function(result) {
            // Expand results collapsible
            setTimeout(function() {
                $('#results-collapse').trigger('click');
            }, 100);
            setTimeout(function() {
                $('#apiData').fadeTo(500, 1);
            }, 200);
            // Console log JSON results
            console.log('Google Books', result);
            // Title for results - writing to DOM
            $('#results-div').append(h3);
            $('#results-div').append('<div class="api-data">');
            // Call function to write results display HTML
            resultsGoogle(result);
        }).fail(function(error) {
            console.log('Google Books: An error occurred.');
        });

    }); //End Mood and Genre Search


// Author Search - Google Books API
    $("#author-search").on('click', function() {
        // Reset results div
        $('#results-div').html("");
        // Set search term
        var author = $("#author").val().trim();
        var googleBooksURL = 'https://www.googleapis.com/books/v1/volumes?q=inauthor:' + author + '&maxResults=8';
        // API call
        $.ajax({
            url: googleBooksURL,
            method: 'GET',
            dataType: 'jsonp'
        }).done(function(result) {
            // Expand results collapsible
            setTimeout(function() {
                $('#results-collapse').trigger('click');
            }, 100);
            setTimeout(function() {
                $('#apiData').fadeTo(500, 1);
            }, 200);
            // Console log JSON results
            console.log('Google Books', result);
            // Title for results - writing to DOM
            var h3 = $('<h3 class="list-name">');
            h3.text(author);
            $('#results-div').append(h3);
            $('#results-div').append('<div class="api-data">');
            // Call function to write results display HTML
            resultsGoogle(result);
        }).fail(function(error) {
            console.log('Google Books: An error occurred.');
        });
    }); //End author search


// Best Seller Search - NYT API
    $('#nytButton').on('click', function() {
        // Clear results HTML
        $('#results-div').html("");
        // Set API URL
        var nyTimesKey = 'a9c6282043404e258f246983bccaf593';
        var nyTimesURL = 'https://api.nytimes.com/svc/books/v3/lists/overview.json?api-key=' + nyTimesKey;
        // API call
        $.ajax({
            url: nyTimesURL,
            method: 'GET'
        }).done(function(result) {
            // Console log results obj
            console.log('NY Times', result);
            // Expand results collapsible
            setTimeout(function() {
                $('#results-collapse').trigger('click');
            }, 100);
            setTimeout(function() {
                $('#apiData').fadeTo(500, 1);
            }, 200);
            // Call function to write results display HTML
            resultsNyt(result);
        }).fail(function(error) {
            console.log('NY Times: An error occurred.');
        }); // end API call
    }); // end NYT search


// Open Library API
    $(document).on('click', '.library', function() {

        var isbn = $(this).attr('data-isbn');
        console.log('Open Library ISBN', isbn);

        var openLibraryURL = 'https://openlibrary.org/api/books?bibkeys=ISBN:' + isbn + '&jscmd=data';

         $.ajax({
            url: openLibraryURL,
            method: 'GET',
            dataType: 'jsonp'
        }).done(function(result) {
            console.log('Open Library', result);
            var resultObj = result["ISBN:" + isbn + ""];
            
            // console.log('Link', link);
            if(result["ISBN:" + isbn + ""] === undefined) {
                // If no result found...
                // Modal will display if there is no link available.
                $('#library-modal').modal('open');
                console.log('link don\'t work! - modal time!');
            } else {
                // If result is found...
                // The window object opens a new tab with the link.
                window.open(result["ISBN:" + isbn + ""].url);
                console.log('link available');

          }
        }).fail(function(error) {
          console.log('Open Library: An error occurred.');
        });

    }); // end .library click event


// Collapsible Behavior (results/search)
    $('#search-collapse').on('click', function() {
        // When search collapsable is expanded, hide the search icon and show the results icon
        $('#search-collapse').fadeTo(100, 0);
        $('#results-collapse').fadeTo(100, 1);
    });

    $('#results-collapse').on('click', function() {
        // When results collapsible is exapnded, hide the results icon and show the search icon
        $('#results-collapse').fadeTo(100, 0);
        $('#search-collapse').fadeTo(100, 1);
    });


// Results Modal (populate more info display)
    // When modal trigger button is clicked....
    $('#apiData').on('click', '.modal-btn', function() {
        // Clear modal
        $('#img-div').html('');
        $('#title-div').html('');
        $('#author-div').html('');
        $('#description-div').html('');
        // $('#preview-div').html('');
        $('#library-div').html('');
        $('#buy-div').html('');
        // Get and store data attributes
        var titleData = $(this).attr('data-title');
        var title = $('<h5/>', {
            id: 'title-text'
        });
        var authorData = $(this).attr('data-author');
        var author = $('<h6/>', {
            id: 'author-text'
        });
        var descriptionData = $(this).attr('data-description');
        var description = $('<p/>', {
            id: 'description-text'
        });
        var imgURL = $(this).attr('data-img');
        var img = $('<img/>', {
            src: imgURL,
            class: 'modal-img'
        });
        var isbn = $(this).attr('data-isbn');
        var libraryButton = $('<a/>', {
            class: 'waves-effect waves-light btn library',
            'data-isbn': isbn,
            text: 'Library Info'
        });
        // Populate modal with stored data
        (title).append(titleData);
        $('#title-div').append(title);
        (author).append(authorData);
        $('#author-div').append(author);
        (description).append(descriptionData);
        $('#description-div').append(description);
        $('#img-div').append(img);
        $('#library-div').append(libraryButton);
        // Create book preview according to Google documentation
        initialize(isbn);
        // var viewer = new google.books.DefaultViewer(document.getElementById('preview-div'));
        // viewer.load('ISBN:' + isbn);

        // Open modal
        $('#modal-result').modal('open');
        console.log($(this).attr('data-isbn'));
    });

// Stored Google Books functions
function prevNotFound() {
    console.log("could not embed the book!");
    $('#preview-div').hide();
    $('#previewYes').hide();
    $('#previewNo').show();
}

function initialize(isbnFn) {
    $('#preview-div').show();
    $('#previewYes').show();
    $('#previewNo').hide();
    var viewer = new google.books.DefaultViewer(document.getElementById('preview-div'));
    viewer.load('ISBN:' + isbnFn, prevNotFound);
}


// Sign-In Modale
    $('#siBtn').on('click', function() {
        $('#signIn').modal('open');
    });

}); // End Document(ready)
