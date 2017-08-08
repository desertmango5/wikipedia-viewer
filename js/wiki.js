$(document).foundation();

$(document).ready(function() { 

	var viewportWidth;

	function getWidth() {
		viewportWidth = window.innerWidth;
		if (viewportWidth < 600) {
			$('a#randomURL').attr('target', '_blank');
		} else {
			$('a#randomURL').attr('target', 'iframe-random');	
			$('#random-button').attr('data-open', 'random-modal');
		}
	}

	function getSearchValue() {
		$('#searchButton').on('click', function() {
			var search = document.getElementById('searchEntry').value;
			searchArray = [];
			wikiSearch(search);
			document.getElementById('searchEntry').value = '';
		});
	}  // end getSearchValue()

	function wikiSearch(search) {
		$.getJSON('https://cors-anywhere.herokuapp.com/https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrlimit=25&prop=extracts&exintro&explaintext&exsentences=2&gsrsearch=' + search, function(data) {

			var searchArray = [];

			for (var propt in data.query.pages) {
				searchArray.push(data.query.pages[propt]);
			}


			// console.log(searchArray[0].pageid);

			for (var i=0; i < searchArray.length; i++) {
				
				var resultID = 'result' + i;
				var pageid = searchArray[i].pageid;
				var title = data.query.pages[pageid].title;
				var description = data.query.pages[pageid].extract;
				var wikiURL = 'https://en.wikipedia.org/wiki/' + title;

				$(`<div class="results" id="${resultID}"><a href=""><h3></h3></a><p></p></div>`).appendTo("#searchResults");
				$(`#${resultID} h3`).html(title + '<br>' + '<hr>');
				$(`#${resultID} p`).html(description);

				getWidth();

				if (viewportWidth > 600) {
					$(`#${resultID} a`).attr({'href': wikiURL, 'target': 'iframe-results', 'data-open': 'results-modal'});
				} else {
					$(`#${resultID} a`).attr({'href': wikiURL, 'target': '_blank'});
				}
			}
		}); 
	} // end wikiSearch()

	 getSearchValue();	
	 getWidth();
});