let map;
let marker;

function initMap() {
    const initialPosition = { lat: 55.1694, lng: 23.8813 };

    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 7,
        center: initialPosition,
    });

    marker = new google.maps.Marker({
        position: initialPosition,
        map: map,
        draggable: true
    });

    google.maps.event.addListener(marker, 'dragend', function (event) {
        document.getElementById("lat").value = this.getPosition().lat();
        document.getElementById("lng").value = this.getPosition().lng();
    });
}

document.getElementById('reportForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Get the values from the form
    let name = document.getElementById('name').value;
    let surname = document.getElementById('surname').value;
    let description = document.getElementById('description').value;
    let file = document.getElementById('file').files;
    let lat = document.getElementById('lat').value;
    let lng = document.getElementById('lng').value;

    // Log the values
    console.log(name, surname, description, file, lat, lng);

    // Prepare the data for sending
    let formData = new FormData();
    formData.append('name', name);
    formData.append('surname', surname);
    formData.append('description', description);
    if (file.length > 0) {
        formData.append('file', file[0]);
    }
    formData.append('lat', lat);
    formData.append('lng', lng);

    // Send the data to the server
    fetch('http://localhost:5000/spotted', {
        method: 'POST',
        body: formData
    }).then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        // If successful, clear the form
        e.target.reset();
    }).catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
    });
});
