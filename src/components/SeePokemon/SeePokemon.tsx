import { useEffect, useState } from "react";
// import PokeTable from "./PokeTable/PokeTable";

function SeePokemon() {

  const [generationData,setGenerationData] = useState([])
  const [countGeneration,setCountGeneration] = useState(0)

  const minGeneration = 0;
  const maxGeneration = 9;

  const previousGeneration = ()=>{
    if (countGeneration > minGeneration){
      setCountGeneration(countGeneration-1)
    }
  }

  const NextGeneration = ()=>{
    if (countGeneration < maxGeneration){
      setCountGeneration(countGeneration+1)
    }
  }



  const pokemonGeneration=[
    {0:'National'}
  ]

  useEffect(()=>{
    fetch(`https://pokeapi.co/api/v2/generation`)
    .then((res)=>res.json())
    .then((data)=>{
      
     data.results.forEach((generation)=>{
        const idGeneration=generation.url.split('/')[6];
        const nameGeneration = generation.name;
        pokemonGeneration.push({
          [idGeneration]:nameGeneration,
        })
      })
      setGenerationData(pokemonGeneration)
  
      console.log(generationData)
    })

  },[])

  const currentGeneration=generationData[countGeneration];
  console.log(currentGeneration)

  return (
    <div>
      <div>
        <button onClick={previousGeneration}>Left</button>
        <button onClick={NextGeneration}>Right</button>
        
        {currentGeneration ?(
          <h1>{Object.values(currentGeneration)}</h1>
        ):(
          <p>Loading...</p>
        )}
        
       
      </div>

      <div>
        <div></div>
      </div>
    </div>
  );
}

export default SeePokemon;
