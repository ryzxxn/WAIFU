import React from 'react';

export default function Logic({ imgSrc }) {
  return (
    <>
          <h1>Waifu.exe</h1>
          {/* {console.log(imgSrc)} */}
        {imgSrc ? (
          <img className='img' src={imgSrc} alt="Random Waifu" />
        ) : (
          <>
          {/* <p>Loading image...</p> */}
          <div className='button_area'>
            <button></button>
          </div>
          </>
        )}
    </>
  );
}
