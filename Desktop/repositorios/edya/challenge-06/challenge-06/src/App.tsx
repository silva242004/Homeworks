import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./Context";
import Login from "./model/Login";
import StackPage from "./model/StackPage";
import QueuePage from "./model/QueuePage";
import PrivateRoute from "./model/PrivateRoute";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />

          <Route
            path="/stack"
            element={
              <PrivateRoute>
                <StackPage />
              </PrivateRoute>
            }
          />

          <Route
            path="/queue"
            element={
              <PrivateRoute>
                <QueuePage />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;