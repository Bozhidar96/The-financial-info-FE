import axios from "axios";
import { API_URL, SYMBOLS } from "../constants";
import { ResponseData, Rows } from "../interfaces";

export const getSymbols = async (): Promise<Rows["rows"]> => {
  try {
    const response = await Promise.all(
      SYMBOLS.map((symbol: string) =>
        axios
          .get(`${API_URL}?symbols=${symbol}`)
          .then((response) => response.data)
      )
    );

    const data = response.map((response: ResponseData) => {
      return {
        symbol: response.data.items[0].basic.symbol,
        percentageValue:
          Math.round(
            (response.data.items[0].quote.change1DayPercent + Number.EPSILON) *
              100
          ) / 100,
      };
    });

    const finalRows: Rows = {
      rows: data.map((data) => ({
        symbol: data.symbol,
        percentageChanges: data.percentageValue,
      })),
    };

    return finalRows.rows;
  } catch (error: any) {
    console.error(error);
    return [];
  }
};
