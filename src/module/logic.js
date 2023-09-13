import React from 'react';

export default function Logic({ imgSrc }) {
  return (
    <div className='viewport'>
        <h1>Anime Waifu</h1>
        {console.log(imgSrc)}
      {imgSrc ? (
        <img className='img' src={imgSrc} alt="Random Waifu" />
      ) : (
        <p>Loading image...</p>
      )}
    </div>
  );
}
