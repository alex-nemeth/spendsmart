import React, { useRef } from "react";
import {
    UNCATEGORIZED_BUDGET_ID,
    useBudgets,
} from "../contexts/BudgetsContext";
import { currencyFormatter } from "../utils";

export default function ViewExpensesModal({ budgetId, handleClose }) {
    const { getBudgetExpenses, budgets, deleteBudget, deleteExpense } =
        useBudgets();

    const budget =
        UNCATEGORIZED_BUDGET_ID === budgetId
            ? { name: "Uncategorized", id: UNCATEGORIZED_BUDGET_ID }
            : budgets.find((budget) => budget.id === budgetId);

    const expenses = getBudgetExpenses(budgetId);

    return (
        <div
            className={`${
                budgetId != null ? "visible" : "hidden"
            } fixed top-0 left-0 right-0 z-50  w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full`}
        >
            <div className="relative w-full max-w-md max-h-full">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <button
                        type="button"
                        className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
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
                        <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
                            <div className="flex justify-between mx-6 gap-2">
                                <div>Expenses - {budget?.name}</div>
                                {budgetId !== UNCATEGORIZED_BUDGET_ID && (
                                    <button
                                        className="border-2 p-1 text-sm"
                                        onClick={() => {
                                            deleteBudget(budget);
                                            handleClose();
                                        }}
                                    >
                                        Delete
                                    </button>
                                )}
                            </div>
                        </h3>
                    </div>
                    <div className="flex flex-col gap-3">
                        {expenses.map((expense) => (
                            <div className="flex gap-2" key={expense.id}>
                                <div className="me-auto text-sm">
                                    {expense.description}
                                </div>
                                <div className="text-md">
                                    {currencyFormatter.format(expense.amount)}
                                </div>
                                <button onClick={() => deleteExpense(expense)}>
                                    {" "}
                                    <svg
                                        aria-hidden="true"
                                        className="w-5 h-5"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fill-rule="evenodd"
                                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                            clip-rule="evenodd"
                                        ></path>
                                    </svg>
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
