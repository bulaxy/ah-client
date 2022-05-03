import Header from './components/Header'
import { CardsProvider } from "./contexts/CardsContext";
import { PageHeaderProvider } from "./contexts/PageHeaderContext";
import Pages from './Pages'

function App() {
  return (
    <PageHeaderProvider>
      <CardsProvider>
        <Header />
        <Pages />
      </CardsProvider>
    </PageHeaderProvider>
  );
}

export default App;
