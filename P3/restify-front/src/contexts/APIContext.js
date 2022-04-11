import { createContext } from "react";

export const APIContext = createContext({
    players: [],
    setPlayers: () => {},
})