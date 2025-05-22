let currSong = new Audio();
let currentSongIndex = 0;

const getSongs = async () => {
    let data = await fetch("songs");
    let response = await data.text();

    let div = document.createElement("div");
    div.innerHTML = response;

    let songs = [];
    let nameTags = div.getElementsByTagName("a");

    for (let i = 0; i < nameTags.length; i++) {
        let element = nameTags[i];
        if (element.href.endsWith(".mp3"))
            songs.push(element.href.split("/songs/")[1]);
    }
    return songs;
}

const formatSecondsToTime = (seconds) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = Math.floor(seconds % 60)

    const formattedMinutes = String(minutes).padStart(2, '0')
    const formattedSeconds = String(remainingSeconds).padStart(2, '0')

    return `${formattedMinutes}:${formattedSeconds}`
}


const playMusic = (songs, index, pause = false) => {

    if(index < 0 || index >= songs.length)
        return

    currSong.src = `songs/${songs[index]}`
    if(!pause) {
        currSong.play()
    }
    document.querySelector(".song-name").innerHTML = decodeURI(songs[index]).replaceAll(".mp3", " ")
    document.querySelector(".song-time").innerHTML = "00:00 / 00:00"
}

const main = async () => {
    // Get the list of songs 
    let songs = await getSongs();
    // currSong.src = `songs/${songs[0]}`
    playMusic(songs, 0, true)
    let songList = document.querySelector(".song-list ul");

    songs.forEach(song => {
        songList.innerHTML += `<li class="song-item">
                                   <img class="music-icon color-invert" src="public/images/svg/music.svg" alt="Music Icon">
                                   <div class="info">
                                       <div>${song.replaceAll("%20", " ")}</div>
                                   </div>
                                   <img class="play-now play-now-button" src="public/images/svg/playnow.svg" alt="Play now button">
                               </li>`;
    });

    // Attach an event listener to the play-now image
    Array.from(document.querySelectorAll(".song-item")).forEach((e, index) => {
        e.querySelector(".play-now").addEventListener("click", (event) => {
            event.stopPropagation();
            playMusic(songs, index); // Pass the songs array and the correct index
            document.querySelector("#play").src = "public/images/svg/pause.svg";
        });
    });


    currSong.addEventListener("play", () => {
        console.log("Song is playing");
        document.querySelector("#play").src = "public/images/svg/pause.svg";
    });

    currSong.addEventListener("pause", () => {
        console.log("Song is paused");
        document.querySelector("#play").src = "public/images/svg/play.svg";
    });


    // Attach an event listener to play next and previous
    document.querySelector("#play").addEventListener("click", () => {
        if (currSong.src) {
            if (currSong.paused) {
                currSong.play();
                document.querySelector("#play").src = "public/images/svg/pause.svg";
            }
            else {
                currSong.pause();
                document.querySelector("#play").src = "public/images/svg/play.svg";
            }
        }
    });

    document.querySelector("#previous").addEventListener("click", () => {
        currentSongIndex = (currentSongIndex - 1) % songs.length
        playMusic(songs, currentSongIndex)
    })

    document.querySelector("#next").addEventListener("click", () => {
        if(currentSongIndex < songs.length)
        currentSongIndex = (currentSongIndex + 1) % songs.length
        playMusic(songs, currentSongIndex)
    })

    window.addEventListener('keydown', (e) => {
        switch(e.code) {
          case 'Space':
            e.preventDefault();
            elements.playButton.click();
            break;
          case 'ArrowLeft':
            e.preventDefault();
            elements.prevButton.click();
            break;
          case 'ArrowRight':
            e.preventDefault();
            elements.nextButton.click();
            break;
        }
      });
      
    // Listen for the timeupdate of the song
    currSong.addEventListener("timeupdate", () => {
        console.log(currSong.currentTime, currSong.duration)
        document.querySelector(".song-time").innerHTML =
            `${formatSecondsToTime(currSong.currentTime)} / ${formatSecondsToTime(currSong.duration)}`
        document.querySelector(".circle").style.left = (currSong.currentTime/currSong.duration) * 100 + "%"
    })

    // Add an event listener to the seek bar
    document.querySelector(".seek-bar").addEventListener("click", (e) => {
        console.log(e.offsetX)
        const seekBar = document.querySelector(".seek-bar")

        document.querySelector(".circle").style.left = (e.offsetX/seekBar.offsetWidth) * 100 + "%"
        currSong.currentTime = (e.offsetX/seekBar.offsetWidth) * currSong.duration
    })
}

main();