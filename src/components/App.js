import Header from './Header'
import { CardsProvider } from "../contexts/CardsContext";

function App() {
  return (
    <SiteSettingProvider>
        <Header />
    </SiteSettingProvider>
  );
}

export default App;
