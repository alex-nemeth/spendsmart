import { useState } from "react";

function App() {
    return (
        <div className="my-4">
            <div className="flex gap-2 mb-4">
                <h1 className="me-auto">SpendSmart</h1>
                <button className="border-2">Add Budget</button>
                <button className="border-2">Add Expense</button>
            </div>
            <div className="grid grid-cols-1 gap-1 items-start"></div>
        </div>
    );
}

export default App;
