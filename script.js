// função para fazer o fetch da criptomoeda através do coinRanking API
async function fetchCryptoData() {
    try {
        const response = await fetch('https://api.coinranking.com/v2/coins');
        const data = await response.json();
        return data.data.coins;

    } catch (error) {
        console.error('Erro encontrado nos dados da criptomoeda:', error);
        return [];
    }
}

// função para mostrar dados na tabela
function displayCryptoData(coins) {
    const cryptoTable = document.getElementById('cryptoTable');
    cryptoTable.innerHTML = "";
    coins.forEach(coin => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${coin.iconUrl}" class="crypto-logo" alt="${coin.name}">
            </td>
            <td>${coin.name}</td>
            <td>${coin.symbol}</td>
            <td>${coin.price}</td>
            <td>${coin.change}</td>
            <td>${coin.volume ? coin.volume : '-'}</td>
            <td>${coin.marketCap ? coin.marketCap : '-'}</td>
        `;
        cryptoTable.appendChild(row);
    });
}

// função para filtrar com base no que o usuário digitar
function filterCryptoData(coins, searchTerm) {
    searchTerm = searchTerm.toLowerCase();
    const filteredCoins = coins.filter(coin => coin.name.toLowerCase().includes(searchTerm) || 
        coin.symbol.toLowerCase().includes(searchTerm));
    return filteredCoins;
}

// função para lidar com a entrada de pesquisa
function handleSearchInput() {
    const searchInput = document.getElementById('searchInput');
    const searchTerm = searchInput.value.trim();

    fetchCryptoData().then(coins => {
        const filteredCoins = filterCryptoData(coins, searchTerm);
        displayCryptoData(filteredCoins);
    });
}

// função para inicializar a aplicação
async function initializeApp() {
    const coins = await fetchCryptoData();
    displayCryptoData(coins);

    // adicionando ouvinte de eventos para search input
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', handleSearchInput);
}

// chamando a função de inicialização quando o conteúdo do DOM estiver pronto
document.addEventListener('DOMContentLoaded', initializeApp);
