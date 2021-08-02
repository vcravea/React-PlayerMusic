import React from 'react';
import LibrarySong from './LibrarySong';

const Library = ({songs, setCurrentSong, setSongs, audioRef, isPlaying, setIsPlaying, libraryMode}) => {
	return(
  <div className={`library ${libraryMode ? "active-library" : ""} `}>
     <h2>Library</h2>
     <div>
     {songs.map((song) => (
      	<LibrarySong 
      	song  = {song} 
      	songs= {songs}
      	setCurrentSong = {setCurrentSong}
      	id={song.id}
      	key={song.id}
      	audioRef={audioRef}
      	isPlaying = {isPlaying}
      	setIsPlaying = {setIsPlaying}
      	setSongs = {setSongs}
      	/>
     ))}
     </div>
  </div>
	)
}

export default Library;