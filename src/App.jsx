import { useState } from "react";
import BudgetCard from "./components/BudgetCard";

function App() {
    return (
        <div className="my-4">
            <div className="flex gap-2 mb-4">
                <h1 className="me-auto">SpendSmart</h1>
                <button className="border-2">Add Budget</button>
                <button className="border-2">Add Expense</button>
            </div>
            <div className="grid grid-cols-1 gap-1 items-start">
                <BudgetCard name="Entertainment" amount={200} max={300} />
                <BudgetCard name="Gray" amount={100} max={300} gray />
            </div>
        </div>
    );
}

export default App;
