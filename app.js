const searchSong = async () => {
  const searchText = document.getElementById('search-field').value;
  const url = `https://api.lyrics.ovh/suggest/${searchText}`
  try {
    const response = await fetch(url);
    const data = await response.json();
    displaySongs(data.data);
  }
  catch (error) {
    displayError();
    document.getElementById('search-field').value = '';
  }
};

const displaySongs = songs => {
  if (songs != '') {
    const songContainer = document.getElementById('song-container');

    document.getElementById('error-message').innerText = '';
    songContainer.innerHTML = '';
    document.getElementById('search-field').value = '';
    document.getElementById('show-lyrics').innerText = '';

    songs.forEach(song => {
      const songDiv = document.createElement('div');
      songDiv.className = 'single-result row align-items-center my-3 p-3';
      songDiv.innerHTML =
        `<div class="col-md-9">
         <h3 class="lyrics-name">${song.title}</h3>
         <p class="author lead">Album by <span>${song.artist.name}</span></p>
         <audio controls>
            <source src="${song.preview}" type="audio/ogg">
         </audio>
     </div>
     <div class="col-md-3 text-md-right text-center">
         <button onclick="getLyric('${song.artist.name}','${song.title}')" class="btn btn-success">Get Lyrics</button>
     </div>
     `;
      songContainer.appendChild(songDiv);
    });
  }
  else {
    displayError();
    document.getElementById('search-field').value = '';
    document.getElementById('song-container').innerHTML = '';
  }
};


const getLyric = async (artist, title) => {
  const url = `https://api.lyrics.ovh/v1/${artist}/${title}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    displayLyric(data.lyrics);
  }
  catch (error) {
    displayError();
  }
}

const displayLyric = lyric => {
  document.getElementById('error-message').innerText = '';
  if (lyric != '') {
    const lyricsText = document.getElementById('show-lyrics');
    lyricsText.innerText = lyric;
  }
  else {
    const error = document.getElementById('error-message');
    error.innerText = 'Sorry...lyrics unavailable....!!!';
  }
}

displayError = () => {
  const error = document.getElementById('error-message');
  error.innerText = 'Sorry...please try again later....!!!';
}