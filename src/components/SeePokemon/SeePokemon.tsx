import { useEffect, useState } from "react";
// import PokeTable from "./PokeTable/PokeTable";

function SeePokemon() {
  const [generationData, setGenerationData] = useState([]);
  const [countGeneration, setCountGeneration] = useState(0);
  const [pokemonData, setPokemonData] = useState([]);

  const pokemonGeneration = [{ 0: "National" }];

  const minGeneration = 0;
  const maxGeneration = 9;

  const previousGeneration = () => {
    if (countGeneration > minGeneration) {
      setCountGeneration(countGeneration - 1);
    }
  };

  const NextGeneration = () => {
    if (countGeneration < maxGeneration) {
      setCountGeneration(countGeneration + 1);
    }
  };

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/generation`)
      .then((res) => res.json())
      .then((data) => {
        data.results.forEach((generation) => {
          const idGeneration = generation.url.split("/")[6];
          const nameGeneration = generation.name;
          pokemonGeneration.push({
            [idGeneration]: nameGeneration,
          });
        });
        setGenerationData(pokemonGeneration);

        // console.log(generationData)
      });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20`
        );
        const data = await res.json();

        const pokemonList = await Promise.all(
          data.results.map(async (pokemon) => {
            const idPokemon = pokemon.url.split("/")[6];

            const resPokemon = await fetch(
              `https://pokeapi.co/api/v2/pokemon/${idPokemon}`
            );
            const dataPokemon = await resPokemon.json();
            const namePokemon = dataPokemon.name;
            const spritePokemon = dataPokemon.sprites.front_default;

            const resSpecies = await fetch(
              `https://pokeapi.co/api/v2/pokemon-species/${idPokemon}`
            );
            const dataSpecies = await resSpecies.json();
            const genPokemon = dataSpecies.generation.url.split("/")[6];

            return {
              id: idPokemon,
              name: namePokemon,
              sprite: spritePokemon,
              generation: genPokemon,
            };
          })
        );

        setPokemonData(pokemonList);
        // console.log(pokemonData);
      } catch (error) {
        console.error("Error fetching Pokémon data:", error);
      }
    };

    fetchData();
  }, []);

  const currentGeneration = generationData[countGeneration];

  return (
    <div>
      <div>
        <button onClick={previousGeneration}>Left</button>

        <button onClick={NextGeneration}>Right</button>

        {currentGeneration ? (
          <h1>{Object.values(currentGeneration)}</h1>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <div>
        <div>
          {Object.values(pokemonData).map((data) => {
            return (
              <div key={data.id}>
                <h1>{data.id}</h1>
                <h2>{`Generation: ${data.generation}`}</h2>
                <h3>{data.name}</h3>
                <img src={data.sprite} alt="" />
              </div>
            );
          })}
          <h3>hello</h3>
        </div>
      </div>
    </div>
  );
}

export default SeePokemon;
