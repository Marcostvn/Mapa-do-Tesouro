document.addEventListener('DOMContentLoaded', function() {
    
    const mapa = document.getElementById('mapaDoTesouro');
    const sectionBotao = document.getElementById('sectionBotaoSucesso');
    const botaoProximaPista = document.getElementById('botaoProximaPista');

    // Função que será chamada quando o mapa for clicado
    function verificarCliqueNoMapa(event) {
        
        let imgWidth = mapa.offsetWidth;
        let imgHeight = mapa.offsetHeight;
        let clickX = event.offsetX;
        let clickY = event.offsetY;
        let percentX = clickX / imgWidth;
        let percentY = clickY / imgHeight;

        /*
        // --- PARA VOCÊ DEPURAR ---
        // console.log(`Clique em X: ${percentX.toFixed(2)}, Y: ${percentY.toFixed(2)}`);
        */

        // Área de acerto (hotspot) na imagem
        const hotSpot = {
            xMin: 0.92,  // 78% da esquerda para a direita
            xMax: 1,  // 99% (até a borda direita)
            yMin: 0.51,  // 51% de cima para baixo
            yMax: 0.60   // 65%
        };

        // Verifica se o clique (em porcentagem) está dentro da área de acerto
        if (percentX > hotSpot.xMin && percentX < hotSpot.xMax &&
            percentY > hotSpot.yMin && percentY < hotSpot.yMax) 
        {
            // ACERTOU!
            alert("Você lembrou Capitã 🏴‍☠️!!! O botão apareceu lá embaixo.")

            // 1. Mostra a seção de sucesso ADICIONANDO A CLASSE 'visivel'
            sectionBotao.classList.add('visivel');

            // 2. Remove o listener de clique do mapa para evitar cliques repetidos
            mapa.removeEventListener('click', verificarCliqueNoMapa);
            mapa.style.cursor = 'default'; // Volta o cursor ao normal

            // 3. Adiciona o listener de clique para o novo botão que apareceu
            if (botaoProximaPista) {
                botaoProximaPista.addEventListener('click', function() {
                    // Redireciona para a próxima página de enigma
                    // Lembre-se de criar este arquivo! Ex: 'pista-codigo-fonte.html'
                    window.location.href = '../html/pista-2.html'; // <<< MUDE AQUI PARA O NOME DA SUA PRÓXIMA PÁGINA
                });
            }

        } else {
            // ERROU!
            alert('Não Capitã 🏴‍☠️, aquela beijoca não foi aí!');
        }
    }

    if (mapa) {
        // Adiciona o event listener inicial ao mapa
        mapa.addEventListener('click', verificarCliqueNoMapa);
    }
});