import React, { useState, useRef } from "react";
import { useBudgets } from "../contexts/BudgetsContext";

export default function AddBudgetModal({ show, handleClose }) {
    const nameRef = useRef();
    const maxRef = useRef();
    const loanRef = useRef();
    const { addBudget, budgets } = useBudgets();
    const [loan, setLoan] = useState(false);

    function handleSubmit(e) {
        e.preventDefault();
        addBudget({
            name: nameRef.current.value,
            max: parseFloat(maxRef.current.value),
            loan: loan,
        });
        handleClose();
    }

    return (
        <div
            className={`${
                show ? "visible" : "hidden"
            }  fixed top-0 left-0 right-0 z-50  w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full`}
        >
            <div className=" modal relative w-full max-w-md max-h-full">
                <div className="relative bg-white rounded-lg shadow-2xl">
                    <button
                        type="button"
                        className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-100 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                        data-modal-hide="authentication-modal"
                        onClick={handleClose}
                    >
                        <svg
                            aria-hidden="true"
                            className="w-5 h-5 fill-gray-600"
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
                        <h3 className="mb-4 text-xl font-medium text-gray-500 ">
                            New Tracker
                        </h3>
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label
                                    htmlFor="name"
                                    className="block mb-2 text-sm font-medium text-gray-600"
                                >
                                    Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    placeholder="Entertainment"
                                    ref={nameRef}
                                    required
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="max"
                                    className="block mb-2 text-sm font-medium text-gray-900"
                                >
                                    Maximum Spending
                                </label>
                                <input
                                    type="number"
                                    name="max"
                                    id="max"
                                    placeholder="200"
                                    className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    ref={maxRef}
                                    required
                                    step={0.01}
                                />

                                <div className="flex text-gray-900 py-4 gap-4">
                                    <select
                                        className="bg-gray-100 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        name="loan"
                                        id="loan"
                                        onChange={(e) => {
                                            setLoan(e.target.value);
                                            console.log(loan);
                                        }}
                                        required
                                    >
                                        <option value={false}>Budget</option>
                                        <option value={true}>Loan</option>
                                    </select>
                                </div>
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    className="w-full text-white bg-cyan-400 hover:bg-cyan-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                >
                                    Add {loan === "true" ? "Loan" : "Budget"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
