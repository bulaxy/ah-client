import { Link, Route, Routes } from "react-router-dom";
import InvestigatorList from "./InvestigatorListPage";
import CardSearchPage from "./CardSearchPage";
import ChartPage from "./ChartPage";
import DeckTriviaPage from "./DeckTriviaPage";

export default function Pages() {
    return <>
        <Routes>
            <Route path={"/Deck-Trivia"} element={<DeckTriviaPage />} />
            <Route path={"/"} element={<ChartPage />} />
            {/* <Route path={"/search"} element={<CardSearchPage />} /> */}
            {/* <Route path="/investigators" element={<InvestigatorList />} /> */}
        </Routes>
    </>
}