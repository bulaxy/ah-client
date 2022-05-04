import { Link, Route, Routes } from "react-router-dom";
import InvestigatorList from "./InvestigatorListPage";
import CardSearchPage from "./CardSearchPage";

export default function PageBody() {
    return <>
        <Routes>
            <Route path="/" element={<div>1</div>} />
            <Route path="/investigators" element={<InvestigatorList />} />
            <Route path="/cards" element={<CardSearchPage />} />
        </Routes>
    </>
}