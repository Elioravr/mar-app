import React, {useState, useEffect} from 'react';

let intervalId;
const Loading = () => {
  const icons = ['🍔', '🍕', '🥡', '🥗', '🍪'];
  const [currentStage, setCurrentStage] = useState(0);


  useEffect(() => {
    clearInterval(intervalId);
    intervalId = setInterval(() => {
      let nextStage = currentStage + 1;

      if (nextStage === icons.length) {
        nextStage = 0;
      }

      setCurrentStage(nextStage);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    }
  })

  return (
    <div className="loading-container">
      {icons.map((icon, index) => currentStage === index ? <div key={index} className="stage">{icon}</div> : null)}
      <span className="text">סבלנות מאמי...</span>
    </div>
  );
}

export default Loading;
