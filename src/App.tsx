import { useState, lazy, Suspense } from "react";
import { Pet } from "./APIResponsesTypes";
import { createRoot } from "react-dom/client";
import { Link, BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AdoptedPetContext from "./AdoptedPetContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
});

const Details = lazy(() => import("./Details"));
const SearchParams = lazy(() => import("./SearchParams"));

const App = () => {
  //passing the whole hook to the context provider adoptedPet and the setAdoptedPet function to the context provider.
  const adoptedPet = useState(null as Pet | null);

  return (
    <div
      className="p-0 m-0"
      style={{
        background: "url(http://pets-images.dev-apis.com/pets/wallpaperA.jpg)",
      }}
    >
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <Suspense
            fallback={
              <div className="loading-pane">
                <h2 className="loader">🌀</h2>
              </div>
            }
          >
            <AdoptedPetContext.Provider value={adoptedPet}>
              <header className="w-full mb-10 text-center p-7 bg-gradient-to-b from-yellow-400 via-orange-500 to-red-500">
                <Link
                  className="text-6xl text-white hover:text-gray-200"
                  to="/"
                >
                  Adopt Me!
                </Link>
              </header>
              <Routes>
                <Route path="/details/:id" element={<Details />} />
                <Route path="/" element={<SearchParams />} />
              </Routes>
            </AdoptedPetContext.Provider>
          </Suspense>
        </QueryClientProvider>
      </BrowserRouter>
    </div>
  );
};

const container = document.getElementById("root");
if (!container) {
  throw new Error("No container element found");
}
const root = createRoot(container);
root.render(<App />);
