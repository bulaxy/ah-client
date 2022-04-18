import Header from './Header'
import { CardsProvider } from "../contexts/CardsContext";
import PageRouter from './PageRouter'

function App() {
  return (
    <CardsProvider>
      <Header />
      <PageRouter />
    </CardsProvider>
  );
}

export default App;
