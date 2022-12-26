import { createContext } from "react";
import { Pet } from "./APIResponsesTypes";

const AdoptedPetContext = createContext<[Pet | null, (adoptedPet: Pet) => void]>([
  {
    id: 0,
    name: "Fido",
    animal: "dog",
    breed: "Mixed",
    city: "Seattle",
    state: "WA",
    description: "Fido is good dog",
    images: [],
  },
  () => {},
]);

export default AdoptedPetContext;
