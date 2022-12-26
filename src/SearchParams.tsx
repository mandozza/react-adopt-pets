import { useContext, useState, useDeferredValue, useMemo, useTransition } from "react";
import { useQuery } from "@tanstack/react-query";
import { Animal } from "./APIResponsesTypes";
import AdoptedPetContext from "./AdoptedPetContext";
import fetchSearch from "./fetchSearch";
import useBreedList from "./useBreedList";
import Results from "./Results";
const ANIMALS: Animal[] = ["bird", "cat", "dog", "rabbit", "reptile"];


const SearchParams = () => {
  const [adoptedPet] = useContext(AdoptedPetContext);
  // State.
  const [requestParams, setRequestParams] = useState({
    location: "",
    animal: "" as Animal,
    breed: "",
  });
  const [animal, setAnimal] = useState("" as Animal);
  const [breeds] = useBreedList(animal);
  const[isPending, startTransition] = useTransition();

  const results = useQuery(["search", requestParams], fetchSearch);
  const pets = results?.data?.pets ?? [];

  const deferredPets = useDeferredValue(pets);
  const renderedPets = useMemo(
    () => <Results pets={deferredPets} />,
    [deferredPets]
  );


  return (
    <div className="my-0 mx-auto w-11/12">
      <form
        className="p-10 mb-10 rounded-lg bg-gray-200 shadow-lg flex flex-col justify-center items-center"
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          const obj = {
            animal: formData.get("animal")?.toString() as Animal ?? "" as Animal,
            breed: formData.get("breed")?.toString() ?? "",
            location: formData.get("location")?.toString() ?? "",
          };
          startTransition(() => setRequestParams(obj));
        }}
      >
        {adoptedPet ? (
          <div className="pet image-container">
            <img src={adoptedPet.images[0]} alt={adoptedPet.name} />
          </div>
        ) : null}
        <label htmlFor="location">
          Location
          <input
            type="text"
            id="location"
            name="location"
            className="search-input"
            placeholder="Location"
          />
        </label>
        <label htmlFor="animal">
          Animal
          <select
            id="animal"
            name="animal"
            className="search-input"
            onChange={(e) => {
              setAnimal(e.target.value as Animal);
            }}
            onBlur={(e) => {
              setAnimal(e.target.value as Animal);
            }}
          >
            <option />
            {ANIMALS.map((animal) => (
              <option key={animal} value={animal}>
                {animal}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="breed">
          Breed
          <select
            disabled={!breeds.length}
            id="breed"
            name="breed"
            className="search-input grayed-out-disabled"
          >
            <option />
            {breeds.map((breed) => (
              <option key={breed} value={breed}>
                {breed}
              </option>
            ))}
          </select>
        </label>
      {
        isPending ? (
          <div className="mini loading-pane">
            <h2 className="loader">🌀</h2>
          </div>
        ) : (
              <button
                className="
                rounded
                px-6
                py-2
                text-white
                hover:opacity-50
                border-none
                bg-orange-500
                "
              >Submit</button>
        )
      }
      </form>
      { renderedPets }
    </div>
  );
};

export default SearchParams;
