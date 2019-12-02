import React, { useRef } from 'react';
import { connect } from 'react-redux';
import { actionCreators } from '../reduxStore';

import './Player.css';

let playTimeInterval;

function Player({ startPlay, stopPlay, audio, setPlayTime }) {
  const audioRefContainer = useRef(null);

  function onPlay() {
    startPlay();
    playTimeInterval = setInterval(() => {
      setPlayTime(Math.floor(audioRefContainer.current.currentTime));
    }, 1000);
  }

  function onPause() {
    stopPlay();
    clearInterval(playTimeInterval);
  }

  return (
    <>
      <audio
        ref={audioRefContainer}
        id="wavSource"
        className="audio-player"
        onPlay={onPlay}
        onPause={onPause}
        controls
      >
        <source id="audio-source" src={audio} type="audio/webm;codecs=opus" />
      </audio>
    </>
  );
}

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({
  startPlay: () => dispatch(actionCreators.startPlay()),
  stopPlay: () => dispatch(actionCreators.stopPlay()),
  setPlayTime: currentTime => dispatch(actionCreators.setPlayTime(currentTime)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Player);
