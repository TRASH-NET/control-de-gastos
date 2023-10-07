// ? Hooks
import { useEffect, useState } from 'react';

// * Components
import {Header} from './components/Header';
import { ListadoGastos } from './components/ListadoGastos';
import { Modal } from './components/Modal';
import { Filtros } from './components/Filtros';


// TODOS Funciones
import { generarID } from './helpers';

// ! images/icons/styles
import IconoNuevoGasto from './img/nuevo-gasto.svg';



function App() {

  const [presupuesto, setPresupuesto] = useState(
    Number(JSON.parse(localStorage.getItem('presupuesto'))) ?? 0
  );
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);  
  
  // * Modal
  const [modal, setModal] = useState(false);
  const [animarModal, setAnimarModal] = useState(false);

  const [gastos, setGastos] = useState(
    JSON.parse(localStorage.getItem('gastos') ?? [])
  );

  const [gastoEditar, setGastoEditar] = useState({});

  const [filtro, setFiltro] = useState('');
  const [gastosFiltrados, setGastosFiltrados] = useState([]);


  useEffect(() => {
    if(Object.keys(gastoEditar).length > 0){
      setModal(true);

      setTimeout(() => {
        setAnimarModal(true);
    }, 500);
    }
  }, [gastoEditar]);

  useEffect(() => {
    localStorage.setItem('presupuesto', presupuesto ?? 0);
  }, [presupuesto]);

  useEffect(() => {
    localStorage.setItem('gastos', JSON.stringify(gastos) ?? []);
  }, [gastos]);

  useEffect(() => {
    if(filtro){
      const gastosFiltrados = gastos.filter(gasto => gasto.categoria === filtro);
      setGastosFiltrados(gastosFiltrados);
    }
    
  }, [filtro, gastos]);

  useEffect(() => {
    const presupuestoLS = Number(localStorage.getItem('presupuesto') ?? 0);
    if(presupuestoLS > 0){
      setIsValidPresupuesto(true);
    }
  }, []);

  const handleNuevoGasto = () => {
    setModal(true);
    setGastoEditar({});

    setTimeout(() => {
        setAnimarModal(true);
    }, 500);
  };

  const guardarGasto = (gasto) => {
    
    if(gasto.id){
      const gastosActualizados = gastos.map( (gastoState) => gastoState.id === gasto.id ? gasto : gastoState);
      setGastos(gastosActualizados);
      setGastoEditar({});
    }else{
      gasto.id = generarID();
      gasto.fecha = Date.now();
      setGastos([...gastos, gasto]);
    }
    setAnimarModal(false);
    setTimeout(() => {
        setModal(false);
    }, 500);
  };

  const eliminarGasto = (id) => {
    const gastosActualizados = gastos.filter( gasto => gasto.id !== id);
    setGastos(gastosActualizados);
  };

  return (
    <div className={modal ? 'fijar' : ''}>
      <Header
        presupuesto = {presupuesto}
        setPresupuesto = {setPresupuesto}
        isValidPresupuesto = {isValidPresupuesto}
        setIsValidPresupuesto = {setIsValidPresupuesto}
        gastos = {gastos}
        setGastos = {setGastos}
      />
      {isValidPresupuesto && (
        <>
          <main>
            <Filtros
              filtro = {filtro}
              setFiltro = {setFiltro}
            />
            <ListadoGastos
              gastos = {gastos}
              setGastoEditar = {setGastoEditar}
              eliminarGasto = {eliminarGasto}
              filtro = {filtro}
              gastosFiltrados= {gastosFiltrados}

            />
          </main>
          <div className='nuevo-gasto'>
            <img 
              src={IconoNuevoGasto} 
              alt="icono nuevo gasto" 
              onClick={handleNuevoGasto}
            />
          </div>
        </> 
      )}

      {modal && <Modal 
                  modal = {modal} 
                  setModal={setModal}
                  animarModal = {animarModal}
                  setAnimarModal={setAnimarModal}
                  guardarGasto = {guardarGasto}
                  gastoEditar = {gastoEditar}
                  setGastoEditar = {setGastoEditar}
                />}   
    </div>
  );
}

export default App;
