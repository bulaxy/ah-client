import { Link, Route, Routes } from "react-router-dom";

export default function PageBody() {
    return <>
        <Routes>
            <Route path="/" element={<div>1</div>} />
            <Route path="/action1" element={<div>2</div>} />
            <Route path="/action2" element={<div>3</div>} />
        </Routes>
    </>
}