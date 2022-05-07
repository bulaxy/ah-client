import { Link, Route, Routes } from "react-router-dom";
import InvestigatorList from "./InvestigatorListPage";
import CardSearchPage from "./CardSearchPage";

export default function Pages() {
    return <>
        <Routes>
            <Route path={"/"} element={<CardSearchPage />} />
            <Route path="/investigators" element={<InvestigatorList />} />
        </Routes>
    </>
}