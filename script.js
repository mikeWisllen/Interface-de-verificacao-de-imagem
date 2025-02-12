document.addEventListener('DOMContentLoaded', () => {
    const refreshButton = document.getElementById('refreshButton');
    const buttonText = document.getElementById('buttonText');
    const loadingSpinner = document.getElementById('loadingSpinner');
    const gallery = document.getElementById('gallery');

    // Função para exibir/ocultar loading
    function toggleLoading(isLoading) {
        if (isLoading) {
            buttonText.textContent = 'Atualizando...';
            loadingSpinner.style.display = 'block';
            refreshButton.disabled = true;
        } else {
            buttonText.textContent = 'Atualizar Imagens';
            loadingSpinner.style.display = 'none';
            refreshButton.disabled = false;
        }
    }

    // Busca imagens processadas do backend
    async function fetchProcessedImages() {
        toggleLoading(true);
        
        try {
            // Chamada real à API do backend
            const response = await fetch('http://localhost:5173/api/images');
            if (!response.ok) {
                throw new Error('Erro ao buscar imagens');
            }
            const images = await response.json();
            
            // Renderiza as imagens na galeria
            renderGallery(images);
        } catch (error) {
            console.error('Erro ao buscar imagens:', error);
            alert('Erro ao carregar imagens. Tente novamente.');
        }
        
        toggleLoading(false);
    }

    // Renderiza a galeria
    function renderGallery(images) {
        gallery.innerHTML = '';
        
        images.forEach(image => {
            const card = document.createElement('div');
            card.className = 'image-card';
            
            card.innerHTML = `
                <img src="${image}" alt="Imagem processada" />
                <div class="image-details">
                    <p><strong>Processada em:</strong> ${new Date().toLocaleString()}</p>
                    <p><strong>Objetos detectados:</strong> N/A</p>
                </div>
            `;
            
            gallery.appendChild(card);
        });
    }

    // Evento de clique no botão
    refreshButton.addEventListener('click', fetchProcessedImages);

    // Carrega as imagens ao iniciar
    fetchProcessedImages();
});