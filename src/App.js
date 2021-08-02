import React, {useState, useRef} from 'react';

//Adding styles
import "./styles/app.scss";
//Adding components
import Nav from "./components/Nav"
import Player from "./components/Player";
import Song from "./components/Song";
import Library from "./components/Library";
import Data from "./data";

function App() {
  const [songs, setSongs] = useState(Data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [libraryMode, setLibraryMode] = useState(false);
  //Ref
 const audioRef = useRef(null);
  return (
    <div className="App">
     <Nav libraryMode= {libraryMode} setLibraryMode = {setLibraryMode} />   
      <Song currentSong = {currentSong}/>
      <Player 
          setIsPlaying = {setIsPlaying}
          isPlaying= {isPlaying} 
          songs = {songs}
          setSongs = {setSongs}
          currentSong = {currentSong} 
          setCurrentSong = {setCurrentSong}
          audioRef = {audioRef}/>
      <Library
          songs ={songs} 
          setSongs = {setSongs}
          setCurrentSong={setCurrentSong}
          audioRef = {audioRef}
          isPlaying = {isPlaying}
          setIsPlaying = {setIsPlaying}
          libraryMode = {libraryMode}
          />
    </div>
  );
}

export default App;
