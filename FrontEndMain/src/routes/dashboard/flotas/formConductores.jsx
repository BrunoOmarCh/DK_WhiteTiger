import { useNavigate, Form, useActionData, useLoaderData } from 'react-router-dom';
import "../../../styles/vehiculos.css";
import SelectInputLabel from '../../../components/selectInputLabel';
import TextInput from '../../../components/textInput';
import { useUser } from '../../../context/UserContext';

export async function action({ request }) {
  const formData = await request.formData();
  
  const data = {
      usuario: formData.get("id_usuario"),  
      vehiculo: formData.get("id_vehiculo"),
      estado: formData.get("estado"),
      breve: formData.get("breve"), 
  };
  
  console.log("Datos enviados al backend:", data);
  
  try {
      const response = await fetch("http://127.0.0.1:8000/api/v1/conductores/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data)
      });
      
      if (!response.ok) throw new Error("Error al enviar datos");
      return { success: true };
  } catch (error) {
      console.error("Error:", error);
      return { success: false, error: error.message };
  }
}

const estados = [
    { label: 'Activo', value: 'Activo' },
    { label: 'Inactivo', value: 'Inactivo' },
];

export default function FormConductor() {
    const navigate = useNavigate();
    const actionData = useActionData();
    const { vehiculos = [] } = useLoaderData() || {};
    const { userId } = useUser();

    const vehiculoOptions = vehiculos.map(vehiculo => ({
        label: `${vehiculo.marca} - ${vehiculo.placa}`,
        value: vehiculo.placa 
    }));

    function handleKeyDown(event) {
        if (event.keyCode === 13) {
            event.preventDefault();
        }
    }

    return (
        <div className="vehiculosBlock">
          <div className="vehiculosBlock_tittle">
            <h2>Conductores</h2>
          </div>
          <div className="vehiculosBlock_container">
            <fieldset className="vehiculosBlock_formContainer">
              <legend>Agregar Conductor</legend>
              <Form method="post">
                {actionData?.error && (
                    <p className="errorMessage">{actionData.error}</p>
                )}
                
                <input type="hidden" name="id_usuario" value={userId || ""} />

                <SelectInputLabel 
                  containerClass="vehiculosBlock_formInput"
                  options={vehiculoOptions} 
                  info="Vehículo Asociado" 
                  name="id_vehiculo" 
                  placeholder="Seleccionar vehículo" 
                  required 
                />

                <SelectInputLabel 
                  containerClass="vehiculosBlock_formInput"
                  options={estados} 
                  info="Estado" 
                  name="estado" 
                  placeholder="Seleccionar estado" 
                  required
                />
                <TextInput 
                  containerClass="vehiculosBlock_formInput"
                  info="Brevete" 
                  name="breve"  
                  placeholder="Ej: ABC-123" 
                  required
                />

                <div className="vehiculosBlock_buttonGroup">
                  <button type="reset" onClick={() => navigate(-1)}>
                    Cancelar
                  </button>
                  <button type="submit">Guardar</button>
                </div>
              </Form>
            </fieldset>
          </div>
        </div>
      );
}