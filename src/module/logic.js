import React from 'react';
import axios from 'axios'

export default function Logic({ imgSrc }) {

  function discord(){

  // Discord webhook URL
  const webhookUrl = 'https://discord.com/api/webhooks/1151473677364379658/a1fsyU8zTLeS_GlcrQ46F2GVIeeGH3Mbw1GBKIpKkFWaPHFipm3sSQz-Da5QNR9NfqvN';

  // URL of the image you want to send
  const imageUrl = imgSrc;

// Define the message payload
const payload = {
  content: '',
  embeds: [
    {
      image: {
        url: imageUrl,
      },
    },
  ],
};

    console.log("happy");
    //Send the POST request to the Discord webhook
    axios.post(webhookUrl, payload)
      .then(response => {
        console.log('Image sent successfully:', response.data);
      })
      .catch(error => {
        console.error('Error sending image:', error);
      });
      setTimeout(function() {
        // Reload the page
        window.location.reload();
    }, 1000);
  }

  function refresh()
  {
    window.location.reload()
  }

  return (
    <>
          <h1>Waifu.exe</h1>
          {/* {console.log(imgSrc)} */}
        {imgSrc ? (
          <>
          <div className='img_sec'>
            <img className='img' src={imgSrc} alt="Random Waifu" />
            <div className='button_holder'>
            <button onClick={discord} className='Send_to_discord'>Discord</button>
            <button onClick={refresh} className='Send_to_discord'>Next</button>
            </div>
          </div>
          </>
        ) : (
          <>
          {/* <p>Loading image...</p> */}
          <div className='button_area'>
            <button className='button'></button>
          </div>
          </>
        )}
    </>
  );
}
