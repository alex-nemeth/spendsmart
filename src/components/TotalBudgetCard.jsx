import { UNCATEGORIZED_BUDGET_ID } from "../contexts/BudgetsContext";
import BudgetCard from "./BudgetCard";
import { useBudgets } from "../contexts/BudgetsContext";

export default function TotalBudgetCard(props) {
    const { expenses, budgets } = useBudgets();
    const amount = expenses.reduce(
        (total, expense) => total + expense.amount,
        0
    );
    const max = budgets.reduce((total, budget) => total + budget.max, 0);

    if (max === 0) return null;

    return (
        <BudgetCard
            amount={amount}
            name="Total Tracked"
            gray
            max={max}
            hideButtons
        />
    );
}
