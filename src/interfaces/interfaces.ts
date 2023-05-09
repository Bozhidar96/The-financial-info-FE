export interface RowData {
  symbol: string;
  name: string;
  percentageChanges: number;
}

export interface Rows {
  rows: RowData[];
}

export interface ResponseData {
  data: {
    items: {
      basic: {
        symbol: string;
      };
      quote: {
        change1DayPercent: number;
      };
    }[];
  };
}
