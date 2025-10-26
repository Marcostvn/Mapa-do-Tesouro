// Espera o documento carregar completamente
document.addEventListener('DOMContentLoaded', function() {
    
    const mapa = document.getElementById('mapaDoTesouro');

    if (mapa) {
        mapa.addEventListener('click', function(event) {
            
            // Pega o tamanho ATUAL da imagem na tela
            let imgWidth = mapa.offsetWidth;
            let imgHeight = mapa.offsetHeight;

            // Pega as coordenadas X e Y do clique DENTRO da imagem
            let clickX = event.offsetX;
            let clickY = event.offsetY;

            // Calcula a posição do clique em PORCENTAGEM
            // Isso faz com que funcione em qualquer tamanho de tela!
            let percentX = clickX / imgWidth;
            let percentY = clickY / imgHeight;

            /*
            // --- PARA VOCÊ DEPURAR ---
            // Se quiser ajustar a área, descomente a linha abaixo.
            // Abra o console (F12) e clique na imagem para ver as porcentagens.
            console.log(`Clique em X: ${percentX.toFixed(2)}, Y: ${percentY.toFixed(2)}`);
            */

            // Definição da "Área de Acerto" (Hotspot)
            // Eu defini uma caixa invisível sobre a mesa da direita ao fundo.
            const hotSpot = {
                xMin: 0.78,  // 78% da esquerda para a direita
                xMax: 0.99,  // 99% (até a borda direita)
                yMin: 0.51,  // 51% de cima para baixo
                yMax: 0.65   // 65%
            };

            // Verifica se o clique (em porcentagem) está dentro da área de acerto
            if (percentX > hotSpot.xMin && percentX < hotSpot.xMax &&
                percentY > hotSpot.yMin && percentY < hotSpot.yMax) 
            {
                // ACERTOU!
                alert('ACERTOU EM CHEIO! 🎯 Você encontrou o local exato!');
                
                // Redireciona para a próxima página de enigma
                // Lembre-se de criar este arquivo!
                window.location.href = 'pista-codigo-fonte.html'; // <<< MUDE AQUI

            } else {
                // ERROU!
                alert('Hmm... foi quase! Mas acho que não foi bem aí. Tente de novo!');
            }
        });
    }
});