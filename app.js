const artist = document.querySelector('.fields .artist');
const song = document.querySelector('.fields .song');
const searchBtn = document.querySelector('.fields .search');
const lyricsCont = document.querySelector('.lyrics');

/////still need to figure out how to throw alert when 404 response for incorrect inputs


function searchLyrics() {
    //clear lyrics container
    lyricsCont.innerHTML = "";


    let artistInput = artist.value;
    let songInput = song.value;

    //return alert if either field is left empty
    if (artistInput === "" || songInput === "") {
        alert("Enter both an artist and a song to search for lyrics.")
      
    }
    if (artistInput !== "" && songInput !== "") {
        
        let regex = /\s+|_+/g;
        let artist = artistInput.replace(regex, "-");
        let song = songInput.replace(regex, "-");
        fetch(`https://api.lyrics.ovh/v1/${artist}/${song}`)
            .then(response => response.json())
            .then(data => {
                let lyrics = data.lyrics;
                lyricsCont.innerHTML += lyrics.replace(/([A-Z]+)/g, ",$1").replace(/,/g," <br />").split(",");
            });
    }

    //clear both fields after search button is pressed
    artist.value = "";
    song.value = "";
}

searchBtn.addEventListener("click", searchLyrics)