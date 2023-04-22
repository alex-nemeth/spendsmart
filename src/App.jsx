import { useState } from "react";
import BudgetCard from "./components/BudgetCard";
import UncategorizedBudgetCard from "./components/UncategorizedBudgetCard";
import TotalBudgetCard from "./components/TotalBudgetCard";
import AddBudgetModal from "./components/AddBudgetModal";
import { useBudgets, UNCATEGORIZED_BUDGET_ID } from "./contexts/BudgetsContext";
import AddExpenseModal from "./components/AddExpenseModal ";
import ViewExpensesModal from "./components/ViewExpensesModal";

function App() {
    const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);
    const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
    const [viewExpensesModalBudgetId, setViewExpensesModalBudgetId] =
        useState();
    const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState();

    const { budgets, getBudgetExpenses } = useBudgets();

    function openAddExpenseModal(budgetId) {
        setShowAddExpenseModal(true);
        setAddExpenseModalBudgetId(budgetId);
    }

    return (
        <>
            <div className="my-4">
                <div className="flex gap-2 mb-4">
                    <h1 className="text-2xl border-2 p-2 text-center justify-center me-auto mx-4 hover:cursor-default">
                        SpendSmart
                    </h1>
                    {/* <img
                        src="/images/logo.png"
                        alt="spendsmart logo"
                        className="w-40 me-auto mx-4 border-2"
                    /> */}
                    <button
                        className="border-2 w-32 text-lg hover:bg-cyan-700 transition-all"
                        onClick={() => setShowAddBudgetModal(true)}
                    >
                        Add Budget
                    </button>
                    <button
                        className="border-2 mr-4 w-32 text-lg hover:bg-sky-700 transition-all"
                        onClick={openAddExpenseModal}
                    >
                        Add Expense
                    </button>
                </div>
                <div className="grid grid-cols-1 gap-1 items-start mx-4 ">
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
                                onAddExpenseClick={() =>
                                    openAddExpenseModal(budget.id)
                                }
                                onViewExpensesClick={() =>
                                    setViewExpensesModalBudgetId(budget.id)
                                }
                            />
                        );
                    })}
                    <UncategorizedBudgetCard
                        onAddExpenseClick={openAddExpenseModal}
                        onViewExpensesClick={() =>
                            setViewExpensesModalBudgetId(
                                UNCATEGORIZED_BUDGET_ID
                            )
                        }
                    />
                    <TotalBudgetCard />
                </div>
            </div>
            <AddBudgetModal
                show={showAddBudgetModal}
                handleClose={() => setShowAddBudgetModal(false)}
            />
            <AddExpenseModal
                show={showAddExpenseModal}
                defaultBudgetId={addExpenseModalBudgetId}
                handleClose={() => setShowAddExpenseModal(false)}
            />
            <ViewExpensesModal
                budgetId={viewExpensesModalBudgetId}
                handleClose={() => setViewExpensesModalBudgetId()}
            />
        </>
    );
}

export default App;
