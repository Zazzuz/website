import React, { useState } from 'react';
import '../styles/finance.css';

function Finance() {
    // Define state variables
    const [expenses, setExpenses] = useState([]);
    const [expenseName, setExpenseName] = useState('');
    const [expenseAmount, setExpenseAmount] = useState('');
    const [expenseCategory, setExpenseCategory] = useState('');
    const [expenseDate, setExpenseDate] = useState('');
    const [filterCategory, setFilterCategory] = useState('All');

    const totalAmount = expenses.reduce((sum, expense) => sum + expense.amount, 0).toFixed(2);

    const handleSubmit = (e) => {
        e.preventDefault();
        const expense = {
            id: Date.now(),
            name: expenseName,
            amount: parseFloat(expenseAmount),
            category: expenseCategory,
            date: expenseDate
        };
        setExpenses([...expenses, expense]);
        // Reset form fields
        setExpenseName('');
        setExpenseAmount('');
        setExpenseCategory('');
        setExpenseDate('');
    };

    const handleDelete = (id) => {
        setExpenses(expenses.filter(expense => expense.id !== id));
    };

    const handleEdit = (id) => {
        const expenseToEdit = expenses.find(expense => expense.id === id);
        setExpenseName(expenseToEdit.name);
        setExpenseAmount(expenseToEdit.amount);
        setExpenseCategory(expenseToEdit.category);
        setExpenseDate(expenseToEdit.date);
        handleDelete(id);
    };

    const filteredExpenses = filterCategory === 'All' 
        ? expenses 
        : expenses.filter(expense => expense.category === filterCategory);

    return (
        <div className="finance-container">
            <h1>Expense Tracker</h1>
            <form id="expense-form" onSubmit={handleSubmit}>
                <div className="input-row">
                    <input
                        type="text"
                        id="expense-name"
                        placeholder="Expense Name"
                        value={expenseName}
                        onChange={(e) => setExpenseName(e.target.value)}
                        required
                    />
                    <input
                        type="number"
                        id="expense-amount"
                        placeholder="Amount"
                        value={expenseAmount}
                        onChange={(e) => setExpenseAmount(e.target.value)}
                        required
                    />
                    <select
                        id="expense-category"
                        value={expenseCategory}
                        onChange={(e) => setExpenseCategory(e.target.value)}
                        required
                    >
                        <option value="" disabled>Select Category</option>
                        <option value="Home">Home</option>
                        <option value="Food">Food</option>
                        <option value="Hobby">Hobby</option>
                        <option value="Meds">Meds</option>
                        <option value="Transport">Transport</option>
                        <option value="Other">Other</option>
                    </select>
                    <input
                        type="date"
                        id="expense-date"
                        value={expenseDate}
                        onChange={(e) => setExpenseDate(e.target.value)}
                        required
                    />
                    <button className='finance-btn' type="submit">Add</button>
                </div>
            </form>
            <div className="expense-table">
                <table>
                    <thead>
                        <tr>
                            <th>Expense Name</th>
                            <th>Amount</th>
                            <th>Category</th>
                            <th>Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredExpenses.map(expense => (
                            <tr key={expense.id}>
                                <td>{expense.name}</td>
                                <td>€{expense.amount.toFixed(2)}</td>
                                <td>{expense.category}</td>
                                <td>{expense.date}</td>
                                <td>
                                    <button className='finance-btn' onClick={() => handleEdit(expense.id)}>Edit</button>
                                    <button className='finance-btn' onClick={() => handleDelete(expense.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="total-amount">
                    <strong>Total:</strong> €{totalAmount}
                </div>
            </div>
            <div className="filter">
                <label htmlFor="filter-category">Filter by Category:</label>
                <select
                    id="filter-category"
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                >
                    <option value="All">All</option>
                    <option value="Home">Home</option>
                    <option value="Food">Food</option>
                    <option value="Hobby">Hobby</option>
                    <option value="Meds">Meds</option>
                    <option value="Transport">Transport</option>
                    <option value="Other">Other</option>
                </select>
            </div>
        </div>
    );
}

export default Finance;
