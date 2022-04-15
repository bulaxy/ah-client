import Header from './Header'
import { CardsProvider } from "../contexts/CardsContext";

function App() {
  return (
    <CardsProvider>
      <Header />
    </CardsProvider>
  );
}

export default App;
