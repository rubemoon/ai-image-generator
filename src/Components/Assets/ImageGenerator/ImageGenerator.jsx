import React, {useRef, useState} from 'react'
import './ImageGenerator.css'
import default_image from '../default_ai_image.png'

const ImageGenerator = () => {
  const [image_url, setImage_url] = useState("/");

  const imageGenerator = async () => {
    if (inputRef.current.value === "") {
      return 0;
    }
    const response = await fetch(
      "curl https://api.openai.com/v1/images/generations", {
      method: "POST",
      Headers: {
        "content-Type": "application/json",
        Authorization:
          "authorization of openai",
        "User-Agent": "chrome"
      },
      body: JSON.stringify({
        prompt: `${inputRef.current.value}`,
        n: 1,
        size: "512x512",
      }),
    }
    );
    let data = await response.json();
    console.log(data);
    let data_array = data.data;
    setImage_url(data_array[0].url)
  }


  let inputRef = useRef(null);
  return (
      <div className='ai-image-generator'>
          <div className='header'>AI image <span>generator</span></div>
          <div className='img-loading'>
              <div className='image'><img src={image_url==="/"?default_image:image_url} alt="" /> </div>
      </div>
      <div className='search-box'>
        <input type="text" ref={inputRef} className='search-input' placeholder='Describe what you want to see' />
        <div className="generate-btn" onClick={()=>{imageGenerator()}}>Generate</div>
      </div>
    </div>
  )
}

export default ImageGenerator