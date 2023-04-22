import { currencyFormatter } from "../utils";

export default function BudgetCard({
    name,
    amount,
    max,
    gray,
    hideButtons,
    onAddExpenseClick,
    onViewExpensesClick,
}) {
    const classNames = [];
    if (amount > max) classNames.push("bg-red-200");
    else if (gray) classNames.push("bg-slate-200/[0.9]");
    else classNames.push("bg-slate-50");

    return (
        <div
            className={`card flex flex-col text-black ${classNames.join(" ")}`}
        >
            <div className="flex justify-between items-baseline font-semibold text-xl mb-3">
                <div>{name}</div>
                <div className="flex items-baseline text-xl">
                    {currencyFormatter.format(amount)}{" "}
                    {max && (
                        <span className="text-black/[0.6] text-sm ms-1">
                            / {currencyFormatter.format(max)}
                        </span>
                    )}
                </div>
            </div>
            {max && (
                <div className="w-full h-6 bg-slate-200 rounded-lg">
                    <div
                        className={`h-6 ${getProgressBarColor(
                            amount,
                            max
                        )} rounded-lg transition-all duration-500`}
                        style={{ width: getProgressBarRatio(amount, max) }}
                    ></div>
                </div>
            )}
            {!hideButtons && (
                <div className="flex gap-2 mt-4">
                    <button
                        className="border-cyan-500 border-2 p-2 text-cyan-500 hover:bg-slate-200 font-semibold rounded-md ms-auto transition-all"
                        onClick={onAddExpenseClick}
                    >
                        Add Expense
                    </button>
                    <button
                        className="border-slate-400 border-2 p-2 text-slate-400 hover:bg-slate-200 rounded-md transition-all"
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
