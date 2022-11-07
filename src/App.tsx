import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Main from "./components/Main";
import Register from "./components/Register";
import { QueryClient, QueryClientProvider } from "react-query";
const App = () => {
    const queryClient = new QueryClient();
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Login />} />
                <Route path='/playground' element={<Main />} />
                <Route
                    path='/register'
                    element={
                        <QueryClientProvider client={queryClient}>
                            <Register />
                        </QueryClientProvider>
                    }
                />
            </Routes>
        </Router>
    );
};

export default App;
