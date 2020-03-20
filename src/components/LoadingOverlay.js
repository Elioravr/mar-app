import React from 'react';
import Loading from './Loading';

const LoadingOverlay = ({isVisible}) => {
  return (
    <div className={`loading-overlay ${isVisible ? 'visible' : ''}`}>
      <div className="box">
        <Loading />
      </div>
    </div>
  );
}

export default LoadingOverlay;
