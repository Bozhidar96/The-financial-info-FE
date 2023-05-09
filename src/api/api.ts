import axios from "axios";
import { API_URL, SYMBOLS } from "../constants";
import { ResponseData } from "../interfaces";

export const getSymbols = async (): Promise<ResponseData[]> => {
  return await Promise.all(
    SYMBOLS.map((symbol) =>
      axios.get(`${API_URL}?symbols=${symbol.code}`).then((response) => ({
        ...response.data,
        name: symbol.name,
      }))
    )
  );
};
