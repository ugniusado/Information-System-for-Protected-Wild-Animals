function getSpeciesData(speciesName) {
  return fetch(`http://localhost:4000/species/${speciesName}`)
    .then(response => response.json())
    .then(species => {
      // the server will respond with the species object directly, so no need for any processing
      return species;
    });
}

function displaySpeciesDetail(species) {
  document.getElementById('common-name').innerText = species.common_name;
  document.getElementById('scientific-name').innerText = species.scientific_name;
  document.getElementById('conservation-status').innerText = species.conservation_status;
  document.getElementById('habitat').innerText = species.habitat;
  document.getElementById('threats').innerText = species.threats;
  document.getElementById('information').innerText = species.information;
  document.getElementById('species-image').src = species.image;
  document.getElementById('species-image').alt = species.common_name;
}

function goBack() {
  window.history.back();
}

function getQueryParameter(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

document.addEventListener('DOMContentLoaded', function () {
  const speciesName = getQueryParameter('name');
  if (speciesName) {
    getSpeciesData(speciesName)
      .then(species => {
        if (species) {
          displaySpeciesDetail(species);
        } else {
          // Handle species not found
          document.getElementById('page-container').innerHTML = '<p>Species not found.</p>';
        }
      })
      .catch(error => {
        console.error('Error fetching species data:', error);
        document.getElementById('page-container').innerHTML = '<p>Error fetching species data.</p>';
      });
  } else {
    document.getElementById('page-container').innerHTML = '<p>No species name provided.</p>';
  }
});
