document.addEventListener('DOMContentLoaded', () => {
    // Extract parameters from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    const type = urlParams.get('type');

    // Fetch data based on type and id
    if (type === 'user') {
        // Fetch user data based on the id
        fetch(`http://localhost:3000/user/${id}`)
            .then(response => response.json())
            .then(userData => {
                displayDetails(userData.avatar, `User ID: ${id}`);
            })
            .catch(error => console.error('Error fetching user data:', error));
    } else if (type === 'clothing') {
        // Fetch clothing data based on the id
        fetch(`http://localhost:3000/clothing/${id}`)
            .then(response => response.json())
            .then(clothingData => {
                displayDetails(clothingData.image, `Clothing ID: ${id}\nName: ${clothingData.name}\nPrice: ${clothingData.Price}\nSize: ${clothingData.Size}`);
            })
            .catch(error => console.error('Error fetching clothing data:', error));
    } else {
        console.error('Invalid type:', type);
    }

    // Function to display details in the details-container div
    function displayDetails(imageSrc, information) {
        const detailsContainer = document.getElementById("details-container");
        detailsContainer.innerHTML = `
            <img src="${imageSrc}" alt="clicked-image">
            <p>${information}</p>
        `;
    }
});
