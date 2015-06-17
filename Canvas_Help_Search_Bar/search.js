
/////////////////////////////////////////////////////
// Canvas Guides search bar - Queries Screensteps  //
////////////////////////////////////////////////////

$(document).ready(function () {
    'use strict';
    var searchBarSpace, searchBarBox;
    //Creates space in the identity bar for the search bar, still retaining the "help" link.
    searchBarSpace = document.createElement("li");
    searchBarSpace.id = "searchBar";
    searchBarSpace.innerHTML = '<form id="screenstepslive-search" action=""><input type="text" id="screenstepslive-search-field" value="Search Canvas Help" name="text" size="20" onfocus="searchFieldOnFocus();" /></form>';
    document.getElementById("identity").appendChild(searchBarSpace);

    //Creates search results box that is independent of search bar, as not to interfere with its container.
    searchBarBox = document.createElement("div");
    searchBarBox.id = "search_results";
    document.body.appendChild(searchBarBox);
});

//Removes search field's value so user can type in their search.
function searchFieldOnFocus() {
    'use strict';
    if (document.getElementById("screenstepslive-search-field").value === "Search Canvas Help") {
        document.getElementById("screenstepslive-search-field").value = "";
    }
}

//Closes search results box when user clicks on the box's "x" button.
function closeSearchResults() {
    'use strict';
    document.getElementById("search_results").className = "makeMeInvisible";
}


////////////////////////////////////////////////
// Canvas Guides Search Bar Top-rt Navigation //
////////////////////////////////////////////////

var ScreenStepsLiveSearchOptions = {
    domain: "canvas.screenstepslive.com",
    space: "2204",
    update_element: "search_results",
    username: "canvassearch",
    password: "canvasrocks",
    use_ssl: true
};

function makeSpaceSearchUrl() {
    'use strict';
    var url = 'https://' + ScreenStepsLiveSearchOptions.domain + "/spaces/" + ScreenStepsLiveSearchOptions.space + "/searches.json?callback=?";
    return url;
}

function searchScreenStepsLiveSpace(string) {
    'use strict';
    jQuery.ajax({
        type: "GET",
        url: makeSpaceSearchUrl(),
        dataType: 'json',
        data: {
            text: string,
            username: ScreenStepsLiveSearchOptions.username,
            password: ScreenStepsLiveSearchOptions.password
        }
    });
}

function results_string(lessons_count) {
    'use strict';
    var lessons_found_text, no_results_text;
    if (lessons_count > 0) {
        lessons_found_text = ScreenStepsLiveSearchOptions.results_text || "matching lessons found.";
        return lessons_count + " " + lessons_found_text;
    }
    no_results_text = ScreenStepsLiveSearchOptions.no_results_text || "No lessons were found";
    return no_results_text;
}

function render_lesson_results(lessons) {
    'use strict';
    var results_count, result;
    results_count = 0;
    if (lessons !== null) {
        results_count = lessons.length;
    }
    result = '<h4>' + results_string(results_count) + "<a class='close-link' id='close_search_results' href='#' onclick='closeSearchResults();'>&nbsp;</a></h4>";
    if (results_count > 0) {
        result += '<ul>';
        jQuery.each(lessons, function (index, l) {
            result += '<li><a href="' + l.url + '" class="search-result" target="_blank">' + l.title + '</a></li>';
        });
    }
    if (jQuery('#search_results').hasClass('makeMeInvisible')) {
        jQuery('#search_results').removeClass('makeMeInvisible');
        jQuery('#search_results').addClass('makeMeVisible');
    }
    return result;
}

function DisplayScreenStepsLiveSearchResults(data) {
    'use strict';
    if (data.errors === undefined) {
        jQuery('#' + ScreenStepsLiveSearchOptions.update_element).html(render_lesson_results(data.lessons));
    } else {
        jQuery.each(data.errors, function (error) { alert(error); });
    }
}

jQuery();
jQuery(document).ready(function () {
    'use strict';
    jQuery('#screenstepslive-search').submit(function (e) {
        e.preventDefault();
        var search_string = jQuery('#screenstepslive-search input#screenstepslive-search-field').val();
        searchScreenStepsLiveSpace(search_string);
    });
});


