import Header from './Header'
import { CardsProvider } from "../contexts/CardsContext";
import { PageHeaderProvider } from "../contexts/PageHeaderContext";
import PageRouter from './PageRouter'

function App() {
  return (
    <PageHeaderProvider>
      <CardsProvider>
        <Header />
        <PageRouter />
      </CardsProvider>
    </PageHeaderProvider>
  );
}

export default App;
