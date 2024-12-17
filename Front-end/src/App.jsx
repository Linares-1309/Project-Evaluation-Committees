import { BrowserRouter, Routes, Route } from "react-router-dom";
// Parte Publica
import LayoutPublic from "./layout/layoutPublic/LayoutPublic.jsx";
import Home from "./layout/layoutPublic/Home.jsx";
import Contacto from "./layout/layoutPublic/Contacto.jsx";
import Login from "./layout/layoutPublic/Auth/FormLogin.jsx";
import ForgotPassword from "./layout/layoutPublic/Auth/ForgotPassword.jsx";
import NewPassword from "./layout/layoutPublic/Auth/NewPassword.jsx";

// Parte Privada
import UserPage from "./layout/layoutPrivate/UserPage.jsx";
import AdminPage from "./layout/layoutPrivate/AdminPage.jsx";
import IdeasList from "./layout/layoutPrivate/Ideas/IdeasList.jsx";
import EvaluationCommitteesList from "./layout/layoutPrivate/EvaluationCommittees/EvaluationCommitteesList.jsx";
import TableEvaluationCommittes from "./layout/layoutPrivate/EvaluationCommittees/TableEvaluationCommittees.jsx";
import ProponentsList from "./layout/layoutPrivate/Proponents/ProponentsList.jsx";
import CriteriaList from "./layout/layoutPrivate/Criteria/CriteriaList.jsx";
import UsersList from "./layout/layoutPrivate/Users/UsersList.jsx";
import Settings from "./layout/layoutPrivate/Settings/Settings.jsx";
import SetOfCriteriaList from "./layout/layoutPrivate/SetOfCriteria/SetOfCriteriaList.jsx";
import RubricsList from "./layout/layoutPrivate/Rubrics/RubricsList..jsx";
import { Provider } from "./context/Provider.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import UnauthorizedPage from "./components/Unauthorized.jsx";

function App() {
  return (
    <>
      <BrowserRouter
        future={{ v7_relativeSplatPath: true, v7_startTransition: true }}
      >
        <Provider>
          <Routes>
            {/* RUTAS PUBLICAS, NO REQUIEREN VALIDACION DE TOKEN */}
            <Route path="/" element={<LayoutPublic />}>
              <Route index element={<Home />} />
              <Route path="contact" element={<Contacto />} />
              <Route path="login" element={<Login />} />
              <Route path="forgot-password" element={<ForgotPassword />} />
              <Route path="forgot-password/:token" element={<NewPassword />} />
            </Route>

            {/* RUTAS DE ADMIN */}
            <Route element={<ProtectedRoute allowedRoles={["Admin"]} />}>
              <Route path="/admin/" element={<AdminPage />}>
                <Route index element={<Home />} />
                <Route path="ideas" element={<IdeasList />} />
                <Route path="comites" element={<EvaluationCommitteesList />} />
                <Route
                  path="comites/table"
                  element={<TableEvaluationCommittes />}
                />

                <Route path="proponentes" element={<ProponentsList />} />
                <Route path="criterios" element={<CriteriaList />} />
                <Route
                  path="conjunto-criterios"
                  element={<SetOfCriteriaList />}
                />
                <Route path="usuarios" element={<UsersList />} />
                <Route path="rubricas" element={<RubricsList />} />
                <Route path="ajustes" element={<Settings />} />
              </Route>
            </Route>
            {/* RUTAS DE CALIFICADOR */}
            <Route element={<ProtectedRoute allowedRoles={["Calificador"]} />}>
              <Route path="/user/" element={<UserPage />}>
                <Route
                  path="conjunto-criterios"
                  element={<SetOfCriteriaList />}
                />
                <Route index element={<Home />} />
                <Route path="criterios" element={<CriteriaList />} />
                <Route path="rubricas" element={<RubricsList />} />
                <Route path="proponentes" element={<ProponentsList />} />
                <Route path="ideas" element={<IdeasList />} />
                <Route path="comites" element={<EvaluationCommitteesList />} />
                <Route
                  path="comites/table"
                  element={<TableEvaluationCommittes />}
                />
                <Route path="ajustes" element={<Settings />} />
              </Route>
            </Route>
            <Route path="/unauthorized" element={<UnauthorizedPage />} />
          </Routes>
        </Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
