document.addEventListener('DOMContentLoaded', function() {
    
    // Pega todos os elementos interativos
    const timelineItems = document.querySelectorAll('.timeline-item');
    const sectionBotao = document.getElementById('sectionBotaoSucesso');
    const botaoProximaPista = document.getElementById('botaoProximaPista');

    // Define a ordem correta baseada nos seus 'data-ordem'
    const ordemCorreta = ["1", "2", "3", "4", "5"];
    
    // Array para armazenar os cliques do usuário
    let cliquesDoUsuario = [];
    
    // Variável para evitar cliques múltiplos durante a animação de erro
    let processandoErro = false;

    // Função para lidar com o clique em um item
    function handleItemClick(event) {
        // Se estivermos processando um erro, não faça nada
        if (processandoErro) return;

        const itemClicado = event.currentTarget;

        // Se o item já foi selecionado, não faça nada
        if (itemClicado.classList.contains('selecionado')) return;

        // Pega a ordem do item clicado
        const ordem = itemClicado.getAttribute('data-ordem');
        cliquesDoUsuario.push(ordem);
        
        const indexAtual = cliquesDoUsuario.length - 1;

        // Compara o clique atual com a posição correta na ordem
        if (ordem === ordemCorreta[indexAtual]) {
            // ACERTOU (parcialmente)
            itemClicado.classList.add('selecionado'); // Feedback verde

            // Verifica se foi o último item
            if (cliquesDoUsuario.length === ordemCorreta.length) {
                // GANHOU!
                ganhouOEnigma();
            }

        } else {
            // ERROU
            itemClicado.classList.add('erro'); // Feedback vermelho
            processandoErro = true; // Bloqueia cliques
            
            // Mostra o alerta e reseta após um tempo
            setTimeout(() => {
                alert("Ops! 🏴‍☠️ Ordem errada, Capitã! O mapa do tempo foi resetado. Tente de novo!");
                resetarEnigma();
            }, 500); // 0.5s para ela ver o "tremor" vermelho
        }
    }

    // Adiciona o listener de clique a cada item
    timelineItems.forEach(item => {
        item.addEventListener('click', handleItemClick);
    });

    // Função para resetar o enigma
    function resetarEnigma() {
        cliquesDoUsuario = []; // Limpa o array de cliques
        timelineItems.forEach(item => {
            item.classList.remove('selecionado');
            item.classList.remove('erro');
        });
        processandoErro = false; // Libera os cliques
    }

    // Função para quando ganhar
    function ganhouOEnigma() {
        alert("Balão Capitã 🏴‍☠️, você acertou a ordem! o botão tá lá embaixo.");
        // Mostra o card de sucesso (com a animação)
        sectionBotao.classList.add('visivel');

        // Desabilita cliques futuros nos itens
        timelineItems.forEach(item => {
            item.classList.add('desabilitado');
        });

        // Adiciona a ação ao botão de próxima pista
        if (botaoProximaPista) {
            botaoProximaPista.addEventListener('click', function() {
                // MUDE AQUI para o nome da sua PRÓXIMA pista (ex: 'pista-3.html')
                window.location.href = '/html/pista-3.html'; 
            });
        }
    }
});