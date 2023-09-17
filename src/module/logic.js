import axios from 'axios'
import { useState, useEffect } from 'react';


export default function Logic() {


  if (!localStorage.getItem('codeHasRun')) {
    // Run your code here
    localStorage.setItem('key', 'https://api.waifu.pics/sfw/waifu');
    // Set the flag in localStorage to indicate that the code has run
    localStorage.setItem('codeHasRun', 'true');
  }

  const switch_url = localStorage.getItem('key');


  async function toggle(){
    localStorage.setItem('key', "https://api.waifu.pics/nsfw/waifu");
    if (switch_url === 'https://api.waifu.pics/sfw/waifu') {
      localStorage.setItem('key', "https://api.waifu.pics/nsfw/waifu");
    } else {
      localStorage.setItem('key', "https://api.waifu.pics/sfw/waifu");
    }
}

/////////////////////////////////////FETCHING AND STORING DATA
  async function getdata() {
    try {
      const response = await fetch(switch_url);
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data_json = await response.json(); // Await the JSON parsing
      return data_json; // Return the parsed data
    } catch (error) {
      console.error('Fetch error:', error);
      return null; // Return null in case of an error
    }
  }
  const [data, setData] = useState(null);

  useEffect(() => {
    getdata().then((fetchedData) => {
      if (fetchedData) {
        setData(fetchedData);
      }
    });
  // eslint-disable-next-line
  }, []);


  //////////////////////////////////////////////////BUTTON COLOR INCDICATOR
  const [buttonBgColor, setButtonBgColor] = useState('');

  useEffect(() => {
    // Check if switch_url is equal to the specific string
    if (switch_url === 'https://api.waifu.pics/nsfw/waifu') {
      // If it matches, set the button background color to red
      setButtonBgColor('red');
    } else {
      // Otherwise, set the button background color to its default color
      setButtonBgColor('');
    }
  }, [switch_url]);


/////////////////////////////////////DISCORD WEBHOOK
  function discord(){
  const webhookUrl = 'https://discord.com/api/webhooks/1151473677364379658/a1fsyU8zTLeS_GlcrQ46F2GVIeeGH3Mbw1GBKIpKkFWaPHFipm3sSQz-Da5QNR9NfqvN';
  const payload = {
    content: '',
    embeds: [
      {
        image: {
          url: data.url,
        },
      },
    ],
  };
  axios.post(webhookUrl, payload).then(response => {
        console.log('Image sent successfully:', response.data);
      })
      .catch(error => {
        console.error('Error sending image:', error);
      });
      setTimeout(function() {
        // Reload the page
        window.location.reload();
    }, 800);
  }

/////////////////////////////////////RELOAD WEBPAGE
  function refresh()
  {
    window.location.reload()
  }

  return (
    <>
          {/* {console.log(imgSrc)} */}
        {data ? (
          <>
          <div className='img_sec'>
            <img loading='lazy' src={data.url} alt="Random Waifu" />
            <div className='button_holder'>
              <button onClick={discord} className='Send_to_discord'>Discord</button>
              <button onClick={refresh} className='Send_to_discord'>Next</button>
              <button onClick={toggle} id="myButton" style={{ backgroundColor: buttonBgColor }} className='Send_to_discord'>NSFW/SFW</button>
            </div>
          </div>
          </>
        ) : (
          <>
          {/* <p>Loading image...</p> */}
          <div className='button_area'>
          <h1>Waifu.exe</h1>
            <button className='button'></button>
          </div>
          </>
        )}
    </>
  );
}
