import { createRouter } from 'react-router-dom';
import LayoutPublic from '../layout/layoutPublic/LayoutPublic.jsx';
import Home from '../layout/layoutPublic/Home.jsx';
import Contacto from '../layout/layoutPublic/Contacto.jsx';
import Login from '../layout/layoutPublic/Auth/FormLogin.jsx';
import ForgotPassword from '../layout/layoutPublic/Auth/ForgotPassword.jsx';
import NewPassword from '../layout/layoutPublic/Auth/NewPassword.jsx';
import LayoutPrivate from '../layout/layoutPrivate/LayoutPrivate.jsx';

// Definir las rutas
export const routes = [
  {
    path: '/',
    element: <LayoutPublic />,
    children: [
      {
        index: true,
        element: <Home />,  // Ruta por defecto en / (home)
      },
      {
        path: 'contact',
        element: <Contacto />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'forgot-password',
        element: <ForgotPassword />,
      },
      {
        path: 'forgot-password/:token',
        element: <NewPassword />,
      },
    ],
  },
  {
    path: '/admin',
    element: <LayoutPrivate />,
    // Aquí puedes agregar rutas privadas si las tienes
  },
];

// Crear el enrutador
export const router = createRouter({
  routes,  // Usamos las rutas definidas anteriormente
});
