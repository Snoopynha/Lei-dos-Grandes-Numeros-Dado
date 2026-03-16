let graficoInstances = [];
let graficoJuntoInstance = null;
let ultimosDados = null;

function iniciarLancamentos() {
    const qtdLancamentos = document.getElementById('qtdLancamentos').value;
    const intervaloLancamentos = document.getElementById('intervaloLancamentos').value;
    
    const iconElement = document.getElementById('dice-icon');
    const container = document.querySelector('.dice');
    const icons = [
        'fa-dice-one', 'fa-dice-two', 'fa-dice-three', 
        'fa-dice-four', 'fa-dice-five', 'fa-dice-six'
    ];

    container.classList.add('shaking');
    let shuffleCount = 0;
    const shuffleInterval = setInterval(() => {
        const randomIcon = icons[Math.floor(Math.random() * 6)];
        iconElement.className = 'fa-solid ' + randomIcon;
        shuffleCount++;
    }, 80);

    fetch(`/lancar?qtdLancamentos=${qtdLancamentos}&intervaloLancamentos=${intervaloLancamentos}`)
        .then(response => response.json())
        .then(data => {
            setTimeout(() => {
                clearInterval(shuffleInterval);
                container.classList.remove('shaking');
                const finalIcon = icons[Math.floor(Math.random() * 6)];
                iconElement.className = 'fa-solid ' + finalIcon;

                atualizarGraficos(data);
            }, 1000);
        });
}

function graficoJunto(data) {
    document.getElementById('containerJunto').style.display = 'block';
    document.getElementById('containerSeparado').style.display = 'none';

    limparGraficos();

    // Configuração básica
    const commonOptions = {
        responsive: true,
        maintainAspectRatio: false,
        elements: { point: { radius: 2 } },
        scales: {
            y: {
                min: 0,
                max: 1,
                title: { display: true, text: 'Frequência Relativa' }
            },
            x: { title: { display: true, text: 'Número de Lançamentos' } }
        }
    };

    const datasetEstabilizacao = {
        label: 'Estabilização (1/6)',
        data: Array(data.labels.length).fill(0.1667),
        borderColor: 'red',
        borderWidth: 2,
        pointRadius: 0,
        fill: false,
        borderDash: [5, 5]
    };

    const ctx = document.getElementById('graficoJunto').getContext('2d');
    graficoJuntoInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.labels,
            datasets: [
                { label: 'Face 1', data: data.face1, borderColor: '#FF6384', fill: false },
                { label: 'Face 2', data: data.face2, borderColor: '#f1c40f', fill: false },
                { label: 'Face 3', data: data.face3, borderColor: '#36A2EB', fill: false },
                { label: 'Face 4', data: data.face4, borderColor: '#4BC0C0', fill: false },
                { label: 'Face 5', data: data.face5, borderColor: '#9966FF', fill: false },
                { label: 'Face 6', data: data.face6, borderColor: '#FF9F40', fill: false },
                datasetEstabilizacao
            ]
        },
        options: commonOptions
    });
}

function graficoSeparado(data) {
    document.getElementById('containerSeparado').style.display = 'block';
    document.getElementById('containerJunto').style.display = 'none';

    limparGraficos();

    // Configuração básica
    const commonOptions = {
        responsive: true,
        maintainAspectRatio: false,
        elements: { point: { radius: 2 } },
        scales: {
            y: {
                min: 0,
                max: 1,
                title: { display: true, text: 'Frequência Relativa' }
            },
            x: { title: { display: true, text: 'Número de Lançamentos' } }
        }
    };

    const datasetEstabilizacao = {
        label: 'Estabilização (1/6)',
        data: Array(data.labels.length).fill(0.1667),
        borderColor: 'red',
        borderWidth: 2,
        pointRadius: 0,
        fill: false,
        borderDash: [5, 5]
    };

    const cores = ['#FF6384', '#f1c40f', '#36A2EB', '#4BC0C0', '#9966FF', '#FF9F40'];

    for (let i = 1; i <= 6; i++) {
        const ctx = document.getElementById(`graficoFace${i}`).getContext('2d');
        const novaInstancia = new Chart(ctx, {
            type: 'line',
            data: {
                labels: data.labels,
                datasets: [
                    { label: `Face ${i}`, data: data[`face${i}`], borderColor: cores[i-1], fill: false },
                    datasetEstabilizacao
                ]
            },
            options: commonOptions
        });
        graficoInstances.push(novaInstancia);
    }

}

function atualizarGraficos(data) {
    ultimosDados = data;
    const checkSeparar = document.getElementById('checkSeparar').checked;

    if (checkSeparar) {
        graficoSeparado(data);
    } else {
        graficoJunto(data);
    }
}

function alternarVisualizacao() {
    if (ultimosDados) {
        atualizarGraficos(ultimosDados);
    }
}


function limparGraficos() {
    if (graficoJuntoInstance) graficoJuntoInstance.destroy();
    graficoInstances.forEach(instancia => instancia.destroy());
    graficoInstances = [];

    const checkbox = document.getElementById('checkSeparar');
    const estadoCheckbox = checkbox.checked;

    document.getElementById('form').reset();
    checkbox.checked = estadoCheckbox;
}