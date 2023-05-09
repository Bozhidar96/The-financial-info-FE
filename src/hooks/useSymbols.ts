import { useEffect, useState } from "react";
import { ResponseData, RowData } from "../interfaces";
import { getSymbols } from "../api";
import { getSymbolName } from "../util";

export const useSymbols = (): RowData[] => {
  const [rows, setRows] = useState<RowData[]>([]);

  useEffect(() => {
    const getRows = async () => {
      try {
        const response = await getSymbols();

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

        const rows: RowData[] = data.map(({ symbol, percentageChanges }) => ({
          name: getSymbolName(symbol),
          percentageChanges: percentageChanges,
        }));
        setRows(rows);
      } catch (error: any) {
        console.error(error);
      }
    };

    getRows();

    /* This update UI on every 5 second with the new changes fetched from the API
    const intervalId = setInterval(() => {
      getRows()
    }, 5000);

    return () => clearInterval(intervalId);*/
  }, []);

  return rows;
};
export default useSymbols;
