import React, { Fragment, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';

const Formulario = ({ crearCita }) => {
	const [cita, actulizarCita] = useState({
		mascota: '',
		propietario: '',
		fecha: '',
		hora: '',
		sintomas: '',
	});
	// agregado estado de error
	const [error, actulizarError] = useState(false);

	// funcion que se ejecuta cada vez que el usuario escriba en el input
	const actulizarState = (e) => {
		actulizarCita({
			...cita,
			[e.target.name]: e.target.value,
		});
	};

	// extrar los valores
	const { mascota, propietario, fecha, hora, sintomas } = cita;

	//cuando el usuario presiona para agregar cita
	const submitCita = (e) => {
		e.preventDefault();

		//validar
		if (
			mascota.trim() === '' ||
			propietario.trim() === '' ||
			fecha.trim() === '' ||
			hora.trim() === '' ||
			sintomas.trim() === ''
		) {
			actulizarError(true);
			return;
		}
		//eliminar el mensaje de error
		actulizarError(false);
		//asignar un id
		cita.id = uuidv4();
		//crear la cita
		crearCita(cita);
		//reiniciar el form
		actulizarCita({
			mascota: '',
			propietario: '',
			fecha: '',
			hora: '',
			sintomas: '',
		});
	};

	return (
		<Fragment>
			<h2>Crear citas</h2>
			{error ? (
				<p className="alerta-error">Todos los campos son obligatorio</p>
			) : null}
			<form onSubmit={submitCita}>
				<label>Nombre Mascota</label>
				<input
					type="text"
					name="mascota"
					className="u-full-width"
					placeholder="Nombre Mascota"
					onChange={actulizarState}
					value={mascota}
				/>
				<label>Nombre Dueño</label>
				<input
					type="text"
					name="propietario"
					className="u-full-width"
					placeholder="Nombre Dueño"
					onChange={actulizarState}
					value={propietario}
				/>
				<label>Fecha</label>
				<input
					type="date"
					name="fecha"
					className="u-full-width"
					onChange={actulizarState}
					value={fecha}
				/>
				<label>Hora</label>
				<input
					type="time"
					name="hora"
					className="u-full-width"
					onChange={actulizarState}
					value={hora}
				/>
				<label>Sintomas</label>
				<textarea
					className="u-full-width"
					name="sintomas"
					onChange={actulizarState}
					value={sintomas}
				></textarea>
				<button type="submit" className="u-full-width button-primary">
					Agregar cita
				</button>
			</form>
		</Fragment>
	);
};

Formulario.proptoTypes = {
	crearCita: PropTypes.func.isRequired,
};

export default Formulario;
