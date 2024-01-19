document.addEventListener('DOMContentLoaded', () => {
    // Fetch clothes data
    fetch('http://localhost:3000/0')  // Assuming a separate endpoint for clothes
        .then(response => response.json())
        .then(clothesData => {
            if (clothesData && Array.isArray(clothesData.clothes) && clothesData.clothes.length > 0) {
                const empty = document.getElementById("empty-div");

                // Display clothing items
                clothesData.clothes.forEach(item => {
                    const itemContainer = document.createElement("div");
                    itemContainer.innerHTML = `
                        <a href="calculator.html?id=${item.id}&type=clothing">
                            <img src="${item.image}" alt="clothing-image" class="image_1">
                            <p>Name: ${item.name}</p>
                            <p>Price: ${item.Price}</p>
                            <p>Size: ${item.Size}</p>
                        </a>
                    `;
                    empty.appendChild(itemContainer);
                });
            } else {
                console.error('Invalid clothes data format:', clothesData);
            }
        })
        .catch(error => console.error('Error fetching or parsing clothes data:', error));

    // Extract product details from the query parameters
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    const productType = urlParams.get('type');

    if (productId && productType === 'clothing') {
        // Fetch product details based on productType and productId
        // You need to adapt this part based on your data structure and API
        fetch(`http://localhost:3000/${productId}`)
            .then(response => {
                if (!response.ok) {
                    // Handle 404 or other non-successful status codes
                    console.error(`Error fetching product data. Status: ${response.status}`);
                    return null; // or handle the error as needed
                }
                return response.json();
            })
            .then(productData => {
                if (productData) {
                    // Update the UI with the product details
                    const clickedImage = document.getElementById('clicked-image');
                    const productName = document.getElementById('product-name');
                    const productPrice = document.getElementById('product-price');
                    const productSize = document.getElementById('product-size');

                    clickedImage.src = productData.image;
                    productName.textContent = `Name: ${productData.name}`;
                    productPrice.textContent = `Price: ${productData.Price}`;
                    productSize.textContent = `Size: ${productData.Size}`;
                }
            })
            .catch(error => console.error('Error fetching product data:', error));


    } else if (productId && productType === 'user') {
        // Fetch user data based on the id
        fetch(`http://localhost:3000/user/${productId}`)
            .then(response => response.json())
            .then(userData => {
                displayDetails(userData.avatar, `User ID: ${productId}`);
            })
            .catch(error => console.error('Error fetching user data:', error));
    }
});

// Function to display details in the details-container div
function displayDetails(imageSrc, information) {
    const detailsContainer = document.getElementById("details-container");
    detailsContainer.innerHTML = `
        <img src="${imageSrc}" alt="clicked-image">
        <p>${information}</p>
    `;
}

function submitFeedback() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const feedbackText = document.getElementById("feedback").value;

    const feedbackData = {
        Name: name,
        email: email,
        feedback: feedbackText
    };

    // Assuming you have an endpoint on your server to handle feedback submissions
    fetch('http://localhost:3000/feedback', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(feedbackData)
    })
        .then(response => response.json())
        .then(data => {
            console.log('Feedback submitted successfully:', data);

            // Update the UI or perform other actions after successful submission
            // For example, you can display a thank you message to the user
            alert('Thank you for your feedback!');
        })
        .catch(error => {
            console.error('Error submitting feedback:', error);
           fetch('http://localhost:3000/foods')  // Assuming a separate endpoint for clothes
        .then(response => response.json())
        .then(clothesData => {
            if (clothesData && Array.isArray(clothesData.clothes) && clothesData.clothes.length > 0) {
                const empty = document.getElementById("empty-div");

                // Display clothing items
                clothesData.clothes.forEach(item => {
                    const itemContainer = document.createElement("div");
                    itemContainer.innerHTML = `
                        <a href="calculator.html?id=${item.id}&type=clothing">
                            <img src="${item.image}" alt="clothing-image" class="image_1">
                            <p>Name: ${item.name}</p>
                            <p>Price: ${item.Price}</p>
                            <p>Size: ${item.Size}</p>
                        </a>
                    `;
                    empty.appendChild(itemContainer);
                });
            } else {
                console.error('Invalid clothes data format:', clothesData);
            }
        })
        .catch(error => console.error('Error fetching or parsing clothes data:', error));

        });
}