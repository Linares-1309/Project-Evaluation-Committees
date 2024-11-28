import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider.jsx";

// Parte Publica
import LayoutPublic from "./layout/layoutPublic/LayoutPublic.jsx";
import Home from "./layout/layoutPublic/Home.jsx";
import Contacto from "./layout/layoutPublic/Contacto.jsx";
import Login from "./layout/layoutPublic/Auth/FormLogin.jsx";
import ForgotPassword from "./layout/layoutPublic/Auth/ForgotPassword.jsx";
import NewPassword from "./layout/layoutPublic/Auth/NewPassword.jsx";

// Parte Privada
import LayoutPrivate from "./layout/layoutPrivate/LayoutPrivate.jsx";
import IdeasList from "./layout/layoutPrivate/Ideas/IdeasList.jsx";
import CrudEvaluationCommittees from "./layout/layoutPrivate/EvaluationCommittees/CrudEvaluationCommittees.jsx";
import ProponentsList from "./layout/layoutPrivate/Proponents/ProponentsList.jsx";
import CriteriaList from "./layout/layoutPrivate/Criteria/CriteriaList.jsx";
import CrudUsers from "./layout/layoutPrivate/Users/CrudUsers.jsx";
import Settings from "./layout/layoutPrivate/Settings/Settings.jsx";
import UserProfile from "./layout/layoutPrivate/UserProfile/UserProfile.jsx";
import SetOfCriteriaList from "./layout/layoutPrivate/SetOfCriteria/SetOfCriteriaList.jsx";

function App() {
  return (
    <>
      <BrowserRouter
        future={{ v7_relativeSplatPath: true, v7_startTransition: true }}
      >
        <AuthProvider>
          <Routes>
            <Route path="/" element={<LayoutPublic />}>
              <Route index element={<Home />} />
              <Route path="contact" element={<Contacto />} />
              <Route path="login" element={<Login />} />
              <Route path="forgot-password" element={<ForgotPassword />} />
              <Route path="forgot-password/:token" element={<NewPassword />} />
            </Route>
            <Route path="/admin/" element={<LayoutPrivate />}>
              <Route index element={<Home />} />
              <Route path="ideas" element={<IdeasList />} />
              <Route path="comites" element={<CrudEvaluationCommittees />} />
              <Route path="proponentes" element={<ProponentsList />} />
              <Route path="criterios" element={<CriteriaList />} />
              <Route
                path="conjunto-criterios"
                element={<SetOfCriteriaList />}
              />
              <Route path="usuarios" element={<CrudUsers />} />
              <Route path="ajustes" element={<Settings />} />
              <Route path="perfil" element={<UserProfile />} />
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
