import { currencyFormatter } from "../utils";

export default function BudgetCard({ name, amount, max, gray }) {
    const classNames = [];
    if (amount > max) classNames.push("bg-red-500/[0.25]");
    else if (gray) classNames.push("bg-gray-200/[0.2]");

    return (
        <div className={`card flex flex-col ${classNames.join(" ")}`}>
            <div className="flex justify-between items-baseline font-normal mb-3">
                <div>{name}</div>
                <div className="flex items-baseline">
                    {currencyFormatter.format(amount)}{" "}
                    <span className="text-black/[0.6] text-xs ms-1">
                        / {currencyFormatter.format(max)}
                    </span>
                </div>
            </div>
            <div className="w-full h-6 bg-gray-100 rounded-full">
                <div
                    className={`h-6 ${getProgressBarColor(
                        amount,
                        max
                    )} rounded-full`}
                    style={{ width: getProgressBarRatio(amount, max) }}
                ></div>
            </div>
            <div className="flex gap-2 mt-4">
                <button className="border-blue-500 border-2 p-2 text-blue-500 rounded-md ms-auto">
                    Add Expense
                </button>
                <button className="border-gray-400 border-2 p-2 text-gray-500 rounded-md">
                    View Expenses
                </button>
            </div>
        </div>
    );
}

function getProgressBarRatio(amount, max) {
    if (amount > max) return "100%";
    else return (amount / max) * 100 + "%";
}

function getProgressBarColor(amount, max) {
    const ratio = amount / max;
    if (ratio < 0.5) return "bg-blue-600";
    if (ratio < 0.75) return "bg-yellow-500";
    return "bg-red-500";
}
