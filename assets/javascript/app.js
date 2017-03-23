// Google Books API - Mood and Genre Search

$('.search').on('click', function() {
    $('#results-div').html("");
    var search = $(this).attr("id");
    console.log(search);

    var googleBooksURL = 'https://www.googleapis.com/books/v1/volumes?q=' + search + '&maxResults=8';

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
            //console.log(result.items[i].volumeInfo.imageLinks.thumbnail)

            $('.api-data').append('<!--   Icon Section   -->');
            var col = $('<div class="col s12 m6 l3">');
            $('.api-data').append(col);
            var iconBlock = $('<div class="icon-block">');
            col.append(iconBlock);
            var card = $('<div class="card medium">');
            iconBlock.append(card);
            var cardImage = $('<div class="card-image waves-effect waves-block waves-light">');
            card.append(cardImage);
            var image = $('<img class="activator" src="' + result.items[i].volumeInfo.imageLinks.thumbnail + '">');
            cardImage.append(image);
            var cardContent = $('<div class="card-content">');
            card.append(cardContent);
            var cardTitle = $('<span class="card-title activator grey-text text-darken-4">' + result.items[i].volumeInfo.title + '<i class="material-icons right">more_vert</i></span>');
            cardContent.append(cardTitle);
            var link = $('<p><a href="#">This is a link</a></p>');
            cardContent.append(link);
            var cardReveal = $('<div class="card-reveal">');
            card.append(cardReveal);
            var cardRevealTitle = $('<span class="card-title grey-text text-darken-4">' + result.items[i].volumeInfo.title + '<br>' + result.items[i].volumeInfo.authors + '<i class="material-icons right">close</i></span>');
            cardReveal.append(cardRevealTitle);
            var description = $('<p>' + result.items[i].volumeInfo.description + '</p>');
            cardReveal.append(description);

            for(var j = 0; j < result.items[i].volumeInfo.industryIdentifiers.length; j++) {
              if(result.items[i].volumeInfo.industryIdentifiers[j].identifier.length === 10) {

            //***********************************
            // Check that no letters are in the API
            console.log('ISBN', result.items[i].volumeInfo.industryIdentifiers[j].identifier);

            var libraryButton = $('<a class="waves-effect waves-light btn library" data-isbn="' + result.items[i].volumeInfo.industryIdentifiers[j].identifier + '">Library Info</a>');
            card.append(libraryButton);
            } // end if

          } // end j loop

        } // end i loop
    }).fail(function(error) {
        console.log('Google Books: An error occurred.');
    });

});


// Google Books API - Author Search

$("#author-search").on('click', function() {

    $('#results-div').html("");

    //Grab the text from the user
    var author = $("#author").val().trim();

    var googleBooksURL = 'https://www.googleapis.com/books/v1/volumes?q=' + author + '&maxResults=8';

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

            $('.api-data').append('<!--   Icon Section   -->');
            var col = $('<div class="col s12 m6 l3">');
            $('.api-data').append(col);
            var iconBlock = $('<div class="icon-block">');
            col.append(iconBlock);
            var card = $('<div class="card">');
            iconBlock.append(card);
            var cardImage = $('<div class="card-image waves-effect waves-block waves-light">');
            card.append(cardImage);
            var image = $('<img class="activator" src="' + result.items[i].volumeInfo.imageLinks.thumbnail + '">');
            cardImage.append(image);
            var cardContent = $('<div class="card-content">');
            card.append(cardContent);
            var cardTitle = $('<span class="card-title activator grey-text text-darken-4">' + result.items[i].volumeInfo.title + '<i class="material-icons right">more_vert</i></span>');
            cardContent.append(cardTitle);
            var link = $('<p><a href="#">This is a link</a></p>');
            cardContent.append(link);
            var cardReveal = $('<div class="card-reveal">');
            card.append(cardReveal);
            var cardRevealTitle = $('<span class="card-title grey-text text-darken-4">' + result.items[i].volumeInfo.title + '<br>' + result.items[i].volumeInfo.authors + '<i class="material-icons right">close</i></span>');
            cardReveal.append(cardRevealTitle);
            var description = $('<p>' + result.items[i].volumeInfo.description + '</p>');
            cardReveal.append(description);

        }

    }).fail(function(error) {
        console.log('Google Books: An error occurred.');
    });

});

