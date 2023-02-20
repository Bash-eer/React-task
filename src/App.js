import RowTask from './RowTask/RowTask.jsx';
import './App.css';
import ReactTask from './ReactTask/index.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <RowTask />
              </>
            }
          />
        </Routes>
        <Routes>
          <Route
            path="/addfields"
            element={
              <>
                <ReactTask />
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
