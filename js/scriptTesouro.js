document.addEventListener('DOMContentLoaded', function() {

    const input = document.getElementById('assinaturaInput');
    const preview = document.getElementById('assinaturaPreview');
    const button = document.getElementById('assinarBtn');
    
    // Placeholder inicial
    const placeholderText = 'Sua assinatura...';
    preview.textContent = placeholderText;

    // --- 1. Lógica da Assinatura ao Vivo ---
    input.addEventListener('input', function() {
        if (input.value.trim() === '') {
            preview.textContent = placeholderText;
            preview.classList.remove('assinada'); // Volta ao estilo placeholder
        } else {
            preview.textContent = input.value;
            preview.classList.add('assinada'); // Aplica o estilo de "assinada"
        }
    });

    // --- 2. Lógica do Botão de Assinar ---
    button.addEventListener('click', function() {
        const nomeAssinado = input.value.trim();

        if (nomeAssinado === '') {
            alert('Por favor, assine o contrato para aceitar! ❤️');
            return;
        }

        // Você pode mudar essa mensagem
        alert('Contrato Aceito! 📜✒️ \nObrigado por recomeçar isso comigo, Mozas. \n\nVocê acaba de desbloquear o segundo tesouro...');

        // Redireciona para a página final do diário
        window.location.href = '../html/diario.html'; // <<< ESTE É O SEGUNDO TESOURO
    });

});