// NY Times Books API

$('#nytButton').on('click', function() {

    $('#results-div').html("");

    var nyTimesKey = 'a9c6282043404e258f246983bccaf593';
    var nyTimesURL = 'https://api.nytimes.com/svc/books/v3/lists/overview.json?api-key=' + nyTimesKey;
    $.ajax({
        url: nyTimesURL,
        method: 'GET'
    }).done(function(result) {
        console.log('NY Times', result);


        setTimeout(function() {
            $('#results-collapse').trigger('click');
        }, 200);


            for(var i = 0; i < result.results.lists.length; i++) {

              if(i === 2 || i === 3 || i === 4 || i === 5 || i === 9 || i === 11 || i === 12 || i === 13) {

              var h3 = $('<h3>');
              h3.text(result.results.lists[i].display_name);
              $('#results-div').append(h3);
              $('#results-div').append('<div class="api-data">');

              for(var j = 0; j < (result.results.lists[i].books.length-1); j++) {
                $('.api-data').append('<!--   Icon Section   -->');
                var col = $('<div class="col s12 m6 l3">');
                $('.api-data').append(col);
                var iconBlock = $('<div class="icon-block">');
                col.append(iconBlock);
                var card = $('<div class="card">');
                iconBlock.append(card);
                var cardImage = $('<div class="card-image waves-effect waves-block waves-light">');
                card.append(cardImage);
                var image = $('<img class="activator" src="' + result.results.lists[i].books[j].book_image + '">');
                cardImage.append(image);
                var cardContent = $('<div class="card-content">');
                card.append(cardContent);
                var cardTitle = $('<span class="card-title activator grey-text text-darken-4">' + result.results.lists[i].books[j].title + '<i class="material-icons right">more_vert</i></span>');
                cardContent.append(cardTitle);
                //var link = $('<p><a href="#">This is a link</a></p>');
                //var link = $('<p><a id="' + i + '" href="' + result["ISBN:" + result.results.lists[0].books[i].primary_isbn10 + ""].url + '" class="find-book" data-isbn="' + result.results.lists[0].books[i].primary_isbn10 + '">Find this book</a></p>');
                var link = $('<p><a id="' + i + '" class="find-book" data-isbn="' + result.results.lists[i].books[j].primary_isbn10 + '">Find this book</a></p>');
                cardContent.append(link);
                var cardReveal = $('<div class="card-reveal">');
                card.append(cardReveal);
                var cardRevealTitle = $('<span class="card-title grey-text text-darken-4">' + result.results.lists[i].books[j].title + '<br>' + result.results.lists[i].books[j].author + '<i class="material-icons right">close</i></span>');
                cardReveal.append(cardRevealTitle);
                var description = $('<p>' + result.results.lists[i].books[j].description + '</p>');
                cardReveal.append(description);

              } // end if
              } // end j
            } // end i


        //}

        console.log('link', link);

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

//Sign-In Modale
$(document).ready(function() {
    $('.modal').modal();
    $('#siBtn').on('click', function() {
        $('#signIn').modal('open');
    });
});


// Open Library API

$(document).on('click', '.library', function() {

  var isbn = $(this).attr('data-isbn');
  console.log('ISBN on click', typeof isbn);

  //var openLibraryURL = 'https://openlibrary.org/api/books?bibkeys=ISBN:0451526538&jscmd=data';

  var openLibraryURL = 'https://openlibrary.org/api/books?bibkeys=ISBN:' + isbn + '&jscmd=data';

  console.log('OpenL URL', openLibraryURL);

  $.ajax({
      url: openLibraryURL,
      method: 'GET',
      dataType: 'jsonp'
  }).done(function(result) {
      console.log('Open Library', result);

      var link = result["ISBN:" + isbn + ""].url || false;
      console.log('Link', link);
      if(link) {
        // window object can open new tab with the link
      $(this).attr('href', result["ISBN:" + isbn + ""].url);
      //$(this).attr('href', 'result["ISBN:0451526538"].url');
      //console.log('ISBN on click', isbn);
    } else {
      // modal with no info sorry
    }
  }).fail(function(error) {
      console.log('Open Library: An error occurred.');
  });

}); // end .library click event
