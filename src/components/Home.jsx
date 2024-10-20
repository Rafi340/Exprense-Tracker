import { useState } from "react";
import BalanceCard from "./BalanceCard";
import { options } from "./DropdownOption";
import ExpenseForm from "./ExpenseForm";
import ExpenseList from "./ExpenseList";
import IncomeList from "./IncomeList";

const Home = () => {
  const [transactions, setTransactions] = useState([]);
  const [editTransaction, setEdiTransaction] = useState(null);
  console.log(editTransaction);
  const handleAddEditTransaction = (transaction) => {
    if (editTransaction) {
      setTransactions(
        transactions?.map((t) => {
          if (t.id === editTransaction.id) {
            return editTransaction;
          }
          return t;
        })
      );
      setEdiTransaction(null);
    } else {
      setTransactions([
        ...transactions,
        { ...transaction, id: crypto.randomUUID() },
      ]);
      //setEdiTransaction(null);
    }
  };
  function handleEditTask(editTask) {
    console.log(editTask);
    setEdiTransaction(editTask);
  }
  return (
    <>
      <main className="relative mx-auto mt-10 w-full max-w-7xl">
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ExpenseForm
            options={options}
            onSave={handleAddEditTransaction}
            editTransaction={editTransaction}
          />

          {/* <!-- Right Column --> */}
          <div className="lg:col-span-2">
            {/* <!-- Total Balance Stat--> */}
            <BalanceCard transactions={transactions} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-8">
              <IncomeList transactions={transactions} onEdit={handleEditTask} />

              <ExpenseList
                transactions={transactions}
                onEdit={handleEditTask}
              />
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;
