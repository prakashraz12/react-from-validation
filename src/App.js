import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import { QueryClient, QueryClientProvider } from 'react-query'
 
 const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
      </Routes>
      </BrowserRouter>
      </QueryClientProvider>
  );
}

export default App;
