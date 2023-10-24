import axios from "axios"

// Select the HTML element with the class "entry"
const entryPoint = document.querySelector(".entry")

// Function to create a dog card based on image URL and breed
function dogCardMaker({ imageURL, breed }) {
  const dogCard = document.createElement("div");
  const image = document.createElement("img");
  const heading = document.createElement("h3");

  // Set the heading text to display the breed
  heading.textContent = `Breed: ${breed}`;

  // Set the image source and add a class
  image.src = imageURL;
  image.classList.add("dog-image");

  // Add classes to the main dog card element
  dogCard.classList.add("dog-card");

  // Create the hierarchy of elements: image and heading inside the dog card
  dogCard.appendChild(image);
  dogCard.appendChild(heading);

  // Add click event listener to toggle the "selected" class
  dogCard.addEventListener("click", () => {
    dogCard.classList.toggle("selected");
  });

  return dogCard;
}

// Function to fetch dog images from an API
function getDogs(breed, count) {
  axios.get(`https://dog.ceo/api/breed/${breed}/images/random/${count}`)
    .then(res => {
      console.log(res.data);
      res.data.message.forEach(imageURL => {
        // Create a dog card and append it to the entry point
        const dogCard1 = dogCardMaker({ imageURL: imageURL, breed: `${breed}` });
        entryPoint.appendChild(dogCard1);
        console.log(dogCard1);
      });
    })
    .catch(err => {
      console.error(err);
    })
    .finally(() => {
      console.log("DONE");
    });
}

// Add a click event listener to a button that fetches dog images for different breeds
document.querySelector("button").addEventListener("click", () => {
  getDogs("labrador", 3);
  getDogs("poodle", 3);
  getDogs("husky", 3);
});
