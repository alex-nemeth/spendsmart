import React from "react";

export default function Header({ onTrackerClick, onExpenseClick }) {
    return (
        <div className="flex gap-2 mb-4">
            <h1 className="text-2xl lg:text-5xl border-2 p-2 text-center justify-center me-auto mx-4 hover:cursor-default">
                Spend<span className="font-semibold">Smart</span>
            </h1>
            <button
                className="border-2 w-32 text-lg lg:text-2xl lg:w-48 hover:bg-cyan-700 transition-all"
                onClick={onTrackerClick}
            >
                New Tracker
            </button>
            <button
                className="border-2 mr-4 w-32 text-lg lg:text-2xl lg:w-48 hover:bg-sky-700 transition-all"
                onClick={onExpenseClick}
            >
                New Expense
            </button>
        </div>
    );
}
