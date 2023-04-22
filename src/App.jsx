import { useState } from "react";
import BudgetCard from "./components/BudgetCard";
import AddBudgetModal from "./components/AddBudgetModal";
import { useBudgets } from "./contexts/BudgetsContext";

function App() {
    const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);
    const { budgets, getBudgetExpenses } = useBudgets();
    return (
        <>
            <div className="my-4">
                <div className="flex gap-2 mb-4">
                    <h1 className="me-auto">SpendSmart</h1>
                    <button
                        className="border-2"
                        onClick={() => setShowAddBudgetModal(true)}
                    >
                        Add Budget
                    </button>
                    <button className="border-2">Add Expense</button>
                </div>
                <div className="grid grid-cols-1 gap-1 items-start">
                    {budgets.map((budget) => {
                        const amount = getBudgetExpenses(budget.id).reduce(
                            (total, expense) => total + expense.amount,
                            0
                        );
                        return (
                            <BudgetCard
                                key={budget.id}
                                name={budget.name}
                                amount={amount}
                                max={budget.max}
                            />
                        );
                    })}
                </div>
            </div>
            <AddBudgetModal
                show={showAddBudgetModal}
                handleClose={() => setShowAddBudgetModal(false)}
            />
        </>
    );
}

export default App;
