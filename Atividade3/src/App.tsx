import "./css/index.css";
import { Provedor } from "./context";
import { Main } from "./pages";

function App() {
  return (
    <Provedor>
      <Main />
    </Provedor>
  );
}

export default App;
