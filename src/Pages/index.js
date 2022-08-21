import { Link, Route, Routes } from "react-router-dom";
import InvestigatorList from "./InvestigatorListPage";
import CardSearchPage from "./CardSearchPage";
import ChartPage from "./ChartPage";

export default function Pages() {
    return <>
        <Routes>
            <Route path={"/"} element={<ChartPage />} />
            <Route path={"/search"} element={<CardSearchPage />} />
            <Route path="/investigators" element={<InvestigatorList />} />
        </Routes>
    </>
}