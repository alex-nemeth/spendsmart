// React & Contexts
import { useState } from "react";
import { useBudgets, UNCATEGORIZED_BUDGET_ID } from "./contexts/BudgetsContext";

// App Components
import Header from "./components/Header";
import BudgetCard from "./components/BudgetCard";
import UncategorizedBudgetCard from "./components/UncategorizedBudgetCard";
import TotalBudgetCard from "./components/TotalBudgetCard";

// Modal Components
import AddBudgetModal from "./components/AddBudgetModal";
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
                <Header
                    onTrackerClick={() => setShowAddBudgetModal(true)}
                    onExpenseClick={() => openAddExpenseModal}
                />
                <div className="grid grid-cols-1 gap-1 items-start mx-4 ">
                    {budgets.filter(
                        (budget) =>
                            budget.loan === "false" || budget.loan === false
                    ).length > 0 && (
                        <h1 className="text-2xl font-semibold">Budgets</h1>
                    )}
                    {budgets
                        .filter(
                            (budget) =>
                                budget.loan === "false" || budget.loan === false
                        )
                        .map((budget) => {
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
                                    loan={budget.loan}
                                    onAddExpenseClick={() =>
                                        openAddExpenseModal(budget.id)
                                    }
                                    onViewExpensesClick={() =>
                                        setViewExpensesModalBudgetId(budget.id)
                                    }
                                />
                            );
                        })}
                    {budgets.filter(
                        (budget) =>
                            budget.loan === "true" || budget.loan === true
                    ).length > 0 && (
                        <h1 className="text-2xl font-semibold mt-4">Loans</h1>
                    )}
                    {budgets
                        .filter(
                            (budget) =>
                                budget.loan === "true" || budget.loan === true
                        )
                        .map((budget) => {
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
                                    loan={budget.loan}
                                    onAddExpenseClick={() =>
                                        openAddExpenseModal(budget.id)
                                    }
                                    onViewExpensesClick={() =>
                                        setViewExpensesModalBudgetId(budget.id)
                                    }
                                />
                            );
                        })}
                    <div className="h-4"></div>
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
