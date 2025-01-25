import './styles.css';


import React, { useState } from 'react';

function App() {
  // Initial inventory state
  const [inventory, setInventory] = useState([
    { id: 1, name: 'Laptop', category: 'Electronics', quantity: 5 },
    { id: 2, name: 'Desk', category: 'Furniture', quantity: 20 },
  ]);

  // Filter state for category
  const [categoryFilter, setCategoryFilter] = useState('');

  // Form state for new items
  const [newItem, setNewItem] = useState({
    name: '',
    category: '',
    quantity: '',
  });

  // State to track item being edited
  const [editItem, setEditItem] = useState(null);

  // Sort state for quantity order
  const [sortOrder, setSortOrder] = useState('asc');

  // Handle input changes for form fields (Item Name, Category, Quantity)
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem({ ...newItem, [name]: value });
  };

  // Handle adding new item to the inventory
  const handleAddItem = (e) => {
    e.preventDefault();
    if (newItem.name && newItem.category && newItem.quantity) {
      if (editItem) {
        // Update existing item
        const updatedInventory = inventory.map((item) =>
          item.id === editItem.id ? { ...item, ...newItem } : item
        );
        setInventory(updatedInventory);
      } else {
        // Add new item
        const newInventoryItem = {
          id: inventory.length + 1,
          name: newItem.name,
          category: newItem.category,
          quantity: parseInt(newItem.quantity, 10),
        };
        setInventory([...inventory, newInventoryItem]);
      }
      // Reset the form
      setNewItem({ name: '', category: '', quantity: '' });
      setEditItem(null); // Clear the edit item state
    } else {
      alert("Please fill in all fields.");
    }
  };

  // Handle deleting an item from inventory
  const handleDelete = (id) => {
    setInventory(inventory.filter(item => item.id !== id));
  };

  // Handle filter change
  const handleFilterChange = (e) => {
    setCategoryFilter(e.target.value);
  };

  // Handle sorting by quantity
  const handleSort = () => {
    const sortedInventory = [...inventory].sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.quantity - b.quantity; // Ascending order
      } else {
        return b.quantity - a.quantity; // Descending order
      }
    });
    setInventory(sortedInventory);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc'); // Toggle sort order
  };

  // Filtered inventory based on category
  const filteredInventory = categoryFilter
    ? inventory.filter(item => item.category === categoryFilter)
    : inventory;

  // Handle editing an item
  const handleEdit = (item) => {
    setNewItem({
      name: item.name,
      category: item.category,
      quantity: item.quantity,
    });
    setEditItem(item); // Set the item being edited
  };

  return (
    <div className="App">
      <h1>Inventory Management</h1>

      {/* Category Filter */}
      <select onChange={handleFilterChange} value={categoryFilter}>
        <option value="">All Categories</option>
        <option value="Electronics">Electronics</option>
        <option value="Furniture">Furniture</option>
        {/* Add more options as needed */}
      </select>

      {/* Sort Button */}
      <button onClick={handleSort}>
        Sort by Quantity ({sortOrder === 'asc' ? 'Ascending' : 'Descending'})
      </button>

      {/* Add/Edit Item Form */}
      <form onSubmit={handleAddItem}>
        <input
          type="text"
          name="name"
          placeholder="Item Name"
          value={newItem.name}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={newItem.category}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={newItem.quantity}
          onChange={handleInputChange}
        />
        <button type="submit">{editItem ? 'Update Item' : 'Add Item'}</button>
      </form>

      {/* Inventory Table */}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredInventory.map(item => (
            <tr key={item.id} style={{ backgroundColor: item.quantity < 10 ? 'red' : '' }}>
              <td>{item.name}</td>
              <td>{item.category}</td>
              <td>{item.quantity}</td>
              <td>
                <button onClick={() => handleDelete(item.id)}>Delete</button>
                <button onClick={() => handleEdit(item)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
