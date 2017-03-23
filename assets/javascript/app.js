// Stored function for Google Books API HTML write
function resultsGoogle (obj) {
    // For loop - write results to DOM, generates modal buttons
    for (var i = 0; i < obj.items.length; i++) {
        var title = obj.items[i].volumeInfo.title;
        // var author = obj.items[i].volumeInfo.authors[0];
        var image = obj.items[i].volumeInfo.imageLinks.thumbnail;
        var description = obj.items[i].volumeInfo.description;
        var isbn = obj.items[i].volumeInfo.industryIdentifiers[0].identifier;
        
        // Results cards HTML
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
            src: image
        });
        cardImage.append(imageDisp);
        var cardContent = $('<div/>', {
            class: 'card-content'
        });
        card.append(cardContent);
        var cardTitle = $('<span/>', {
            class: 'card-title activator grey-text text-darken-4',
            text: title
        });
        cardContent.append(cardTitle);
        
        // Modal button HTML
        var modalBtn = $('<button/>', {
            id: 'btn-modal-' + i,
            class: 'modal-btn btn-floating waves-effect waves-light',
            'data-isbn': isbn
        });
        var modalIcon = $('<i/>', {
            class: 'material-icons',
            text: 'add'
        });
        $(modalBtn).append(modalIcon);
        cardContent.append(modalBtn);
    } //End for loop

} //End resultsGoogle






$(document).ready(function() {

    
    
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
            // Expand results element
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
            // Call function to write HTML
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
        var shelfID = $(this).attr("data-shelf");
        var googleBooksURL = 'https://www.googleapis.com/books/v1/users/108392193120593106688/bookshelves/' + shelfID + '/volumes?maxResults=8';
        // API call
        $.ajax({
            url: googleBooksURL,
            method: 'GET',
            dataType: 'jsonp'
        }).done(function(result) {
            // Expand results element
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
            h3.text(search);
            // Write results to DOM
            $('#results-div').append(h3);
            $('#results-div').append('<div class="api-data">');
            // Call function to write HTML
            resultsGoogle(result);

        }).fail(function(error) {
            console.log('Google Books: An error occurred.');
        });

    }); //End author search


// Best Seller Search - NYT API
    $('#nytButton').on('click', function() {
        // Clear results HTML
        $('#results-div').html("");

        var nyTimesKey = 'a9c6282043404e258f246983bccaf593';
        var nyTimesURL = 'https://api.nytimes.com/svc/books/v3/lists/overview.json?api-key=' + nyTimesKey;
        // API call
        $.ajax({
            url: nyTimesURL,
            method: 'GET'
        }).done(function(result) {
            console.log('NY Times', result);
            // Expand results element
            setTimeout(function() {
                $('#results-collapse').trigger('click');
            }, 100);
            setTimeout(function() {
                $('#apiData').fadeTo(500, 1);
            }, 200);
            // Write results to DOM
            var h3 = $('<h3>');
            h3.text(result.results.lists[0].display_name);
            $('#results-div').append(h3);
            $('#results-div').append('<div class="api-data">');
            for (var i = 0; i < result.results.lists.length; i++) {
                var title = result.results.lists[0].books[i].title;
                var author = result.results.lists[0].books[i].author;
                var image = result.results.lists[0].books[i].book_image;
                var description = result.results.lists[0].books[i].description;
                var isbn = result.results.lists[0].books[i].primary_isbn10;
            
                // Results cards HTML
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
                    src: image
                });
                cardImage.append(imageDisp);
                var cardContent = $('<div/>', {
                    class: 'card-content'
                });
                card.append(cardContent);
                var cardTitle = $('<span/>', {
                    class: 'card-title activator grey-text text-darken-4',
                    text: title
                });
                cardContent.append(cardTitle);
                
                // Modal button HTML
                var modalBtn = $('<button/>', {
                    id: 'btn-modal-' + i,
                    class: 'modal-btn btn-floating waves-effect waves-light',
                    'data-isbn': isbn
                });
                var modalIcon = $('<i/>', {
                    class: 'material-icons',
                    text: 'add'
                });
                $(modalBtn).append(modalIcon);
                cardContent.append(modalBtn);
            } //End for loop

        }).fail(function(error) {
            console.log('NY Times: An error occurred.');
        });
    }); // end NYT search


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
    

// Modal Logic (results - more info display)
    $('.modal').modal();
    $('#apiData').on('click', '.modal-btn', function() {
        $('#modal1').modal('open');
        console.log($(this).attr('data-isbn'));
    });


}); //end DocReady


/*
// Open Library API

//$('.find-book').on('click', function() {

  var isbn = $(this).data('data-isbn');
  //console.log('ISBN on click', isbn);

  //var openLibraryURL = 'https://openlibrary.org/api/books?bibkeys=ISBN:0451526538&jscmd=data';

  var openLibraryURL = 'https://openlibrary.org/api/books?bibkeys=ISBN:' + isbn + '&jscmd=data';

  $.ajax({
      url: openLibraryURL,
      method: 'GET',
      dataType: 'jsonp'
  }).done(function(result) {
      console.log('Open Library', result);

      //$(this).attr('href', result["ISBN:" + isbn + ""].url);
      //console.log('ISBN on click', isbn);

  }).fail(function(error) {
      console.log('Open Library: An error occurred.');
  });

//}); // end .find-book click event
*/
