import { Link, Route, Routes } from "react-router-dom";
import InvestigatorList from "./InvestigatorList.js";

export default function PageBody() {
    return <>
        <Routes>
            <Route path="/" element={<div>1</div>} />
            <Route path="/investigators" element={<InvestigatorList />} />
            <Route path="/action2" element={<div>3</div>} />
        </Routes>
    </>
}