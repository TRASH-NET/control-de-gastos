import { useEffect, useState } from "react";
import { formatearCantidad } from "../helpers";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export const ControlPresupuesto = ({
    presupuesto,
    setPresupuesto, 
    gastos,
    setGastos,
    setIsValidPresupuesto
}) => {
    
    const [porcentaje, setPorcentaje] = useState(0);
    const [disponible, setDisponible] = useState(0);
    const [gastado, setGastado] = useState(0);
    
    useEffect(() => {
        const totalGastado = gastos.reduce( (total, gasto) => gasto.cantidad + total, 0);
        const totalDisponible = presupuesto - totalGastado;
        
        setGastado(totalGastado);
        setDisponible(totalDisponible);

        // ? Calcular el porcentaje gastado
        const nuevoPorcentaje = (((presupuesto - totalDisponible) / presupuesto) * 100).toFixed(2);
        setTimeout(() => {
            setPorcentaje(nuevoPorcentaje);
        }, 800);
        

    }, [gastos, presupuesto]);
    
    const handleResetApp = () => {
        const resultado = confirm('¿Deseas reiniciar tu presupuesto?');

        if(resultado){
            setGastos([]);
            setPresupuesto(0);
            setIsValidPresupuesto(false);
        }
    };


    return (
        <div className="contenedor-presupuesto contenedor sombra">
            <div>
                <CircularProgressbar
                styles={buildStyles({
                    pathColor: porcentaje > 100 ? '#DC2626' : '#3B82F6',
                    trailColor: '#F5F5F5',
                    textColor: porcentaje > 100 ? '#DC2626' : '#3B82F6'
                })}
                value={porcentaje}
                text={`${porcentaje}% Gastado`}
                />
            </div>
            <div className="contenido-presupuesto">
                    <button 
                        className="reset-app"
                        type="button"
                        onClick={handleResetApp}
                    >
                        Resetear App
                    </button>
                    <p>
                        <span>Presupuesto: </span> {formatearCantidad(presupuesto)}
                    </p>
                    <p className={`${disponible < 0 ?'negativo' : ''}`}>
                        <span>Disponible: </span> {formatearCantidad(disponible)}
                    </p>
                    <p>
                        <span>Gastado: </span> {formatearCantidad(gastado)}
                    </p>
            </div>
        </div>
    );
};


