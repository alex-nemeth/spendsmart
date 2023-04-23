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

export default function App() {
    const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);
    const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
    const [viewExpensesModalBudgetId, setViewExpensesModalBudgetId] =
        useState();
    const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState();

    const { budgets, getBudgetExpenses } = useBudgets();

    function openAddExpenseModal(budgetId) {
        console.log("modal opened");
        setShowAddExpenseModal(true);
        setAddExpenseModalBudgetId(budgetId);
    }

    const budgetCardsCheck =
        budgets.filter((b) => b.loan === "false" || b.loan === false).length >
        0;

    const loanCardsCheck =
        budgets.filter((b) => b.loan === "true" || b.loan === true).length > 0;

    return (
        <>
            <div className="my-4 m-auto items-center md:w-4/5 lg:w-3/5">
                <Header
                    onTrackerClick={() => setShowAddBudgetModal(true)}
                    onExpenseClick={() => setShowAddExpenseModal(true)}
                />
                {budgetCardsCheck && (
                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold mx-4 my-2">
                        Budgets
                    </h1>
                )}
                <div className="grid grid-cols-1 gap-1 items-start mx-4 lg:grid-cols-2  md:gap-2 lg:gap-4 ">
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
                                    id={budget.id}
                                    onAddExpenseClick={() =>
                                        openAddExpenseModal(budget.id)
                                    }
                                    onViewExpensesClick={() =>
                                        setViewExpensesModalBudgetId(budget.id)
                                    }
                                />
                            );
                        })}
                </div>
                {loanCardsCheck && (
                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold mt-4  mx-4 my-2">
                        Loans
                    </h1>
                )}
                <div className="grid grid-cols-1 gap-1 items-start mx-4 lg:grid-cols-2 md:gap-2 lg:gap-4 ">
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
                                    id={budget.id}
                                    onAddExpenseClick={() =>
                                        openAddExpenseModal(budget.id)
                                    }
                                    onViewExpensesClick={() =>
                                        setViewExpensesModalBudgetId(budget.id)
                                    }
                                />
                            );
                        })}
                </div>
                <div className="mx-4 mt-6 md:mt-8 lg:mt-10">
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
