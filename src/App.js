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
  const chatButton = async () => {
    
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{role: "user", content: content}],
  
    });
    setResponse(completion.data.choices[0].message.content)
    setContent('')
  }

  return (
    <div className=" bg-zinc-400 min-h-screen flex flex-col items-center justify-center">
      <div className='search'>
      <input className='w-80 h-10 rounded-lg border-zinc-800 border-2' rows='5' id='searchBar' type='text' placeholder='type here...' value={content}
       onChange={event => setContent(event.target.value)} onKeyDown={chat} />
    </div>
    <button className="mt-5 w-36 h-7 border-zinc-800 border-2 rounded-xl bg-blue-500 hover:bg-zinc-200" onClick={chatButton}>Chat</button>
    {response.length ? 
    <div className='w-80 text-center mt-5 bg-zinc-200 border-zinc-800 border-2 rounded-xl p-2 '>
      {response}
    </div>
    : null }
    </div>
  );
}

export default App;
