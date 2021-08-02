import React, {useRef, useState, useEffect} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlay, faPause,  faAngleLeft, faAngleRight, faSpinner} from '@fortawesome/free-solid-svg-icons';

const Player = ({audioRef, songs, setSongs, currentSong,setCurrentSong, isPlaying, setIsPlaying}) => {

//UseEffect
useEffect (() => {
	 //Add Active state
      const newSongs = songs.map((song) => {
      	if(song.id === currentSong.id){
      		return {
      			...song, active: true}
      		}else{
      			return {
      		  ...song, active: false
      			}
      		}
      	});
      setSongs(newSongs);
}, [currentSong])

//Events handlers
const playSongHandler = () => {
  if (isPlaying) {
  	audioRef.current.pause();
    setIsPlaying(!isPlaying)
 }else{
 	audioRef.current.play();
 	setIsPlaying(!isPlaying)
  }
  };

  //State
  const [songInfo, setSongInfo] = useState({
  	currentTime: "0",
  	duration: null,
    animatedPorcentage:0,
  })

  const getTime = (time) => {
  	return (
       Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
  	)
  }

    const timeUpdateHandler = (e) => {
    const duration = e.target.duration;
    const current = e.target.currentTime;
    //calculate percentage
    const roundedCurrent = Math.round(current)
    const roundedDuration = Math.round(duration)
    const animation = Math.round( roundedCurrent / roundedDuration * 100)

    setSongInfo({...songInfo, duration , currentTime: current, animatedPorcentage: animation})
  }

  const dragInputHandler = (e) => {
  	audioRef.current.currentTime = e.target.value;
  	setSongInfo({...songInfo, currentTime: e.target.value})
  }

  const skipTrackHandler = async (direction) => {
   let currentIndex  = songs.findIndex((song) => song.id === currentSong.id)
    //Forward BAck
    if (direction === "skip-forward") {
       await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
         //Play audio
        if(isPlaying){audioRef.current.play()} 
    }
    if (direction === "skip-back") {
      if ((currentIndex - 1) % songs.length === -1) {
          await setCurrentSong(songs[songs.length - 1]); 
           //Play audio
        if(isPlaying){audioRef.current.play()}     
        return;
      }
      if(isPlaying){audioRef.current.play()} 
        await setCurrentSong(songs[(currentIndex - 1) % songs.length]);     
    }  
  };

   const trackAnim = {
    transform: `translateX(${songInfo.animatedPorcentage}%)`
   }

   const colorSpinner = {
    color: `${currentSong.color[0]}`
   }
 	return(
	<div>
	   <div className="player">
	      <div className="time-control">
	        <p>{getTime(songInfo.currentTime)}</p>
          <div className="track" style={{background: `linear-gradient(to right,${currentSong.color[0]},${currentSong.color[1]}) `}}>
	        <input 
	        onChange={dragInputHandler} 
	        value={songInfo.currentTime} 
	        min={0} 
	        max={songInfo.duration || 0} 
	        type="range" />
          <div className="animate-track" style={trackAnim}></div>
          </div>
          
	        <p>{songInfo.duration ? getTime(songInfo.duration) : <FontAwesomeIcon style={colorSpinner} className="spinner" size="2x" icon ={faSpinner} /> }</p>
	     </div>
		   <div className="play-control">	  	    
		     <p><FontAwesomeIcon onClick={() => skipTrackHandler("skip-back")} className="skip-back" size="2x" icon ={faAngleLeft} /></p>
		     <FontAwesomeIcon onClick={playSongHandler} className="play" size="2x" icon={isPlaying ? faPause : faPlay} />
		     <FontAwesomeIcon onClick={() => skipTrackHandler("skip-forward")} className="skip-forward" size="2x" icon ={faAngleRight} />
		   </div>
		   <audio autoPlay="true" onLoadedMetadata={timeUpdateHandler} onTimeUpdate={timeUpdateHandler} ref={audioRef} src={currentSong.audio}></audio>
	  </div>
	</div>
	)
}

export default Player;
