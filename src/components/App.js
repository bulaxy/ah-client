import Header from './Header'
import { CardsProvider } from "../contexts/CardsContext";
import PageBody from './PageBody'

function App() {
  return (
    <CardsProvider>
      <Header />
      <PageBody />
    </CardsProvider>
  );
}

export default App;
