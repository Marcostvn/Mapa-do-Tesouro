document.addEventListener('DOMContentLoaded', function() {
    
    // Elementos do Jogo
    const pieceBank = document.getElementById('piece-bank');
    const allPieces = document.querySelectorAll('.puzzle-piece');
    const allDropZones = document.querySelectorAll('.drop-zone');
    
    // Elementos de Sucesso
    const sectionBotao = document.getElementById('sectionBotaoSucesso');
    const botaoProximaPista = document.getElementById('botaoProximaPista');

    let draggedPiece = null; // Armazena a peça sendo arrastada
    let correctPiecesCount = 0; // Contador de peças corretas
    const totalPieces = 16;

    // --- 1. EMBARALHAR AS PEÇAS ---
    // (Algoritmo Fisher-Yates para embaralhar)
    function shufflePieces() {
        const piecesArray = Array.from(allPieces);
        for (let i = piecesArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [piecesArray[i], piecesArray[j]] = [piecesArray[j], piecesArray[i]];
        }
        // Limpa o banco e adiciona as peças embaralhadas
        pieceBank.innerHTML = ''; 
        piecesArray.forEach(piece => pieceBank.appendChild(piece));
    }

    // --- 2. FUNÇÕES DE ARRASTAR E SOLTAR (DRAG AND DROP) ---

    // Quando o usuário começa a arrastar uma peça
    function handleDragStart(e) {
        draggedPiece = this; // 'this' é a peça clicada
        this.classList.add('dragging');
    }

    // Quando a peça termina de ser arrastada (soltando ou cancelando)
    function handleDragEnd() {
        this.classList.remove('dragging');
    }

    // Quando uma peça arrastada entra em uma zona de soltar
    function handleDragOver(e) {
        e.preventDefault(); // Necessário para permitir o 'drop'
        this.classList.add('drag-over');
    }

    // Quando uma peça arrastada sai de uma zona de soltar
    function handleDragLeave() {
        this.classList.remove('drag-over');
    }

    // Quando o usuário SOLTA a peça em uma zona
    function handleDrop(e) {
        e.preventDefault();
        this.classList.remove('drag-over');

        // Pega os IDs da peça e da zona
        const pieceId = draggedPiece.dataset.pieceId;
        const zoneId = this.dataset.zoneId;

        // Verifica se a peça correta foi solta na zona correta
        if (pieceId === zoneId) {
            this.innerHTML = '';

            // CORRETO!
            this.appendChild(draggedPiece); // Anexa a peça à zona
            this.classList.add('filled'); // Estiliza a zona
            
            draggedPiece.classList.add('correct');
            draggedPiece.setAttribute('draggable', 'false'); // Trava a peça
            
            correctPiecesCount++; // Incrementa o contador

            // Verifica se o jogo terminou
            if (correctPiecesCount === totalPieces) {
                ganhouOEnigma();
            }
            
        } else {
            // ERRADO!
            alert('Opa! 🏴‍☠️ Pedaço errado!');
        }
    }

    // --- 3. FUNÇÃO DE VITÓRIA ---
    function ganhouOEnigma() {
        
        sectionBotao.classList.add('visivel'); // Mostra o card de sucesso
        
        // Desabilita o tabuleiro
        document.getElementById('puzzle-board').style.borderColor = '#4CAF50';
        
        // Adiciona a ação ao botão
        if (botaoProximaPista) {
            botaoProximaPista.addEventListener('click', function() {
                // MUDE AQUI para a sua página final do tesouro!
                window.location.href = '../html/pista-4.html'; 
            });
        }
        alert('Muito bom capitã 🏴‍☠️ esse dia foi louco!');
    }

    // --- 4. INICIALIZAÇÃO ---
    
    // Adiciona os listeners de evento a todas as peças
    allPieces.forEach(piece => {
        piece.addEventListener('dragstart', handleDragStart);
        piece.addEventListener('dragend', handleDragEnd);
    });

    // Adiciona os listeners de evento a todas as zonas
    allDropZones.forEach(zone => {
        zone.addEventListener('dragover', handleDragOver);
        zone.addEventListener('dragleave', handleDragLeave);
        zone.addEventListener('drop', handleDrop);
    });

    // Embaralha as peças quando a página carregar
    shufflePieces();
});