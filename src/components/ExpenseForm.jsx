import { useState } from "react";
export default function ExpenseForm({ onSave, options, editTransaction }) {
  console.log("edit transaction", editTransaction);

  const [transaction, setTransaction] = useState(
    editTransaction || {
      id: crypto.randomUUID(),
      category: "",
      amount: "",
      date: "",
      transactionType: 1,
    }
  );
  console.log(editTransaction);

  //const [tracker, setTracker] = useState(1);
  // eslint-disable-next-line no-unused-vars
  const [isAdd, setIsAdd] = useState(Object.is(editTransaction, null));

  const handleChange = (event) => {
    const name = event.target.name;
    let value = event.target.value;
    setTransaction({
      ...transaction,
      [name]: value,
    });
  };

  return (
    <div className="p-6 py-8 bg-[#F9FAFB] border rounded-md">
      <h2 className="text-3xl font-semibold leading-7 text-gray-800 text-center">
        Expense Tracker
      </h2>

      <form>
        <div className="flex divide-x divide-slate-400/20 overflow-hidden rounded-md bg-white text-[0.8125rem] font-medium leading-5 text-slate-700 shadow-sm ring-1 ring-slate-700/10 mt-6">
          <div
            className={`cursor-pointer text-center flex-1 px-4 py-2 hover:bg-slate-50 hover:text-slate-900 Active ${
              transaction?.transactionType == 1 ? "active" : ""
            }`}
            onClick={() =>
              setTransaction({ ...transaction, transactionType: 1 })
            }
          >
            Expense
          </div>
          <div
            className={`cursor-pointer text-center flex-1 px-4 py-2 hover:bg-slate-50 hover:text-slate-900 ${
              transaction?.transactionType == 2 ? "active" : ""
            }`}
            onClick={() =>
              setTransaction({ ...transaction, transactionType: 2 })
            }
          >
            Income
          </div>
        </div>

        {/* <!-- Note -->
            <!-- Income Categories - Salary, Outsourcing, Bond, Dividend --> */}
        <div className="mt-3">
          <label
            htmlFor="category"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Category
          </label>
          <div className="mt-2">
            <select
              id="category"
              name="category"
              autoComplete="category-name"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
              value={transaction.category}
              onChange={handleChange}
            >
              {options[transaction.transactionType]?.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-3">
          <label
            htmlFor="amount"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Amount
          </label>
          <div className="mt-2">
            <input
              type="number"
              name="amount"
              id="amount"
              autoComplete="off"
              placeholder="12931"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
              value={transaction.amount}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="mt-3">
          <label
            htmlFor="date"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Date
          </label>
          <div className="mt-2">
            <input
              type="date"
              name="date"
              id="date"
              value={transaction.date}
              onChange={handleChange}
              autoComplete="off"
              placeholder="12931"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <button
          type="submit"
          className="mt-6 rounded-md bg-teal-600 px-8 py-2 text-sm font-semibold text-white shadow-sm hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600 w-full"
          onClick={(event) => {
            event.preventDefault();
            onSave(transaction, isAdd);
          }}
        >
          {isAdd ? "Save" : "Edit"}
        </button>
      </form>
    </div>
  );
}
