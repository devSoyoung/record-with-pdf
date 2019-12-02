import React from 'react';
import { connect } from 'react-redux';
import { actionCreators } from "../reduxStore";

let playTimeInterval;

function Player({ startPlay, stopPlay, audio, increaseTime, currentPlayTime }) {
  function onPlay() {
    startPlay();
    playTimeInterval = setInterval(() => {
      increaseTime();
    }, 1000);
  }

  function onPause() {
    stopPlay();
    clearInterval(playTimeInterval);
  }

  return (
    <>
      <audio
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
  isPlaying: state.isPlaying,
  currentPlayTime: state.currentPlayTime,
});

const mapDispatchToProps = dispatch => ({
  startPlay: () => dispatch(actionCreators.startPlay()),
  stopPlay: () => dispatch(actionCreators.stopPlay()),
  increaseTime: () => dispatch(actionCreators.increaseTime()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Player);
