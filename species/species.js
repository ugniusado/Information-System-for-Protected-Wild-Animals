function fetchSpecies() {
  return fetch('http://localhost:4000/species')
    .then(response => response.json())
    .then(data => {
      speciesData = data;
      displaySpeciesList(speciesData);
    });
}
fetchSpecies();

function createListItem(species) {
  const listItem = document.createElement('li');
  listItem.classList.add('species-item');

  const speciesImage = document.createElement('img');
  speciesImage.src = species.image;
  speciesImage.alt = species.common_name;
  speciesImage.classList.add('species-image');
  listItem.appendChild(speciesImage);

  const speciesCommonName = document.createElement('span');
  speciesCommonName.textContent = species.common_name;
  speciesCommonName.classList.add('common-name');
  listItem.appendChild(speciesCommonName);

  const speciesScientificName = document.createElement('span');
  speciesScientificName.textContent = `(${species.scientific_name})`;
  speciesScientificName.classList.add('scientific-name');
  listItem.appendChild(speciesScientificName);

  listItem.addEventListener('click', function () {
    window.location.href = `species_detail.html?name=${species.scientific_name}`;
  });

  return listItem;
}

function sortSpeciesList(order) {
  const speciesList = document.getElementById('species-list');
  const sortedSpecies = Array.from(speciesList.children).sort((a, b) => {
    const aValue = a.textContent;
    const bValue = b.textContent;
    if (order === 'asc') {
      return aValue.localeCompare(bValue);
    } else {
      return bValue.localeCompare(aValue);
    }
  });

  speciesList.innerHTML = '';
  for (const item of sortedSpecies) {
    speciesList.appendChild(item);
  }
}

function searchSpecies() {
  const searchInput = document.getElementById('search-input');
  const searchTerm = searchInput.value.trim().toLowerCase();

  if (searchTerm === '') {
    displaySpeciesList(speciesData);
  } else {
    const filteredSpecies = speciesData.filter(species => {
      return species.common_name.toLowerCase().includes(searchTerm) || species.scientific_name.toLowerCase().includes(searchTerm);
    });
    displaySpeciesList(filteredSpecies);
  }
}

function displaySpeciesList(speciesList) {
  const ul = document.getElementById('species-list');
  ul.innerHTML = "";  // clear the list before appending items
  speciesList.forEach(species => {
      const li = createListItem(species);
      ul.appendChild(li);
  });
}

let uniqueStatuses = [];

function fetchSpecies() {
  return fetch('http://localhost:4000/species')
    .then(response => response.json())
    .then(data => {
      speciesData = data;

      // Get unique conservation statuses
      uniqueStatuses = [...new Set(speciesData.map(species => species.conservation_status))];

      generateStatusButtons();
      displaySpeciesList(speciesData);
    });
}

function generateStatusButtons() {
  const statusContainer = document.getElementById('conservation-status');

  uniqueStatuses.forEach(status => {
    const button = document.createElement('button');
    button.textContent = status.slice(0, 2).toUpperCase(); // Display only first two letters of status
    button.addEventListener('click', function () {
      sortSpeciesByStatus(status);
    });

    statusContainer.appendChild(button);
  });
}

function sortSpeciesByStatus(status) {
  const filteredSpecies = speciesData.filter(species => species.conservation_status === status);
  displaySpeciesList(filteredSpecies);
}