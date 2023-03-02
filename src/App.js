import React, { useState } from 'react';
import { Configuration, OpenAIApi } from 'openai'


function App() {
  const [ content, setContent ] = useState('')
  const [ response, setResponse ] = useState('')

  const config = new Configuration({
    apiKey: process.env.REACT_APP_API_KEY
  })
  const openai = new OpenAIApi(config)
 
  const chat = async (event) => {
    if (event.key === 'Enter'){
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{role: "user", content: content}],
  
    });
    setResponse(completion.data.choices[0].message.content)
    setContent('')
  }
  }
  return (
    <div className=" bg-teal-300 h-screen flex flex-col items-center justify-center">
      <div className='search'>
      <input className='w-80 h-10 rounded-lg text-center' rows='5' id='searchBar' type='text' placeholder='Enter Prompt' value={content}
       onChange={event => setContent(event.target.value)} onKeyDown={chat} />
    </div>
    <button className="mt-5 w-36 h-7 border-white border-2  rounded-xl bg-teal-600 text-white hover:bg-teal-400" onClick={chat}>Chat!</button>
    {response.length ? 
    <div className='w-80 text-center mt-5 bg-white rounded-xl p-2 '>
      {response}
    </div>
    : null }
    </div>
  );
}

export default App;
