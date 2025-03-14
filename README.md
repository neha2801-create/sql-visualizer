# SQL Query Visualizer

A modern, interactive tool for running SQL queries and visualizing the results in real-time.

![SQL Visualizer Screenshot](https://via.placeholder.com/800x450?text=SQL+Visualizer+Screenshot)

## Features

- 🌙 Dark/Light mode toggle for comfortable viewing in any environment
- 📊 Real-time visualization of query results
- 📝 Interactive SQL query editor
- 📚 Example tables and queries to help you get started
- 📋 Side-by-side display of query results and visualizations
- 🔍 Execution order visualization for educational purposes
- 📱 Responsive design that works on desktop and mobile devices

## Installation

### Prerequisites

- Node.js (v14.0.0 or higher)
- npm or yarn package manager

### Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/sql-visualizer.git
   cd sql-visualizer
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm start
   # or
   yarn start
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view the application in your browser.

## Backend Setup

The application requires a backend server to process SQL queries. By default, it connects to a server at `http://localhost:5000/query`.

### Setting up the backend:

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install backend dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the backend server:
   ```bash
   npm start
   # or
   yarn start
   ```

## Usage

1. **Explore Example Tables**: The application provides sample tables to understand the available data.

2. **Write or Select a Query**: Either write your own SQL query in the input box or select one of the example queries.

3. **Run the Query**: Click the "Run Query" button to execute your SQL query.

4. **View Results**: The results will appear below, showing both a tabular view and a visualization.

5. **Understand Execution Order**: For educational purposes, the application shows the order in which SQL clauses are executed.

## Technologies Used

- **Frontend**: React.js, Recharts for data visualization
- **Backend**: Node.js with Express
- **Styling**: Custom CSS with dark/light mode support
- **HTTP Requests**: Axios for API communication

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- React.js team for the excellent frontend library
- Recharts for the visualization components
- All contributors who have helped improve this project

