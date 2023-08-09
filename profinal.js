let url = 'https://rickandmortyapi.com/api/character';
let allCharacters = [];

fetch(url)
    .then(response => response.json())
    .then(data => {
        allCharacters = data.results;
        mostrarPersonajes(allCharacters);
        agregarOpcionesFiltro();
    })
    .catch(error => console.log(error));

const mostrarPersonajes = (personajes) => {
    const personajesContainer = document.querySelector('.personajes-container');
    personajesContainer.innerHTML = '';

    for (const personaje of personajes) {
        const personajeCard = document.createElement('div');
        personajeCard.classList.add('personaje-card');
        personajeCard.innerHTML = `
            <img src="${personaje.image}" alt="${personaje.name}">
            <h3>${personaje.name}</h3>
            <p>Status: ${personaje.status}</p>
            <p>Species: ${personaje.species}</p>
            <p>Gender: ${personaje.gender}</p>
            <p>Origin: ${personaje.origin.name}</p>
            <p>Location: ${personaje.location.name}</p>
        `;
        personajesContainer.appendChild(personajeCard);
    }
};

const agregarOpcionesFiltro = () => {
    const optionsContainer = document.querySelector('.options-container');
    optionsContainer.innerHTML = `
        <label for="filter">Filtrar por:</label>
        <select id="filter">
            <option value="all">Todos</option>
            <option value="name">Nombre</option>
            <option value="status">Estado</option>
            <option value="species">Especie</option>
            <option value="gender">Género</option>
            <option value="origin">Origen</option>
            <option value="location">Ubicación</option>
        </select>
        <input type="text" id="search-input" placeholder="Ingrese su búsqueda">
        <button id="search-button">Buscar</button>
    `;

    const filterSelect = document.getElementById('filter');
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');

    searchButton.addEventListener('click', () => {
        const selectedFilter = filterSelect.value;
        const searchTerm = searchInput.value.trim().toLowerCase();

        if (selectedFilter === 'all') {
            mostrarPersonajes(allCharacters);
        } else {
            const filteredCharacters = allCharacters.filter(personaje => {
                if (selectedFilter === 'name') {
                    return personaje.name.toLowerCase().includes(searchTerm);
                } else if (selectedFilter === 'status') {
                    return personaje.status.toLowerCase().includes(searchTerm);
                } else if (selectedFilter === 'species') {
                    return personaje.species.toLowerCase().includes(searchTerm);
                } else if (selectedFilter === 'gender') {
                    return personaje.gender.toLowerCase().includes(searchTerm);
                } else if (selectedFilter === 'origin') {
                    return personaje.origin.name.toLowerCase().includes(searchTerm);
                } else if (selectedFilter === 'location') {
                    return personaje.location.name.toLowerCase().includes(searchTerm);
                }
            });

            mostrarPersonajes(filteredCharacters);
        }
    });
};
