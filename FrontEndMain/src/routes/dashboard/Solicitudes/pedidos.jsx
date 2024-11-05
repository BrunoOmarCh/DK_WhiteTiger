import "../../../styles/panelCRUD.css"
import plusSVG from "../../../assets/plus.svg"
import TableCrud from "../../../components/tableCrud"
import { useNavigate, useLoaderData } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL;
export async function loadVehicles() {
    console.log("Trayendo datos")
    try {
        const response = await fetch(`${API_URL}/`);
        if (!response.ok) {
            throw new Error('Error al obtener los items');
        }
        const data = await response.json();
        return { data };
    } catch (error) {
        console.error('Error al obtener los items:', error);
        // Devuelve un objeto con data como array vacío en caso de error
        return { data: [] };
    }
}


const heads = [
  {
      id: 'ID Pedido',
      key: "idPedido",
      special: "",
      minWidth: 149,
  },
  {
      id: 'Estado',
      key: "estado",
      special: "",
      minWidth: 150,
  },
  {
      id: 'Peso',
      key: "peso",
      special: "",
      minWidth: 150,
  },
  {
      id: 'Volumen',
      key: "volumen",
      special: "",
      minWidth: 156,
  },
  {
    id: 'Latitud',
    key: "latitud",
    special: "",
    minWidth: 156,
  },
  {
    id: 'Altitud',
    key: "altitud",
    special: "",
    minWidth: 156,
  },
  {
    id: 'Opciones',
    key: "opciones",
    special: "",
    minWidth: 117,},
];

const rows = [];

function createData(idConductor, nombre, estado, categoria, actualizacion) {
    return { idConductor, nombre, estado, categoria, actualizacion };
}

for (let i = 0; i < 2; i++) {
  rows.push(createData(12345, "Juan Pérez", ["Activo"], "Premium", "1m"));
}

export default function Pedidos() {
  const navigate = useNavigate();
  const loaderData = useLoaderData();
  const data = loaderData?.data || []; // Si data es undefined, usa un array vacío
  console.log(data);
  return (
      <div className="panelCRUD">
          <div className="panelCRUD_tittle">
              <h2>Pedidos</h2>
          </div>
          <div className="panelCRUD_options">
              <button className="panelCRUD_button" onClick={() => {
                  navigate("/dashboard/solicitudes/pedidos/nuevoPedido");
              }}>
                  <div className="panelCRUD_icon">
                      <img src={plusSVG} alt="" />
                  </div>
                  Agregar Pedido
              </button>
          </div>
          <TableCrud heads={heads} rows={rows} />
      </div>
  );
}