import { useState } from "react";
import BalanceCard from "./BalanceCard";
import { options } from "./DropdownOption";
import ExpenseForm from "./ExpenseForm";
import ExpenseList from "./ExpenseList";
import IncomeList from "./IncomeList";

const Home = () => {
  const [transactions, setTransactions] = useState([]);
  const [editTransaction, setEdiTransaction] = useState(null);
  const [option, setOption] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  console.log(option);
  const handleAddEditTransaction = (transaction, isAdd) => {
    if (isAdd) {
      setTransactions([
        ...transactions,
        { ...transaction, id: crypto.randomUUID() },
      ]);
    } else {
      setTransactions(
        transactions.map((t) => (t.id === transaction.id ? transaction : t))
      );
    }
    setEdiTransaction(null);
  };
  function handleEditTransaction(editTask) {
    setEdiTransaction(editTask);
  }
  function handleDeleteTransaction(id) {
    setTransactions(transactions.filter((t) => t.id !== id));
  }
  function handleSort(order, type) {
    const filteredTransactions = transactions.filter(
      (t) => t.transactionType === type
    );

    const sortedTransactions = [...filteredTransactions].sort((a, b) => {
      if (order === "asc") {
        return a.amount - b.amount;
      } else {
        return b.amount - a.amount;
      }
    });
    const updatedTransactions = transactions.map((t) =>
      t.transactionType === type ? sortedTransactions.shift() : t
    );

    setTransactions(updatedTransactions);
  }
  function handleFilter(value, type) {
    let updatedOptions;
    const findValue = option.find((t) => t === value);
    if (findValue) {
      updatedOptions = option.filter((t) => t !== value);
      setOption(option.filter((t) => t !== value));
    } else {
      updatedOptions = [...option, value];
      setOption([...option, value]);
    }
    const filterByType = transactions.filter(
      (t) => t?.transactionType === type
    );
    let filterTransaction;
    if (updatedOptions.length === 0) {
      filterTransaction = filterByType;
    } else {
      filterTransaction = filterByType.filter((t) =>
        updatedOptions.some((opt) => t.category.includes(opt))
      );
    }
    const updatedTransactionsByOptions = transactions?.map((t) =>
      t.transactionType === type ? filterTransaction.shift() : t
    );
    updatedOptions.length === 0
      ? setFilteredData([])
      : setFilteredData(updatedTransactionsByOptions);
  }
  return (
    <>
      <main className="relative mx-auto mt-10 w-full max-w-7xl">
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ExpenseForm
            options={options}
            key={editTransaction ? editTransaction.id : "new"}
            onSave={handleAddEditTransaction}
            editTransaction={editTransaction}
          />

          {/* <!-- Right Column --> */}
          <div className="lg:col-span-2">
            {/* <!-- Total Balance Stat--> */}
            <BalanceCard
              transactions={filteredData.length ? filteredData : transactions}
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-8">
              <IncomeList
                transactions={filteredData.length ? filteredData : transactions}
                onEdit={handleEditTransaction}
                onDelete={handleDeleteTransaction}
                onSort={handleSort}
                onFilter={handleFilter}
              />

              <ExpenseList
                transactions={filteredData.length ? filteredData : transactions}
                onEdit={handleEditTransaction}
                onDelete={handleDeleteTransaction}
                onSort={handleSort}
                onFilter={handleFilter}
              />
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;
