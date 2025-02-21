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
        })
        .catch(error => {
            console.error('Erro ao carregar matérias:', error);
        });
}

// Função para exibir as matérias na tela com estilo melhorado
function exibirMaterias(materias) {
    listaMaterias.innerHTML = '';
    materias.forEach(materia => {
        const divMateria = document.createElement('div');
        divMateria.classList.add('materia');
        divMateria.innerHTML = `
            <h2>${materia.titulo}</h2>
            <p>${materia.conteudo}</p>
            <button class="btn-leia-mais">Leia mais</button>
        `;
        listaMaterias.appendChild(divMateria);
        
        // Adiciona interação para o botão "Leia mais"
        const btnLeiaMais = divMateria.querySelector('.btn-leia-mais');
        btnLeiaMais.addEventListener('click', () => {
            alert(`Abrindo mais informações sobre: ${materia.titulo}`);
        });
    });
}

// Função para salvar a matéria no arquivo CSV
function salvarMateria(materia) {
    fetch('data/materias.csv', {
        method: 'POST',
        body: `${materia.titulo},${materia.conteudo}\n`
    })
        .then(() => {
            carregarMaterias(); // Recarrega as matérias após salvar
        })
        .catch(error => {
            console.error('Erro ao salvar matéria:', error);
        });
}

// Evento de envio do formulário
formMateria.addEventListener('submit', (event) => {
    event.preventDefault();
    const titulo = document.getElementById('titulo').value;
    const conteudo = document.getElementById('conteudo').value;
    
    if (titulo && conteudo) {
        const novaMateria = { titulo, conteudo };
        salvarMateria(novaMateria);
        formMateria.reset();
    } else {
        alert('Por favor, preencha todos os campos!');
    }
});

// Carrega as matérias ao carregar a página
carregarMaterias();