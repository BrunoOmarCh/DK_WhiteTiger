import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { AuthProvider } from './context/AuthContext'; 
import { UserProvider } from './context/UserContext'; 
import Root from "./routes/root";
import ErrorPage from "./routes/error-page";
import Login from "./routes/login";
import Dashboard from "./routes/dashboard/dashboard";
import Panel from "./routes/dashboard/panel/panel";
import MiRuta, {action as miRutaAction} from "./routes/dashboard/Solicitudes/miRuta";

import RutasVista from "./routes/dashboard/flotas/rutasVista";
import FormVehiculo from "./routes/dashboard/flotas/formVehiculo";
import PrivateRoute from "./routes/PrivateRoute";
import { action as vehicleCreate } from "./routes/dashboard/flotas/formVehiculo";
import RoleRoute from "./routes/PrivateRoute";
import FormConductor from "./routes/dashboard/flotas/formConductores";
import { action as conductorCreate } from "./routes/dashboard/flotas/formConductores";
import { loaderVehiculosYUsuarios } from "./routes/loaders/loaderVehiculos";
import FormConductorEdit, { action } from './routes/dashboard/flotas/formConductoresEdit';
import FormVehiculoEdit, { loader as formVehiculoEditLoader, actionv }  from "./routes/dashboard/flotas/formVehiculoEdit";

import Solicitudes from "./routes/dashboard/Solicitudes/solicitudes";
import Pedidos from "./routes/dashboard/Solicitudes/pedidos";
import { loaderPedidos } from "./routes/loaders/loaderPedidos";
import FormPedido from "./routes/dashboard/Solicitudes/formPedido";
import { action as pedidoCreate } from "./routes/dashboard/Solicitudes/formPedido";
import Ordenes from "./routes/dashboard/Solicitudes/ordenes";
import { loaderMiRuta } from "./routes/loaders/loaderMiRuta";

import Flotas from "./routes/dashboard/flotas/flotas";
import Rutas, {action as RutasAction} from "./routes/dashboard/rutas/rutas";
import Vehiculos from "./routes/dashboard/flotas/vehiculos";
import Conductores from "./routes/dashboard/flotas/conductores";
import { loaderConductores } from "./routes/loaders/loaderConductores";
import UsuarioDetalles, {loader as UsuarioDetallesloader} from "./routes/dashboard/user/userdata";
import VehiculosActivos from "./routes/dashboard/flotas/vehiculosActivos";

import { loaderPeticiones } from "./routes/loaders/loaderPeticiones";
import { loaderRecorridos } from "./routes/loaders/loaderRecorridos";
import { loaderEnvios } from "./routes/loaders/loaderEnvios";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,  
    errorElement: <ErrorPage />
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Panel/>
      },
      {
        path: "ruta/:idRuta",
        element: (
          <PrivateRoute allowedRoles={['admin', 'conductor']}>
            <MiRuta />
          </PrivateRoute>
        ),
        loader: loaderMiRuta,
        action: miRutaAction
      },
      {
        path: "solicitudes",
        element: (
          <PrivateRoute allowedRoles={['admin', 'conductor']}>
            <Solicitudes />
          </PrivateRoute>
        ),
        children: [
          {
            path: "ordenes",
            element: (
              <PrivateRoute allowedRoles={['admin', 'conductor']}>
                <Ordenes />
              </PrivateRoute>
            ),
            loader: loaderEnvios
          },
          {
            path: "pedidos",
            element: (
              <PrivateRoute allowedRoles={['admin']}>
                <Pedidos />
              </PrivateRoute>
            ),
            loader: loaderPedidos
          },
          {
            path: "pedidos/nuevoPedido",
            element: (
              <PrivateRoute allowedRoles={['admin']}>
                <FormPedido />
              </PrivateRoute>
            ),
            action: pedidoCreate
          },
        ]
      },
      {
        path: "flotas",
        element: (
          <PrivateRoute allowedRoles={['admin']}>
            <Flotas />
          </PrivateRoute>
        ),
        children: [
          {
            path: "vehiculos",
            element: (
              <PrivateRoute allowedRoles={['admin']}>
                <Vehiculos />
              </PrivateRoute>
            ),
            loader: loaderVehiculosYUsuarios
          },
          {
            path: "conductores",
            element: (
              <PrivateRoute allowedRoles={['admin']}>
                <Conductores />
              </PrivateRoute>
            ),
            loader: loaderConductores
          },
          {
            path: "rutas",
            element: (
              <PrivateRoute allowedRoles={['admin']}>
                <RutasVista />
              </PrivateRoute>
            ),
            loader: loaderRecorridos
          },
          {
            path: "vehiculos/nuevoVehiculo",
            element: (
              <PrivateRoute allowedRoles={['admin']}>
                <FormVehiculo />
              </PrivateRoute>
            ),
            loader: loaderVehiculosYUsuarios,
            action: vehicleCreate
          },
          {
            path: "conductores/nuevoConductor",
            element: (
              <PrivateRoute allowedRoles={['admin']}>
                <FormConductor />
              </PrivateRoute>
            ),
            loader: loaderVehiculosYUsuarios,
            action: conductorCreate
          },
          {
            path: "conductores/formConductoresEdit/:idConductor",
            element: (
              <PrivateRoute allowedRoles={['admin']}>
                <FormConductorEdit />
              </PrivateRoute>
            ),
            loader: loaderVehiculosYUsuarios,
            action: action
          },
          {
            path: "vehiculos/formVehiculoEdit/:placa",
            element: (
              <PrivateRoute allowedRoles={['admin']}>
                <FormVehiculoEdit />
              </PrivateRoute>
            ),
            loader: loaderVehiculosYUsuarios,
            action: actionv
          },
          {
            path: "vehiculos/vehiculosActivos",
            element: (
              <PrivateRoute allowedRoles={['admin']}>
                <VehiculosActivos />
              </PrivateRoute>
            ),
            loader: loaderVehiculosYUsuarios,
          }
        ]
      },
      {
        path: "rutas",
        element: (
          <PrivateRoute allowedRoles={['admin', 'conductor']}>
            <Rutas />
          </PrivateRoute>
        ),
        loader: loaderPeticiones,
        action: RutasAction
      },
      {
        path: "user",
        element: (
          <PrivateRoute allowedRoles={['admin', 'conductor']}>
            <UsuarioDetalles />
          </PrivateRoute>
        ),
        loader: UsuarioDetallesloader
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>    
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
    </AuthProvider>
  </React.StrictMode>
);
