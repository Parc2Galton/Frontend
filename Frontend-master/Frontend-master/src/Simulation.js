import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Chart from "chart.js/auto";

function Simulation() {
    const location = useLocation();
    const { numBolas, niveles } = location.state;
    const [distribucion, setDistribucion] = useState({});
    const [progreso, setProgreso] = useState(0);

    useEffect(() => {
        const ws = new WebSocket("ws://localhost:8080/simulation");

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            setDistribucion(data.distribucion);
            setProgreso(data.progreso);
        };

        ws.onclose = () => console.log("WebSocket cerrado");
        return () => ws.close();
    }, []);

    useEffect(() => {
        if (Object.keys(distribucion).length > 0) {
            const ctx = document.getElementById("distributionChart").getContext("2d");
            new Chart(ctx, {
                type: "bar",
                data: {
                    labels: Object.keys(distribucion),
                    datasets: [
                        {
                            label: "Número de bolas",
                            data: Object.values(distribucion),
                            backgroundColor: "rgba(75, 192, 192, 0.6)",
                        },
                    ],
                },
            });
        }
    }, [distribucion]);

    return (
        <div className="simulation">
            <h1>Simulación de Producción</h1>
            <div className="progreso">
                <h2>Progreso: {progreso}%</h2>
            </div>
            <div className="visualizacion">
                <canvas id="distributionChart"></canvas>
            </div>
        </div>
    );
}

