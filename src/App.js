/* TODO: implement code in this file */
import "./App.css";
import React, {useState, useEffect} from "react";

function App() {
  const [inputText, setInputText] = useState('') 
  const [pokemonList, setPokemonList] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  //State is to manage & store data within a component. useState allows to add state to a functional component. 
  // inputText and setInputText is initially set to an empty string because it is for the input field of adding new pokemon names (there would be no need to have a set name in there at the beginning). 
  // pokemonList and setPokemonList is set to an empty array because this is where all the names that are from our data, like the orginial data that was first sent over from our GET request, will reside, along with the new names that we add. 
  //loading and setLoading is the <p> that shows 'Loading...' before the GET request of the data is rendered on screen. It is initially set to false because we do not want our loading p tag to show constantly. I set it to true at the beginning of each function, specfically the GET request. 
  //error and setError is null until the .catch of each fetch call because I don't it rendered all the time. I'm not sure why yet but when we click the force error true button, then it will show. 

  useEffect(() => {
    fetchPokemon()
  }, [])
  //useEffect is a react hook that affects outside the component, like fetching data from an API, updating the DOM. In this instance, useEffect is mounting the initial list of pokemon that I'm getting from the GET request that is in the fetchPokemon function.

  const fetchPokemon = () => {
    setLoading(true)
    setError(null)
    
    fetch(`/pokemon`)
      .then((res) => res.json())
      .then((data) => {
        setPokemonList(data)
        setLoading(false)
      })
      .catch((error) => {
        setError('Failed to get Pokemon')
        setLoading(false)
      })
  } 
  //fetchPokemon is the GET request where it only takes in the url and no object body. What this function is doing is getting the initial pokemon names that are on the fake API. At the top, I'm setting 'setLoading' to the boolean of true to allow the 'Loading...' <p> to be rendered before the names mount. We do not need {error} to show so it is set to null. The first .then is to receive the response and make sure it is in JSON. The second .then is retrieving the data and sending it to setPokemonList. The reason I'm using arrow functions within the .then and .catch is to allow correct handling of the data and error by updating the state variables pokemonList, loading, and error through their respective functions. With arrow functions they are more concise and help maintain the context of what is happening inside them. 

  const handleAddPokemon = (event) => {
    event.preventDefault()
    setLoading(true)
    setError(null)

    fetch(`/pokemon`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: inputText
      })
    }).then((res) => res.json())
      .then((data) => {
        setPokemonList(data)
        setLoading(false)
        setInputText('')
      })
      .catch((error) => {
        setError('Failed to post Pokemon')
        setLoading(false)
      })
  }
//handleAddPokemon is my fetch POST request. With POST request while using fetch, it takes in two arguments, the url and then an object. The object includes declaring what type of method it is, the headers, which is explaining that I want to use JSON, the body and again setting that to JSON.stringify first. Inside the body is where I declare a variable 'name' to what is placed in the inputText (so whatever is typed in the input field is going to be posted). The .then and .catch are similiar to the GET request where we define the response will be in JSON and sending the data to setPokemonList, making sure the Loading p is not apparent and clearing out the input field by setting the setInputText to an empty string again. 

  const handleDeletePokemon = (pokemonId) => {
    setLoading(true)
    setError(null)

    fetch(`/pokemon/${pokemonId}`, {
      method: 'DELETE'
    }).then(() => {
      setPokemonList((prevList) => 
        prevList.filter((pokemon) => pokemon.id !== pokemonId)  
      )
      setLoading(false)
    }).catch((error) => {
      setError('Failed to delete Pokemon')
      setLoading(false)
    })
  }
//handleDeletePokemon is the fetch DELETE request. It takes in pokemonId as a parameter because I and the computer will need to know which name to delete by it's ID. The initial setLoading and setError is consistent with the other functions at the beginning being set to (true) and (null). Inside the DELETE request, it takes in the url and specifically adding a template literal to call on the id of the pokemon. The object here only declares what method is being used, 'DELETE'. The .then for the delete request is a little different. Inside the .then block, the setPokemonList function is called to update the pokemonList state. It takes a callback function that receives the previous list (prevList) as an argument. The callback function filters the previous list using the filter method, which returns a new array excluding the Pokémon with the specified pokemonId. This effectively removes the deleted Pokémon from the list.The filtered list is then passed as the new value to setPokemonList, updating the state with the modified list. 
  return (
  <div className="pokemon-form">
    <h1>Favorite Pokemon</h1>
    <input 
      onChange={(event) => setInputText(event.target.value)}
      value={inputText}
      placeholder="New pokemon" 
    />
    <button onClick={handleAddPokemon}>Add</button>

    {loading ? (
      <p>Loading...</p>
    ): (
      <>
        {error && <p>{error}</p>}
      <ul>
        {pokemonList.map((pokemon) => (
        <li key={pokemon.id}>
          {pokemon.name}{' '}
          <button onClick={() => handleDeletePokemon(pokemon.id)}>X</button>
        </li>
        ))}
      </ul>
      </>
    )}
  </div>
  )
}
//Here is my return! What is all going to be sent to the browser. First there is the title, input field, add button. The input field holds the onChange arrow function that changes the state of inputText with whatever values are typed in by setInputText(event.target.value). The value declared is inputText. The Add button houses the onClick handleAddPokemon function. Next there is a terinary statement where if {loading} is set to true then display the <p>Loading...</p> else display either the error and it's statement that is defined in the .catch of each function. And the unordered list of the pokemon names. The pokemonList.map is to iterate over each element in the pokemonList array. For each `pokemon` object in the pokemonList array, the .map function executes the callback function defined with `(pokemon) => ...`.The key prop is set to the pokemon.id value, which helps React efficiently update and reconcile the list when changes occur. Inside the <li> element, the pokemon.name property is displayed, representing the name of the Pokémon. A space character ({' '}) is added after the Pokémon name for visual separation. When the delete button is clicked, the corresponding handleDeletePokemon function is invoked with the Pokémon ID, allowing the Pokémon to be deleted from the list.

export default App;
