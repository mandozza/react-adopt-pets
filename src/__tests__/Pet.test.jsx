import { expect, test } from "vitest";
import { render } from "@testing-library/react";
import { StaticRouter } from "react-router-dom/server";
import Pet from "../Pet";

test("displays a default thumbnail", async () => {
  const pet = render(
    <StaticRouter>
      <Pet />
    </StaticRouter>
  );

  const petThumbnail = await pet.findByTestId("thumbnail");
  expect(petThumbnail.src).toContain("none.jpg");
  pet.unmount();
});

test("displays a non-default thumbnail", async () => {
  const pet = render(
    <StaticRouter>
      <Pet images={["1.jpg", "2.jpg", "3.jpg"]} />
    </StaticRouter>
  );

  const petThumbnail = await pet.findByTestId("thumbnail");
  expect(petThumbnail.src).toContain("1.jpg");
  pet.unmount();
});

test ("displays the pet name", async () => {
  const pet = render(
    <StaticRouter>
      <Pet name="Luna" />
    </StaticRouter>
  );

  const petName = await pet.findByTestId("petName");
  expect(petName.textContent).toBe("Luna");
  pet.unmount();
});

test ("displays the pet details", async () => {
  const pet = render(
    <StaticRouter>
      <Pet animal="Dog" breed="Havanese" location="Seattle, WA" />
    </StaticRouter>
  );

  const petDetails = await pet.findByTestId("petDetails");
  expect(petDetails.textContent).toBe("Dog — Havanese — Seattle, WA");
  pet.unmount();
});
