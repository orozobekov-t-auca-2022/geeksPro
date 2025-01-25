import { useState } from 'react'
import './App.css'
import { useEffect } from 'react'

function App() {
  const [data, setData] = useState([])
  const [imageLink, setImageLink] = useState([])

  useEffect(() => {
    async function fetchData() {
      setData(await fetch('https://pokeapi.co/api/v2/pokemon/').then(res => res.json()).then(data => data.results));
    };
    setData(fetchData());
  }, []);
  
  useEffect(() => {
    async function fetchImages() {
      if (!data.length) return;
      const images = [];
      
      for (const item of data) {
        const response = await fetch(item.url).then(res => res.json());
        images.push(response['sprites']['front_default']);
      }
      
      setImageLink(images);
    }
    fetchImages();
  }, [data])

  return (
    <div className='container'>
      {(Array.isArray(data) && data.length > 0) ? 
        (data.map((item, index) => {
          return <div className='pokemon_card' key={index}>
            <img src={imageLink[index]} alt="" />
            <h1>{item['name']}</h1>
          </div>
      })) : (<h1>Loading...</h1>)}
    </div>
  )
}

export default App
