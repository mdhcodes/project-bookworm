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
        class: 'card-title activator grey-text text-darken-4 title-display',
        text: caseFix(titleFn)
    });
    cardContent.append(cardTitle);
    // Create results modal trigger button HTML
    var modalBtn = $('<button/>', {
        id: 'btn-modal-' + iFn,
        class: 'modal-btn btn-floating waves-effect waves-light',
        'data-img': imageFn,
        'data-title': caseFix(titleFn),
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
        var isbn = obj.items[i].volumeInfo.industryIdentifiers[0].identifier;

        // Filter for only ISBN-10 values
        for(var j = 0; j < obj.items[i].volumeInfo.industryIdentifiers.length; j++) {
            if(obj.items[i].volumeInfo.industryIdentifiers[j].identifier.length === 10) {
                var isbn = obj.items[i].volumeInfo.industryIdentifiers[j].identifier;
                // Call function to write result cards and modal trigger
                resultsHTML(image, title, author, description, isbn, i);
                //console.log('ISBN', isbn);
            } // end if
         } // end j loop
    } //End i loop
} //End resultsGoogle stored function


// Stored Function - only capitalize the first letter of every word in the title.
function caseFix(str) {
    str = str.toLowerCase().split(' ');
    var newTitle = [];
    for (var i = 0; i < str.length; i++) {
        newTitle.push(str[i][0].toUpperCase() + str[i].slice(1));
        title = newTitle.join(' ');
    }
    //console.log(title);
    return title;
} //End caseFix stored function


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
                // Call function to write result cards, and modal trigger
                resultsHTML(image, title, author, description, isbn, i);
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
        }); // end API call
    }); //End Mood and Genre Search


// Keydown event listener to execute author search when the enter key is pressed.
     $(".author-form").on("keydown", function(e) {
	      if (e.keyCode == 13) {
		        $('#author-search').trigger('click');
            console.log('Click event');
	      }
     });


// Regular expression to check for letters and spaces.
var lettersAndSpaces = /^[a-zA-Z\s]*$/;

// Author Search - Google Books API
    $("#author-search").on('click', function() {
      console.log('Author', $('#author').val().trim().length);
      // Check to ensure the input field contains text with spaces and not only whitespace before the input value is captured.
      if($('#author').val().trim().length > 0 && $('#author').val().trim().match(lettersAndSpaces)) {
        // Reset results div
        $('#results-div').html("");
        // Set search term
        var author = $('#author').val().trim();
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
            // Clear the input field when the user clicks the search button.
            $('#author').val('');
            // Call function to write results display HTML
            resultsGoogle(result);
        }).fail(function(error) {
            console.log('Google Books: An error occurred.');
        }); // end API call
      } else {
        //console.log('Please enter an author\'s name.');
        // Modal will display if there is no text in the input field and if there are only spaces.
        $('#author-modal').modal('open');
      } // if($('#author').val().trim().length > 0 && $('#author').val().trim().match(lettersAndSpaces))
    }); //End author search



    // Deactivate the enter key so the page does not refresh.
    $('#author').on('keydown', function(e) {
       if (e.keyCode === 13) {
            e.preventDefault();
       }
     });





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


// Collapsible Behavior (results/search)
    $('#search-collapse').on('click', function() {
        // When search collapsable is expanded, hide the search icon and show the results icon
        if ($(this).attr('data-status') === 'expanded') {
            $('.party-time').show();
        } else {
            $('.party-time').hide();
        }
        $('#search-collapse').fadeTo(100, 0);
        $('#results-collapse').fadeTo(100, 1);
        $('#search-collapse').attr('data-status', 'expanded').css("cursor", "default");
        $('#results-collapse').attr('data-status', 'hidden').css("cursor", "pointer");

    });

    $('#results-collapse').on('click', function() {
        // When results collapsible is exapnded, hide the results icon and show the search icon
        if ($(this).attr('data-status') === 'expanded') {
            $('.party-time').show();
        } else {
            $('.party-time').hide();
        }
        $('#results-collapse').fadeTo(100, 0);
        $('#search-collapse').fadeTo(100, 1);
        $('#search-collapse').attr('data-status', 'hidden').css("cursor", "pointer");
        $('#results-collapse').attr('data-status', 'expanded').css("cursor", "default");
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
            target: '_blank',
            'data-isbn': isbn,
            href: 'http://www.worldcat.org/isbn/' + isbn,
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
        // Call function to create book preview
        initialize(isbn);

        // Open modal
        $('#modal-result').modal('open');
        console.log($(this).attr('data-isbn'));
    }); // end .modal-btn click event

// Stored Google Books functions
    // function if preview can not load
    function prevNotFound() {
        console.log("could not embed the book!");
        $('#preview-div').hide();
        $('#previewYes').hide();
        $('#buy-links').hide();
        $('#previewNo').show();
    }

    // function to display preview
    function initialize(isbnFn) {
        $('#preview-div').show();
        $('#previewYes').show();
        $('#previewNo').hide();
        var viewer = new google.books.DefaultViewer(document.getElementById('preview-div'));
        viewer.load('ISBN:' + isbnFn, prevNotFound);
    }


// Sign-In Modal
    $('#sign-in').on('click', function() {
        $('#signIn').modal('open');
    });

// Sign-out button
    $('#sign-out').on('click', function() {
        firebase.auth().signOut().then(function() {
            $('#signOutContent').html('Sign-out successful');
            $('#signOut').modal('open');
        }).catch(function(error) {
            $('#signOutContent').html('Sign-out error');
            $('#signOut').modal('open');
        });
    });

// Account details modal
    $('#account-details').on('click', function() {
        $('#accountModal').modal('open');
    });

}); // End Document(ready)
