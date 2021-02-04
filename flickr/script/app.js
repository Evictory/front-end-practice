(function(){
  var flickrKey = 'a79dbdd1d24bbdf97f202f74ff0b63ec';
  var flickrBaseURL = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&nojsoncallback=1&api_key=';
  var sufixURL = 'q';

  function getPhotos(searchValue){
    var URL = `${flickrBaseURL}${flickrKey}&text=${searchValue}`;

    return(
      fetch(URL)
        .then(response => response.json())
        .then(data => data.photos.photo)
    );
  }

  var app = document.querySelector('#app');
  var searchForm = app.querySelector('.search-form');
  var searchValue = app.querySelector('.search-input');
  var resultsDiv = app.querySelector('#results__api');

  function createFlickrThumb(photoData){
    var link = document.createElement('a');
    link.setAttribute('href', photoData.large);
    link.setAttribute('target', '_blank');

    var image = document.createElement('img');
    image.setAttribute('src', photoData.thumb);
    image.setAttribute('alt', photoData.title);

    link.appendChild(image);

    return link;

  }

  searchForm.addEventListener('submit', e => {
    e.preventDefault();
    var value = searchValue.value;
    resultsDiv.innerText = 'Carregando...';
    
    getPhotos(value)
      .then((result) => {
        resultsDiv.innerText ='';
        result.forEach(photo => {
          var url = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`
          var thumbnail = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_${sufixURL}.jpg`
          
          var item = createFlickrThumb({
            thumb: thumbnail,
            large: url,
            title: photo.title
          });

          resultsDiv.appendChild(item);
        });
      });

  });

}())