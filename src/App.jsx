import { useState } from "react";
import BudgetCard from "./components/BudgetCard";
import AddBudgetModal from "./components/AddBudgetModal";
import { useBudgets } from "./contexts/BudgetsContext";
import AddExpenseModal from "./components/AddExpenseModal ";

function App() {
    const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);
    const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);

    const { budgets, getBudgetExpenses } = useBudgets();
    return (
        <>
            <div className="my-4">
                <div className="flex gap-2 mb-4">
                    <img
                        src="/images/logo.png"
                        alt="spendsmart logo"
                        className="w-40 me-auto mx-4"
                    />
                    <button
                        className="border-2 w-32"
                        onClick={() => setShowAddBudgetModal(true)}
                    >
                        Add Budget
                    </button>
                    <button
                        className="border-2 mr-4 w-32"
                        onClick={() => setShowAddExpenseModal(true)}
                    >
                        Add Expense
                    </button>
                </div>
                <div className="grid grid-cols-1 gap-1 items-start mx-4">
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
            <AddExpenseModal
                show={showAddExpenseModal}
                handleClose={() => setShowAddExpenseModal(false)}
            />
        </>
    );
}

export default App;
