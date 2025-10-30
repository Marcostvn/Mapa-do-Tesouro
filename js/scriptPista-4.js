document.addEventListener('DOMContentLoaded', function() {

    // ==========================================================
    //  *** SUA CONFIGURAÇÃO COMEÇA AQUI ***
    // ==========================================================
    
    // 1. Coloque suas respostas EXATAS aqui.
    //    O nome (ex: "word1") deve ser o mesmo do "data-word" no HTML.
    //    Use MAIÚSCULAS e, de preferência, sem acentos.
    const correctAnswers = {
        "word1": "JORGE",     // Resposta para a Dica 1 (ex: 5 letras)
        "word2": "NEIDE",     // Resposta para a Dica 2 (ex: 5 letras)
        "word3": "DESISTENCIA",  // Resposta para a Dica 3 (ex: 8 letras)
        "word4": "TOPGUN",  // Resposta para a Dica 4 (ex: 8 letras)
        "word5": "BATATINHA"
        // "word6": "RESPOSTA6",
        // "word7": "RESPOSTA7",
        // "word8": "RESPOSTA8"
    };
    
    // 2. Defina o nome do arquivo da próxima página (o tesouro)
    const proximaPagina = 'tesouro.html';

    // ==========================================================
    //  *** O CÓDIGO DO JOGO COMEÇA AQUI (Não precisa mexer) ***
    // ==========================================================

    const checkButton = document.getElementById('checkAnswersBtn');
    const successSection = document.getElementById('sectionBotaoSucesso');
    const nextPuzzleButton = document.getElementById('botaoProximaPista');
    
    // Lógica para pular para o próximo input automaticamente
    const allInputs = document.querySelectorAll('.char-input');
    allInputs.forEach((input, index) => {
        input.addEventListener('keyup', (e) => {
            // Se for uma letra e não for Backspace
            if (e.key.length === 1 && e.key.match(/[a-z0-9]/i)) {
                // Se não for o último input, foca no próximo
                if (index < allInputs.length - 1) {
                    allInputs[index + 1].focus();
                }
            }
        });
    });

    // Adiciona o listener ao botão de checagem
    checkButton.addEventListener('click', function() {
        let totalWords = Object.keys(correctAnswers).length;
        let correctCount = 0;

        // Itera por cada resposta correta que você definiu
        for (const [wordKey, correctAnswer] of Object.entries(correctAnswers)) {
            
            // Pega todos os inputs daquele grupo
            const inputs = document.querySelectorAll(`.word-grid[data-word="${wordKey.replace('word', '')}"] .char-input`);
            
            let userAnswer = '';
            
            // Constrói a resposta do usuário
            inputs.forEach(input => {
                userAnswer += input.value;
            });

            // Compara a resposta (ignorando maiúsculas/minúsculas)
            if (userAnswer.toUpperCase() === correctAnswer) {
                // Acertou a palavra
                correctCount++;
                inputs.forEach(input => {
                    input.classList.remove('incorrect');
                    input.classList.add('correct');
                });
            } else {
                // Errou a palavra
                inputs.forEach(input => {
                    input.classList.remove('correct');
                    input.classList.add('incorrect');
                });
            }
        }

        // Verifica se TODAS as palavras estão corretas
        if (correctCount === totalWords) {
            ganhouOEnigma();
        } else {
            alert(`Quase lá! Você acertou ${correctCount} de ${totalWords} palavras.`);
        }
    });

    // Função de vitória
    function ganhouOEnigma() {
        // Esconde o botão de "Verificar"
        document.getElementById('sectionCheckButton').style.display = 'none';
        
        // Mostra o card de sucesso (com a animação)
        successSection.classList.add('visivel');

        // Desabilita todos os inputs
        allInputs.forEach(input => input.disabled = true);

        // Adiciona a ação ao botão de próxima pista
        if (nextPuzzleButton) {
            nextPuzzleButton.addEventListener('click', function() {
                window.location.href = proximaPagina; 
            });
        }
    }
});