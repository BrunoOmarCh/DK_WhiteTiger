import "../../../styles/panelCRUD.css";
import plusSVG from "../../../assets/plus.svg";
import TableCrud from "../../../components/tableCrud";
import { useNavigate, useLoaderData } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

const heads = [
    { id: "Placa Vehicular", key: "placa", special: "", minWidth: 149 },
    { id: "Capacidad Usada", key: "capacidad", special: "special", minWidth: 112 },
    { id: "Maxima Capacidad", key: "maxCapacidad", special: "special", minWidth: 112 },
    { id: "Maximo Recorrido", key: "maxRecorrido", special: "special", minWidth: 112 },
    { id: "Estado", key: "estado", special: "", minWidth: 150 },
    { id: "Ubicación", key: "ubicacion", special: "special", minWidth: 145 },
    { id: "Actualización", key: "actualizacion", special: "special", minWidth: 156 },
    { id: "Opciones", key: "opciones", special: "", minWidth: 117 },
];

export default function VehiculosActivos() {
    const navigate = useNavigate();
    const { vehiculos: initialVehiculos = [] } = useLoaderData();

    // Filtrar y crear las filas de la tabla solo para vehículos con estado "Activo"
    const rows = initialVehiculos
        .filter((vehiculo) => vehiculo.estado_nombre === "Activo") // Filtra los vehículos activos
        .map((vehiculo) => ({
            placa: vehiculo.vehiculo_placa,
            capacidad: vehiculo.vehiculo_capacidad,
            maxCapacidad: vehiculo.vehiculo_max_dist_dia,
            maxRecorrido: vehiculo.vehiculo_max_dist_dia,
            estado: vehiculo.estado_nombre,
            color: vehiculo.color_nombre,
            marca: vehiculo.marca_nombre,
            usuario: vehiculo.usuario_asociado,
            opciones: vehiculo.estado_nombre === "Inactivo",
        }));

    const handleEdit = (placa) => {
        navigate(`/dashboard/flotas/vehiculos/formVehiculoEdit/${placa}`);
    };

    const handleDelete = async (placa, estado) => {
        console.log("Intentando eliminar vehículo:", { placa, estado });

        if (!estado) {
            console.error("El estado no está definido para el vehículo con placa:", placa);
            return;
        }

        if (estado !== "Inactivo") {
            alert("Solo los vehículos con estado 'Inactivo' pueden ser eliminados.");
            return;
        }

        if (window.confirm("¿Estás seguro de que deseas eliminar este vehículo?")) {
            try {
                console.log(`Eliminando vehículo con placa: ${placa}...`);
                const response = await fetch(`${API_URL}/vehiculos/${placa}/`, {
                    method: "DELETE",
                    headers: { "Content-Type": "application/json" },
                });

                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(
                        `Error al eliminar el vehículo. Estado: ${response.status}, Error: ${errorText}`
                    );
                }

                console.log("Vehículo eliminado correctamente.");
                setVehiculos((prevVehiculos) =>
                    prevVehiculos.filter((vehiculo) => vehiculo.placa !== placa)
                );
            } catch (error) {
                console.error("Error al eliminar el vehículo:", error);
                alert("Hubo un error al intentar eliminar el vehículo. Por favor, inténtalo de nuevo.");
            }
        }
    };

    return (
        <div className="panelCRUD">
            <div className="panelCRUD_tittle">
                <h2>Vehículos Activos</h2>
            </div>
            <div className="panelCRUD_options">
                <button
                    className="panelCRUD_button"
                    onClick={() => navigate("/dashboard/flotas/vehiculos/nuevoVehiculo")}
                >
                    <div className="panelCRUD_icon">
                        <img src={plusSVG} alt="" />
                    </div>
                    Agregar Vehículo
                </button>
            </div>
            <TableCrud
                heads={heads}
                rows={rows}
                onEdit={handleEdit}
                onDelete={(placa) => {
                    const row = rows.find((vehiculo) => vehiculo.placa === placa);
                    handleDelete(placa, row?.estado);
                }}
            />
        </div>
    );
}
