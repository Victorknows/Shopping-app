document.addEventListener('DOMContentLoaded', () => {
    // Fetch user data
    fetch('http://localhost:3000/0')  // Assuming a separate endpoint for users
        .then(response => response.json())
        .then(userData => {
            if (userData && Array.isArray(userData["users-info"]) && userData["users-info"].length > 0) {
                const userContainer = document.getElementById("features");

                // Array of user IDs to display
                const userIDsToDisplay = [1, 4, 10, 23];

                // Display avatars of specific users
                userData["users-info"].forEach(user => {
                    if (userIDsToDisplay.includes(user.id)) {
                        const userAvatar = user.avatar;
                        const img = document.createElement("img");
                        img.src = userAvatar;
                        img.alt = "user-avatar";
                        userContainer.appendChild(img);
                    }
                });

                // Add event listener to each user avatar image
                const userAvatars = document.querySelectorAll("#features img");
                userAvatars.forEach((avatar, index) => {
                    avatar.addEventListener('click', () => {
                        const userID = userIDsToDisplay[index];
                        window.location.href = `index.html?id=${userID}&type=user`;
                    });
                });
            } else {
                console.error('Invalid user data format:', userData);
            }
        })
        .catch(error => console.error('Error fetching or parsing user data:', error));

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
                        <img src="${item.image}" alt="clothing-image">
                        <p>Name: ${item.name}</p>
                        <p>Price: ${item.Price}</p>
                        <p>Size: ${item.Size}</p>
                    `;
                    empty.appendChild(itemContainer);
                });

                // Add event listener to each clothing item image
                const clothingImages = document.querySelectorAll("#empty-div img");
                clothingImages.forEach((image, index) => {
                    image.addEventListener('click', () => {
                        // Assuming each clothing item has a unique identifier, e.g., item.id
                        const clothingID = clothesData.clothes[index].id;
                        window.location.href = `index.html?id=${clothingID}&type=clothing`;
                    });
                });
            } else {
                console.error('Invalid clothes data format:', clothesData);
            }
        })
        .catch(error => console.error('Error fetching or parsing clothes data:', error));

        function submitFeedback() {
            const name = document.getElementById("name").value;
            const email = document.getElementById("email").value;
            const feedback = document.getElementById("feedback").value;
        
            const feedbackData = {
                Name: name,
                email: email,
                feedback: feedback
            };
        
            // Assuming you have an endpoint on your server to handle feedback submissions
            fetch('http://localhost:3000/0', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ feedback: feedbackData })
            })
            .then(response => response.json())
            .then(data => {
                console.log('Feedback submitted successfully:', data);
                // You can update the UI or perform other actions after successful submission
            })
            .catch(error => {
                console.error('Error submitting feedback:', error);
            });
        }
        
        
});
