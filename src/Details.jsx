import { useState } from "react";
import { useDispatch } from "react-redux";
import { adopt } from "./adoptedPetSlice";
import { useGetPetQuery } from "./petApiService";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "./Modal";
import Carousel from "./Carousel";
import ErrorBoundary from "./ErrorBoundary";

const Details = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, data: pet } = useGetPetQuery(id);
  const [showModal, setShowModal] = useState(false);
  const { id } = useParams();


  if (isLoading) {
    return (
      <div className="loading-pane">
        <h2 className="loader">🌀</h2>
      </div>
    );
  }

  //const pet = results.data.pets[0];
  const { animal, breed, city, state, description, name } = pet;

  return (
    <div className="details">
      <Carousel images={pet.images} />
      <div>
        <h1>{name}</h1>
        <h2>{`${animal} — ${breed} — ${city}, ${state}`}</h2>
        <button onClick={() => setShowModal(true)}>Adopt {name}</button>
        <p>{description}</p>
        {showModal ? (
          <Modal>
            <div>
              <h1>Would you like to adopt {pet.name}?</h1>
              <div className="buttons">
                <button
                  onClick={() => {
                    dispatch(adopt(pet));
                    navigate("/");
                  }}
                >
                  Yes
                </button>
                <button onClick={() => setShowModal(false)}>No</button>
              </div>
            </div>
          </Modal>
        ) : null}
      </div>
    </div>
  );
}

export default function DetailsErrorBoundary(props) {
  return (
    <ErrorBoundary>
      <Details {...props} />
    </ErrorBoundary>
  );
}
