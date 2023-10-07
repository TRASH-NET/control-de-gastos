import { useEffect, useState } from 'react';
import { Mensaje } from './Mensaje';
import CerrarBtn from '../img/cerrar.svg';

export const Modal = ({
    setModal, 
    animarModal, 
    setAnimarModal, 
    guardarGasto,
    gastoEditar,
    setGastoEditar
}) => {
    
    const [nombre, setNombre] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [categoria, setCategoria] = useState('');
    const [mensaje, setMensaje] = useState('');
    const [id, setId] = useState('');
    const [fecha, setFecha] = useState('');
    
    useEffect(() => {
        if(Object.keys(gastoEditar).length > 0){
            setNombre(gastoEditar.nombre);
            setCantidad(gastoEditar.cantidad);
            setCategoria(gastoEditar.categoria);
            setId(gastoEditar.id);
            setFecha(gastoEditar.fecha);
        }
    }, []);

    const ocultarModal = () => {
        setAnimarModal(false);
        setGastoEditar('');
        setTimeout(() => {
            setModal(false);
        }, 500);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if([nombre, cantidad, categoria].includes('') || cantidad === 0) {
            setMensaje('Todos los campos son obligatorios');
            
            setTimeout(() => {
                setMensaje('');
            }, 2000);
            
            return;
        }

        guardarGasto({nombre, cantidad, categoria, id, fecha});
    };
    
    return (
        <div className="modal">
            <div className="cerrar-modal">
                <img 
                    src={CerrarBtn} 
                    alt="cerrar"
                    onClick={ocultarModal} 
                />
            </div>
            <form 
                className={`formulario ${animarModal ? 'animar' : 'cerrar'}`} 
                action=""
                autoComplete="off"
                onSubmit={handleSubmit}
            >
                <legend>{gastoEditar.nombre ? 'Editar Gasto' : 'Nuevo Gasto'}</legend>
                
                {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}


                <div className='campo'>
                    <label htmlFor="nombre">Nombre Gasto</label>
                    <input 
                        id='nombre'
                        type="text"
                        placeholder='Añade el Nombre del Gasto'
                        value={nombre}
                        onChange={e => setNombre(e.target.value)}
                    />
                </div>
                <div className='campo'>
                    <label htmlFor="cantidad">Cantidad</label>
                    <input 
                        id='cantidad'
                        type="number"
                        placeholder='Añade la cantidad del Gasto'
                        value={cantidad}
                        onChange={e => setCantidad(Number(e.target.value))}
                    />
                </div>
                <div className='campo'>
                    <label htmlFor="cantidad">Categoria</label>
                    <select 
                        name="" 
                        id="categoria"
                        value={categoria}
                        onChange={e => setCategoria(e.target.value)}
                    >
                        <option value="">-- Seleccione --</option>
                        <option value="ahorro">Ahorro</option>
                        <option value="comida">Comida</option>
                        <option value="casa">Casa</option>
                        <option value="gastos varios">Gastos varios</option>
                        <option value="recreacion">Recreacion</option>
                        <option value="salud">Salud</option>
                        <option value="suscripciones">Suscripciones</option>
                    </select>
                </div>
                <input 
                    type="submit" 
                    value={gastoEditar.nombre ? 'Guardar Cambios' : 'Añadir Gasto'}
                />
            </form>
        </div>
    );
};

