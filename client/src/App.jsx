import { Route, Routes } from "react-router-dom";
import "./App.css";
import IndexPage from "./pages/indexPage";
import LoginPage from "./pages/LoginPage";
import Layout from "./layouts/Layout";
import RegisterPage from "./pages/RegisterPage";
import { UserContextProvider } from "./UserContext";

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
