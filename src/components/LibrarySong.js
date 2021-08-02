import React from 'react';

const LibrarySong = ({audioRef, song, songs, setSongs, setCurrentSong, id, isPlaying, setIsPlaying}) => {
	const songSelectorHandler = (e) => {
      setCurrentSong(song)

      //Add Active state
      const newSongs = songs.map((song) => {
      	if(song.id === id){
      		return {
      			...song, active: true}
      		}else{
      			return {
      				...song, active: false
      			}
      		}
      	});
      setSongs(newSongs);
      
        //Play audio
     if(isPlaying){audioRef.current.play()} 
};
	return(
  <div onClick={songSelectorHandler} className={`library-songs ${song.active ? "selected" : ""}`}>
      <img alt={song.name} src={song.cover} alt=""></img>
      <div class="description-songs">
        <h2>{song.name}</h2>
        <h3>{song.artist}</h3>
      </div>
  </div>
	)
}

export default LibrarySong;