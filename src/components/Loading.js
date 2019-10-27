import React from 'react'
import loaderGif from '../icons/loader.gif';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 150,
    height: 150
}

export default (props) => {

    if (props.error) {
        // When the loader has errored
        return <div>Error! <button onClick={ props.retry }>Retry</button></div>;
      } else if (props.timedOut) {
        // When the loader has taken longer than the timeout
        return <div>Taking a long time... <button onClick={ props.retry }>Retry</button></div>;
      } /*else if (props.pastDelay) {
        // When the loader has taken longer than the delay
        return <div style={style}><img src={loaderGif} alt="loader"/></div>;
      }*/ else {
        // When the loader has just started
        return <div style={style}><img src={loaderGif} width="150" height="150" alt="loader"/></div>;
      }
}