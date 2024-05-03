document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById('form-atividade');
    const tabelaCorpo = document.getElementById('tabela-corpo');
    const totalContatos = document.getElementById('total-contatos');

    let contatos = [];

    const contatosLocalStorage = localStorage.getItem('contatos');
    if (contatosLocalStorage) {
        contatos = JSON.parse(contatosLocalStorage);
        atualizarTabela();
    }

    function adicionarContato(nome, email, numero) {
        const existeContato = contatos.some(contato => {
            return contato.nome === nome || contato.email === email || contato.numero === numero;
        });

        if (existeContato) {
            alert('Nome, e-mail ou número já existem. Por favor, insira informações únicas.');
            return;
        }

        const novoContato = {
            nome: nome,
            email: email,
            numero: numero
        };

        contatos.push(novoContato);

        atualizarTabela();
    }

    function atualizarTabela() {
        tabelaCorpo.innerHTML = '';

        contatos.forEach((contato, index) => {
            const novaLinha = document.createElement('tr');
            novaLinha.innerHTML = `
                <td>${contato.nome}</td>
                <td>${contato.email}</td>
                <td>${contato.numero}</td>
                <td><button class="btn-excluir" data-index="${index}">Excluir</button></td>
            `;
            tabelaCorpo.appendChild(novaLinha);
        });

        totalContatos.textContent = contatos.length;
    }

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const nome = document.getElementById('nome-contato').value;
        const email = document.getElementById('email-contato').value;
        const numero = document.getElementById('numero-contato').value;

        adicionarContato(nome, email, numero);

        form.reset();
    });

    tabelaCorpo.addEventListener('click', function(event) {
        if (event.target.classList.contains('btn-excluir')) {
            const indice = event.target.getAttribute('data-index');

            contatos.splice(indice, 1);

            atualizarTabela();
        }
    });

    window.addEventListener('beforeunload', function() {
        localStorage.setItem('contatos', JSON.stringify(contatos));
    });
});