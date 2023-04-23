import React, { useRef, useState, useEffect } from "react";
import {
    UNCATEGORIZED_BUDGET_ID,
    useBudgets,
} from "../contexts/BudgetsContext";

export default function AddExpenseModal({
    show,
    handleClose,
    defaultBudgetId,
}) {
    const [budget, setBudget] = useState(defaultBudgetId);

    const descriptionRef = useRef();
    const amountRef = useRef();
    const { addExpense, budgets } = useBudgets();

    function handleSubmit(e) {
        e.preventDefault();
        addExpense({
            description: descriptionRef.current.value,
            amount: parseFloat(amountRef.current.value),
            budgetId: budget,
        });
        handleClose();
    }

    useEffect(() => {
        setBudget(defaultBudgetId);
    }, [defaultBudgetId]);

    return (
        <div
            className={`${
                show ? "visible" : "hidden"
            } fixed top-0 left-0 right-0 z-50 w-full p-4 md:p-5 lg:p-6 overflow-x-hidden overflow-y-auto md:inset-0 h-full max-h-full bg-slate-700/[0.6]`}
        >
            <div className="modal relative m-auto w-full max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl max-h-full">
                <div className="relative bg-white rounded-lg shadow">
                    <button
                        type="button"
                        className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-100 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center "
                        data-modal-hide="authentication-modal"
                        onClick={handleClose}
                    >
                        <svg
                            aria-hidden="true"
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clipRule="evenodd"
                            ></path>
                        </svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                    <div className="px-6 py-6 lg:px-8">
                        <h3 className="mb-4 text-xl md:text-2xl lg:text-3xl font-medium text-gray-500">
                            New Expense
                        </h3>
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label
                                    htmlFor="description"
                                    className="block mb-2 text-sm sm:text-md md:text-lg lg:text-xl font-medium text-gray-900"
                                >
                                    Description
                                </label>
                                <input
                                    type="text"
                                    name="description"
                                    id="description"
                                    placeholder="Movies with friends"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm sm:text-md md:text-lg lg:text-xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    ref={descriptionRef}
                                    required
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="max"
                                    className="block mb-2 text-sm sm:text-md md:text-lg lg:text-xl font-medium text-gray-900"
                                >
                                    Amount
                                </label>
                                <input
                                    type="number"
                                    name="amount"
                                    id="amount"
                                    placeholder="10"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm sm:text-md md:text-lg lg:text-xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                                    ref={amountRef}
                                    required
                                    step={0.01}
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="budgetId"
                                    className="block mb-2 text-sm sm:text-md md:text-lg lg:text-xl font-medium text-gray-900"
                                >
                                    Budget
                                </label>
                                <select
                                    className="bg-gray-100 border-gray-300 text-gray-900 text-sm sm:text-md md:text-lg lg:text-xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    value={budget}
                                    onChange={(e) => setBudget(e.target.value)}
                                    required
                                    step={0.01}
                                >
                                    <option id={UNCATEGORIZED_BUDGET_ID}>
                                        Uncategorized
                                    </option>
                                    {budgets.map((budget) => (
                                        <option
                                            key={budget.id}
                                            value={budget.id}
                                        >
                                            {budget.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    className="w-full text-white bg-cyan-400 hover:bg-cyan-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:text-md md:text-lg lg:text-xl px-5 py-2.5 text-center"
                                >
                                    Add Expense
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
