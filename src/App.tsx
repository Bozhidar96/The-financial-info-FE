import { DaysPercantages } from "./components/DaysPercentages";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    background: #fff1e5;
    font-family: sans-serif;
    font-size: 18px;
    padding: 20px;
  }
`;

function App() {
  return (
    <div>
      <GlobalStyle />
      <DaysPercantages />
    </div>
  );
}

export default App;
