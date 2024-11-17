import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
    const [numBolas, setNumBolas] = useState(100);
    const [niveles, setNiveles] = useState(10);
    const navigate = useNavigate();

    const iniciarSimulacion = () => {
        navigate("/simulation", { state: { numBolas, niveles } });
    };

    return (
        <div className="home">
            <h1>Fábrica de Producción</h1>
            <div>
                <label>Número de Bolas:</label>
                <input
                    type="number"
                    value={numBolas}
                    onChange={(e) => setNumBolas(e.target.value)}
                />
            </div>
            <div>
                <label>Niveles del Tablero:</label>
                <input
                    type="number"
                    value={niveles}
                    onChange={(e) => setNiveles(e.target.value)}
                />
            </div>
            <button onClick={iniciarSimulacion}>Iniciar Simulación</button>
        </div>
    );
}

