const listaMaterias = document.getElementById('lista-materias');
const formMateria = document.getElementById('form-materia');

// Função para carregar as matérias do arquivo CSV
function carregarMaterias() {
    fetch('data/materias.csv')
        .then(response => response.text())
        .then(csv => {
            const linhas = csv.split('\n');
            const materias = [];
            for (let i = 1; i < linhas.length; i++) { // Ignora a primeira linha (cabeçalho)
                const valores = linhas[i].split(',');
                if (valores.length === 2) {
                    materias.push({ titulo: valores[0], conteudo: valores[1] });
                }
            }
            exibirMaterias(materias);
        });
}

// Função para exibir as matérias na tela
function exibirMaterias(materias) {
    listaMaterias.innerHTML = '';
    materias.forEach(materia => {
        const divMateria = document.createElement('div');
        divMateria.classList.add('materia');
        divMateria.innerHTML = `
            <h3>${materia.titulo}</h3>
            <p>${materia.conteudo}</p>
        `;
        listaMaterias.appendChild(divMateria);
    });
}

// Função para salvar a matéria no arquivo CSV
function salvarMateria(materia) {
    fetch('data/materias.csv', {
        method: 'POST',
        body: `${materia.titulo},${materia.conteudo}\n`
    })
        .then(() => carregarMaterias());
}

// Evento de envio do formulário
formMateria.addEventListener('submit', (event) => {
    event.preventDefault();
    const titulo = document.getElementById('titulo').value;
    const conteudo = document.getElementById('conteudo').value;
    const novaMateria = { titulo, conteudo };
    salvarMateria(novaMateria);
    formMateria.reset();
});

// Carrega as matérias ao carregar a página
carregarMaterias();