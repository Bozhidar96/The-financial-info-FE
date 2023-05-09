import useSymbols from "../hooks/useSymbols";
import { RowData } from "../interfaces";
import { Header } from "./Header";
import styled from "styled-components";
import { Loading } from "./Loading";
import { RowPercentage } from "./RowPercentage";
import { Symbols } from "./Symbols";

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

export function DaysPercantages() {
  const rows: RowData[] = useSymbols();

  /*
      but if you want to use it from util without use it from custom hook this is the approach : 
      const [rows, setRows] = useState<RowData[]>([]);
  
      useEffect(() => {
        const fetchData = async () => {
          const data = await getSymbols();
          setRows(data);
        };
  
        fetchData();
      }, []);
    */

  return (
    <div>
      <Header />
      {rows.length > 0 ? (
        <Wrapper>
          <GridContainer>
            <MarketsData>
              <MarketsDataItems>
                {rows.map((row, index) => (
                  <ItemSymbolName key={index}>
                    <Symbols name={row.name} />
                    <RowPercentage percentage={row.percentageChanges} />
                  </ItemSymbolName>
                ))}
              </MarketsDataItems>
            </MarketsData>
          </GridContainer>
        </Wrapper>
      ) : (
        <Loading />
      )}
    </div>
  );
}
