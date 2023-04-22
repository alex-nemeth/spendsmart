import { currencyFormatter } from "../utils";

export default function BudgetCard({ name, amount, max }) {
    return (
        <div className="card flex justify-between items-baseline font-normal mb-3">
            <div>{name}</div>
            <div className="flex items-baseline">
                {currencyFormatter.format(amount)}{" "}
                <span className="text-black/[0.6] text-xs ms-1">
                    / {currencyFormatter.format(max)}
                </span>
            </div>
        </div>
    );
}
