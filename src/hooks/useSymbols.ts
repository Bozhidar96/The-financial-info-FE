import { useEffect, useState } from "react";
import { ResponseData, RowData } from "../interfaces";
import { SYMBOLS, API_URL } from "../constants";
import axios from "axios";

export const getSymbolName = (code: string): string => {
  const symbol = SYMBOLS.find((symbol) => symbol.code === code);
  return symbol ? symbol.name : "";
};

export const useSymbols = (): RowData[] => {
  const [rows, setRows] = useState<RowData[]>([]);

  useEffect(() => {
    const getRows = async () => {
      try {
        const response = await Promise.all(
          SYMBOLS.map((symbol) =>
            axios.get(`${API_URL}?symbols=${symbol.code}`).then((response) => ({
              ...response.data,
              name: symbol.name,
            }))
          )
        );

        const data = response.map((response: ResponseData) => {
          return {
            symbol: response.data.items[0].basic.symbol,
            percentageChanges:
              Math.round(
                (response.data.items[0].quote.change1DayPercent +
                  Number.EPSILON) *
                  100
              ) / 100,
          };
        });

        const rows: RowData[] = data.map((data) => ({
          symbol: data.symbol,
          name: getSymbolName(data.symbol),
          percentageChanges: data.percentageChanges,
        }));
        setRows(rows);
      } catch (error: any) {
        console.error(error);
      }
    };

    getRows();
  }, []);

  return rows;
};

export default useSymbols;
