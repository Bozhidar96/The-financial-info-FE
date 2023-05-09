import styled, { createGlobalStyle } from "styled-components";
import useSymbols from "./hooks/useSymbols";
import { RowData } from "./interfaces";
import { Header } from "./components/Header";
import { DaysPercantages } from "./components/DaysPercentages";

const GlobalStyle = createGlobalStyle`
  body {
    background: #fff1e5;
    font-family: sans-serif;
    font-size: 18px;
    padding: 20px;
  }
`;

const Wrapper = styled.div`
  font-family: MetricWeb, sans-serif;
  font-size: 14px;
  line-height: 16px;
  font-weight: 600;
  background-color: #262a33;
  height: 39px;
  width: 100%;
`;

const GridContainer = styled.div`
  box-sizing: border-box;
  margin-left: auto;
  margin-right: auto;
  min-width: 240px;
  position: relative;
  max-width: 1220px;
  padding-left: 10px;
  padding-right: 10px;
`;

const MarketsData = styled.div`
  padding-top: 10px;
  padding-bottom: 10px;
  color: #fff;
  display: flex;
  justify-content: space-between;
`;

const MarketsDataItems = styled.ul`
  margin: 0;
  padding: 0;
  list-style-type: none;
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const ItemSymbolName = styled.li`
  margin: 0;
  padding: 0;
  list-style-type: none;
  display: flex;
  width: 100%;
`;

const PercentageChangeRed = styled.span`
  border-color: #ff767c;
  color: #ff767c;
  border: 1px solid #fff1e5;
  border-radius: 3px;
  padding: 0 4px;
  margin-left: 5px;
`;

const PercentageChangeGreen = styled.span`
  border-color: #9cd321;
  color: #9cd321;
  margin-left: 5px;
  border: 1px solid #fff1e5;
  border-radius: 3px;
  padding: 0 4px;
`;

function App() {
  const rows: RowData[] = useSymbols();

  /*
    but if you want to use it from util without use it from custom hook this is the approach : 
    const [rows, setRows] = useState<RowData[]>([]);

    useEffect(() => {
      const fetchData = async () => {
        const data = await fetchSymbols();
        setRows(data);
      };

      fetchData();
    }, []);
  */

  return (
    <div>
      <GlobalStyle />
      <DaysPercantages />
      <Header />
      {rows.length > 0 ? (
        <Wrapper>
          <GridContainer>
            <MarketsData>
              <MarketsDataItems>
                {rows.map((row, index) => (
                  <ItemSymbolName key={index}>
                    <span>{row.name}</span>
                    {row.percentageChanges > 0 ? (
                      <PercentageChangeGreen>
                        {row.percentageChanges}%
                      </PercentageChangeGreen>
                    ) : (
                      <PercentageChangeRed>
                        {row.percentageChanges}%
                      </PercentageChangeRed>
                    )}
                  </ItemSymbolName>
                ))}
              </MarketsDataItems>
            </MarketsData>
          </GridContainer>
        </Wrapper>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
}

export default App;
