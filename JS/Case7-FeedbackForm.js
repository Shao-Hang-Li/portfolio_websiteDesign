'use strict;'

// Load the data into an empty array   
let feedbackData = [];

// check if feedbacks exist (not null)
if (localStorage.getItem("feedbacks")) {
    feedbackData = JSON.parse(localStorage.getItem("feedbacks"));
}

// Function to submit the feedback
function submitFeedback() {
    // Get the data for the name, email, rating and message
    let name = document.getElementById("feedbackName").value;
    let email = document.getElementById("feedbackEmail").value;
    let rating = document.getElementById("feedbackRating").value;
    let message = document.getElementById("feedbackMessage").value;
    
    let feedback = { 
        name: name,
        email: email,
        rating: rating,
        message: message 
    };

    // Add it to the array: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push
    feedbackData.push(feedback);

    // Save the data into the local storage
    localStorage.setItem("feedbacks", JSON.stringify(feedbackData));

    // UX/UI
    alert("Thank you for your feedback!");
}

// Function to display the feedback
function displayFeedback() {
    // Get the element in the html
    let feedbackList = document.getElementById("feedbackList");
    feedbackList.innerHTML = "";
    
    let totalRating = 0;
    
    // Loop through the data and display it
    for (let i = 0; i < feedbackData.length; i++) {
        let feedback = feedbackData[i];
        
        // Written in the div
        totalRating += feedback.rating;
        let feedbackReviews = document.createElement("div");

        // Display the order and structure
        feedbackReviews.innerHTML = 
        `<strong>${feedback.name} (${feedback.email})</strong><br>
        <strong>Rating:</strong> ${feedback.rating}<br>
        ${feedback.message}`;
        feedbackList.appendChild(feedbackReviews);
    };
}

//Display the feedback
displayFeedback();