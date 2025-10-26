document.addEventListener('DOMContentLoaded', function() {
    const nextPageButton = document.getElementById('nextPageButton');

    if (nextPageButton) {
        nextPageButton.addEventListener('click', function() {
            window.location.href = 'pista-1.html'; 
        });
    }
});