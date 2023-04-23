import { currencyFormatter } from "../utils";
import { useBudgets } from "../contexts/BudgetsContext";

export default function BudgetCard({
    name,
    amount,
    max,
    gray,
    hideButtons,
    onAddExpenseClick,
    onViewExpensesClick,
    loan,
    id,
}) {
    const { budgets, deleteBudget } = useBudgets();
    const budget = budgets.find((budget) => budget.id === id);

    const classNames = [];
    if (loan === "true" && amount >= max) classNames.push("bg-green-100");
    else if (amount >= max) classNames.push("bg-red-200");
    else if (gray) classNames.push("bg-slate-200/[0.9]");
    else classNames.push("bg-slate-50");

    return (
        <div
            onClick={() => console.log(name, loan)}
            className={`card flex flex-col text-black ${classNames.join(" ")} `}
        >
            <div className="flex justify-between items-baseline font-semibold text-xl mb-3">
                <div className="text-inherit md:text-2xl lg:text-3xl ">
                    {name}
                </div>
                <div className="flex items-baseline text-xl md:text-2xl lg:text-3xl ">
                    {currencyFormatter.format(amount)}{" "}
                    {max && (
                        <span className="text-black/[0.6] text-sm md:text-lg lg:text-xl ms-1">
                            / {currencyFormatter.format(max)}
                        </span>
                    )}
                </div>
            </div>
            {max && (
                <div className="w-full h-6 bg-slate-200 rounded-lg">
                    <div
                        className={`h-6 ${
                            loan === "true"
                                ? getProgressBarColorLoan(amount, max)
                                : getProgressBarColor(amount, max)
                        } rounded-lg transition-all duration-500`}
                        style={{ width: getProgressBarRatio(amount, max) }}
                    ></div>
                </div>
            )}
            {!hideButtons && (
                <div className="flex gap-2 mt-4">
                    {loan === "true" && amount >= max && (
                        <button
                            className="p-2 text-white bg-green-500 hover:bg-green-600 font-semibold rounded-md me-auto transition-all xl:text-lg"
                            onClick={() => deleteBudget(budget)}
                        >
                            Clear Loan
                        </button>
                    )}
                    <button
                        className="border-cyan-500 border-2 p-2 text-cyan-500 hover:bg-cyan-200 font-semibold rounded-md ms-auto transition-all xl:text-lg"
                        onClick={onAddExpenseClick}
                    >
                        Add Expense
                    </button>
                    <button
                        className="border-slate-400 border-2 p-2 text-slate-400 hover:bg-slate-200 rounded-md transition-all xl:text-lg"
                        onClick={onViewExpensesClick}
                    >
                        View Expenses
                    </button>
                </div>
            )}
        </div>
    );
}

function getProgressBarRatio(amount, max) {
    if (amount > max) return "100%";
    else return (amount / max) * 100 + "%";
}

function getProgressBarColor(amount, max) {
    const ratio = amount / max;
    if (ratio < 0.5) return "bg-sky-400";
    if (ratio < 0.75) return "bg-yellow-300";
    return "bg-red-500";
}

function getProgressBarColorLoan(amount, max) {
    const ratio = amount / max;
    if (ratio < 0.5) return "bg-red-500";
    if (ratio < 0.75) return "bg-yellow-300";
    return "bg-green-400";
}
