function parseCSV(text) {
  const rows = text.split('\n').slice(1);
  const species = rows.map(row => {
    const [scientific_name, common_name, conservation_status, habitat, threats, information, image] = row.split(',');
    return { scientific_name, common_name, conservation_status, habitat, threats, information, image };
  });
  return species;
}

function createListItem(species) {
  const listItem = document.createElement('li');
  listItem.classList.add('species-item');

  const speciesImage = document.createElement('img');
  speciesImage.src = species.image;
  speciesImage.alt = species.common_name;
  speciesImage.classList.add('species-image');
  listItem.appendChild(speciesImage);

  const speciesName = document.createElement('span');
  speciesName.textContent = species.common_name;
  listItem.appendChild(speciesName);

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

function displaySpeciesList(species) {
  const speciesList = document.getElementById('species-list');
  speciesList.innerHTML = '';

  for (const item of species) {
    const listItem = createListItem(item);
    speciesList.appendChild(listItem);
  }
}

let speciesData = [];

fetch('species.csv')
  .then(response => response.text())
  .then(data => {
    speciesData = parseCSV(data);
    displaySpeciesList(speciesData);
  });
