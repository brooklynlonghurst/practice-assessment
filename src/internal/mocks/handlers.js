/* DO NOT MODIFY THIS FILE */
import { rest } from "msw";
import { v4 as uuidv4 } from "uuid";
import { FORCE_ERROR_STORAGE_KEY } from "../Controls";

const data = [
  { id: uuidv4(), name: "Pikachu" },
  { id: uuidv4(), name: "Charmander" },
  { id: uuidv4(), name: "Squirtle" },
  { id: uuidv4(), name: "Bulbasaur" },
];

const DELAY_MS = 1500;

const delay = () => new Promise((resolve) => setTimeout(resolve, DELAY_MS));

export const handlers = [
  rest.get("/pokemon", async (_, res, ctx) => {
    await delay();
    const forceError = Boolean(
      window.localStorage.getItem(FORCE_ERROR_STORAGE_KEY)
    );
    if (forceError) {
      return res(ctx.status(500));
    }
    return res(ctx.json(data));
  }),
  rest.post("/pokemon", async (req, res, ctx) => {
    const { name } = await req.json();

    const newItem = {
      id: uuidv4(),
      name,
    };

    data.push(newItem);

    return res(ctx.json(data));
  }),
  rest.delete("/pokemon/:id", async (req, res, ctx) => {
    const { id } = req.params;
    const indexToRemove = data.findIndex((item) => item.id === id);
    if (indexToRemove !== -1) {
      data.splice(indexToRemove, 1);
    }

    return res(ctx.json(data));
  }),
];
