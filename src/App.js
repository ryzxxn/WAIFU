import React, { useEffect, useState } from 'react';
import './style.css';
import Logic from './module/logic';
import axios from 'axios'

export default function App() {

  // Use the fetch API to make a GET request to the URL
  async function getdata() {
    try {
      const response = await fetch('https://api.waifu.pics/sfw/pat');

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = response.json();
      return data;
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
  }, []);

  // Discord webhook URL
  const webhookUrl = 'https://discord.com/api/webhooks/1151473677364379658/a1fsyU8zTLeS_GlcrQ46F2GVIeeGH3Mbw1GBKIpKkFWaPHFipm3sSQz-Da5QNR9NfqvN';

  // URL of the image you want to send
  const imageUrl = data?.url;

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

// Send the POST request to the Discord webhook
axios.post(webhookUrl, payload)
  .then(response => {
    console.log('Image sent successfully:', response.data);
  })
  .catch(error => {
    console.error('Error sending image:', error);
  });

  return (
    <>
      <Logic imgSrc={data?.url} />
    </>
  );
}
