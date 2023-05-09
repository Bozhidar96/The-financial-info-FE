import useSymbols from "./hooks/useSymbols";
import { RowData } from "./interfaces";

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
      {rows.length > 0 ? (
        <div>
          <div>
            <ul>
              {rows.map((row, index) => (
                <tr key={index}>
                  <td>{row.name}</td>
                  <td>{row.percentageChanges}%</td>
                </tr>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
}

export default App;
