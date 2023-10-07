// * Components
import { Budget } from "./Budget";
import { ControlPresupuesto } from "./ControlPresupuesto";
// ? Hooks

// ! Style

export const Header = ({
    presupuesto, 
    setPresupuesto, 
    isValidPresupuesto, 
    setIsValidPresupuesto,
    gastos,
    setGastos
}) => {
    return (
        <header>
            <h1>Planificador de Gastos</h1>
            {isValidPresupuesto ? (
                <ControlPresupuesto
                    presupuesto = {presupuesto}
                    setPresupuesto = {setPresupuesto}
                    gastos = {gastos}
                    setGastos = {setGastos}
                    setIsValidPresupuesto = {setIsValidPresupuesto}
                />
            ) : (
            <Budget
                presupuesto = {presupuesto}
                setPresupuesto = {setPresupuesto}
                isValidPresupuesto = {isValidPresupuesto}
                setIsValidPresupuesto = {setIsValidPresupuesto}
            />)}
        </header>
    );
};


