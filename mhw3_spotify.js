function onJson(json) {
    console.log('JSON ricevuto');
    const library = document.querySelector('#box_album');
    library.innerHTML = '';
    const results = json.albums.items;
    let num_results = results.length;
    if(num_results > 10)
      num_results = 10;
      for(let i=0; i<num_results; i++) {
      const album_data = results[i];
      const title = album_data.name;
      const selected_image = album_data.images[0].url;
      const album = document.createElement('div');
      album.classList.add('album');
      const img = document.createElement('img');
      img.src = selected_image;
      const caption = document.createElement('span');
      caption.textContent = title;
      album.appendChild(img);
      album.appendChild(caption);
      library.appendChild(album);
    }
  }
  
  function onResponse(response) {
    console.log('Risposta ricevuta');
    return response.json();
  }
  
  function search(event) {
    event.preventDefault();
    const album_input = document.querySelector('#album');
    const album_value = encodeURIComponent(album_input.value);
    console.log('Eseguo ricerca: ' + album_value);
    fetch("https://api.spotify.com/v1/search?type=album&q=" + album_value,
    { headers:{ 'Authorization': 'Bearer ' + token } }
   ).then(onResponse).then(onJson);
  }
  
  function onTokenJson(json){
    token = json.access_token;
  }
  
  function onTokenResponse(response){
    return response.json();
  }

  const client_id = 'a14b242bc3994dcf8e7b8201c6090fb6';
  const client_secret = 'be0e48d59a9741b28ad2c434ca41fea3';

  let token;

  fetch("https://accounts.spotify.com/api/token",
      {
     method: "post",
     body: 'grant_type=client_credentials',
     headers:
     {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + btoa(client_id + ':' + client_secret)
     }
    }
  ).then(onTokenResponse).then(onTokenJson);
  
  
  const form = document.querySelector('#form_a');
  form.addEventListener('submit', search)