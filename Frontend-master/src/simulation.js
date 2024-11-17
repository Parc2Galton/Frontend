document.addEventListener("DOMContentLoaded", () => {
    const numBolasInput = document.getElementById("numBolas");
    const nivelesInput = document.getElementById("niveles");
    const startButton = document.getElementById("startButton");
    const progressSpan = document.getElementById("progress");

    const ctx = document.getElementById("distributionChart").getContext("2d");
    let chart = new Chart(ctx, {
        type: "bar",
        data: {
            labels: [],
            datasets: [
                {
                    label: "Número de Bolas",
                    data: [],
                    backgroundColor: "rgba(75, 192, 192, 0.6)",
                },
            ],
        },
    });

    const updateChart = (distribucion) => {
        const labels = Object.keys(distribucion).map((key) => `Contenedor ${key}`);
        const data = Object.values(distribucion);
        chart.data.labels = labels;
        chart.data.datasets[0].data = data;
        chart.update();
    };

    startButton.addEventListener("click", () => {
        const totalBolas = parseInt(numBolasInput.value, 10);
        const niveles = parseInt(nivelesInput.value, 10);

        fetch("/start", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ totalBolas, niveles }),
        });

        const ws = new WebSocket("ws://localhost:3000");

        ws.onmessage = (event) => {
            const { progreso, distribucion } = JSON.parse(event.data);
            progressSpan.textContent = progreso;
            updateChart(distribucion);
        };
    });
});
