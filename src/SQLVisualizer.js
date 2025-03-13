import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
// Make sure this import is included and points to the correct CSS file
import "./SQLVisualizer.css";
import SliderToggle from "./SliderToggle"; // Import the new slider toggle component

const demoTables = [
  {
    name: "employees",
    columns: ["id", "name", "department", "salary"],
    data: [
      { id: 1, name: "Alice", department: "IT", salary: 70000 },
      { id: 2, name: "Bob", department: "HR", salary: 60000 },
      { id: 3, name: "Charlie", department: "Marketing", salary: 75000 },
    ],
  },
  {
    name: "departments",
    columns: ["id", "department_name", "manager"],
    data: [
      { id: 1, department_name: "IT", manager: "David" },
      { id: 2, department_name: "HR", manager: "Eve" },
      { id: 3, department_name: "Marketing", manager: "Frank" },
    ],
  },
];

const exampleQueries = [
  { label: "Get all employees", query: "SELECT * FROM employees;" },
  { label: "Find employees in IT department", query: "SELECT * FROM employees WHERE department = 'IT';" },
  { label: "Find departments with managers", query: "SELECT * FROM departments WHERE manager IS NOT NULL;" },
  { label: "Join employees and departments", query: "SELECT employees.name, departments.department_name FROM employees JOIN departments ON employees.department = departments.department_name;" }
];

const SQLVisualizer = () => {
  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [executionOrder, setExecutionOrder] = useState([]);
  const [error, setError] = useState("");
  const [darkMode, setDarkMode] = useState(true);
  const [showHighlight, setShowHighlight] = useState(false);
  
  const resultsRef = useRef(null);

  // Toggle dark mode function
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Parse SQL Execution Order
  const parseQueryExecutionOrder = (query) => {
    const sqlSteps = ["FROM", "JOIN", "WHERE", "GROUP BY", "HAVING", "SELECT", "ORDER BY", "LIMIT"];
    return sqlSteps.filter((step) => query.toUpperCase().includes(step));
  };

  const runQuery = async () => {
    setError("");
    try {
      const response = await axios.post("http://localhost:5000/query", { query });
      setData(response.data.rows);
      setColumns(response.data.columns);
      setExecutionOrder(parseQueryExecutionOrder(query));
      setShowHighlight(true);
    } catch (err) {
      setError("Invalid SQL Query! Please check your syntax.");
    }
  };

  // Scroll to results function
  const scrollToResults = () => {
    if (resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Reset highlight after 5 seconds
  useEffect(() => {
    let timer;
    if (showHighlight) {
      timer = setTimeout(() => {
        setShowHighlight(false);
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [showHighlight]);

  // For testing - uncomment to see demo data
  // useEffect(() => {
  //   setData(demoTables[0].data);
  //   setColumns(demoTables[0].columns);
  // }, []);

  return (
    <div className={`container ${darkMode ? "dark" : "light"}`}>
      <div className={`background-blur ${darkMode ? "dark" : "light"}`}></div>

      {/* Modern Slider Toggle */}
      <div className="toggle-container">
        <SliderToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      </div>

      <h2>SQL Query Runner & Visualizer</h2>

      {/* Demo Tables */}
      <div className="demo-tables">
        <h3>Example Tables</h3>
        <div className="tables-flex-container">
          {demoTables.map((table, index) => (
            <div key={index} className="table-container">
              <h4>{table.name}</h4>
              <table>
                <thead>
                  <tr>
                    {table.columns.map((col) => (
                      <th key={col}>{col}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {table.data.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {table.columns.map((col) => (
                        <td key={col}>{row[col]}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      </div>

      {/* Example Queries */}
      <div className="example-queries">
        <h3>Example Queries</h3>
        <div className="buttons-container">
          {exampleQueries.map((exQuery, index) => (
            <button key={index} onClick={() => setQuery(exQuery.query)}>
              {exQuery.label}
            </button>
          ))}
        </div>
      </div>

      {/* Query Input */}
      <div className="input-container">
        <textarea value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Enter your SQL query here..." />
        <button className="run-button" onClick={runQuery}>Run Query</button>
      </div>

      {/* Error Message */}
      {error && <p className="error-message">{error}</p>}

      {/* Execution Order */}
      {executionOrder.length > 0 && (
        <div className="execution-order">
          <h3>SQL Execution Order</h3>
          <ol>
            {executionOrder.map((step, index) => <li key={index}>{step}</li>)}
          </ol>
          
          {/* Highlight Button to Show Results */}
          <div className="highlight-button-container">
            <button 
              className={`view-results-button ${showHighlight ? 'highlight-pulse' : ''}`}
              onClick={scrollToResults}
            >
              View Results
            </button>
          </div>
        </div>
      )}

      {/* Results and Visualization Side by Side */}
      {data.length > 0 && (
        <div className="result-visualization-container" ref={resultsRef}>
          <h3>Query Results and Visualization</h3>
          <div className="result-visualization-flex">
            {/* Query Results */}
            <div className="results-section">
              <h4>Query Results</h4>
              <div className="table-wrapper">
                <table>
                  <thead>
                    <tr>{columns.map((col) => <th key={col}>{col}</th>)}</tr>
                  </thead>
                  <tbody>
                    {data.map((row, index) => (
                      <tr key={index}>{columns.map((col) => <td key={col}>{row[col]}</td>)}</tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Visualization */}
            <div className="chart-section">
              <h4>Data Visualization Hover below to see</h4>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data}>
                  <XAxis dataKey={columns[0]} stroke={darkMode ? "white" : "black"} />
                  <YAxis stroke={darkMode ? "white" : "black"} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey={columns[1] || "value"} fill="#4CAF50" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SQLVisualizer;