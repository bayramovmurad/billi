

// ! topdetails page

const apiEndpoint = '../assets/data/db.json';

//? Fetch data dynamically
fetch(apiEndpoint)
  .then(response => response.json())
  .then(data => {
    //? Extract the relevant data
    const { kind, title, paragraph, img, famousname, paragraphauthor } = data;
    console.log(data);



    //? Dynamically render the details
    const detailsContainer = document.getElementById('details-container');
    detailsContainer.innerHTML += `
      <div class="content_title">
                    <a href="">${kind}</a>
                    <h1>${title}</h1>
                    <p>${paragraph}</p>
                </div>
                <img src="${img}" alt="famous img">
                <div class="authordetails">
                    <span>${famousname}</span>
                    <cite>${paragraphauthor}</cite>
      </div>
    `;
  })
  .catch(error => console.error('Error fetching data:', error));


// ! popular channels filter actions


  const apiEndpointPopular = "./assets/data/popularchannels.json"; // Path to JSON file
  const container = document.querySelector(".popular_chanels_main"); // Main container
  const filterMenu = document.getElementById("filter-menu"); // Filter menu

  let allData = []; // To store fetched data

  // Function to fetch and display data
function fetchData() {
  fetch(apiEndpointPopular)
    .then(response => {
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      return response.json(); // Parse JSON data
    })
    .then(data => {
      allData = data; // Store fetched data
      renderData(allData); // Render data to the DOM
    })
    .catch(error => {
      console.error("Error fetching data:", error);
    });
}


  // Function to render data dynamically
  function renderData(data) {
    container.innerHTML = ""; // Clear existing content

    // Left section (First Item)
    if (data.length > 0) {
      const firstItem = data[0];
      container.innerHTML += `
        <div class="popular_left">
          <img src="${firstItem.image}" alt="${firstItem.title}" />
          <div class="left_part_text">
            <span>${firstItem.category}</span>
            <h2>${firstItem.title}</h2>
            <p>${firstItem.author}</p>
            <p>${firstItem.time || ""}</p>
          </div>
        </div>
      `;
    }

    // Right section (Remaining Items)
    const rightContainer = document.createElement("div");
    rightContainer.classList.add("popular_right");

    data.slice(1).forEach((item) => {
      rightContainer.innerHTML += `
        <div class="right_card" data-category="${item.category}">
          <img src="${item.image}" alt="${item.title}" />
          <div class="right_card_text">
            <p>${item.title}</p>
            <p class="right_card_model">${item.author}</p>
          </div>
        </div>
      `;
    });

    container.appendChild(rightContainer);
  }

  // Event Listener for Filtering
  filterMenu.addEventListener("click", (event) => {
    const filter = event.target.getAttribute("data-filter");

    if (filter) {
      // Remove 'active' class from all filter buttons
      const filterItems = filterMenu.querySelectorAll('li');
      filterItems.forEach(item => item.classList.remove('active'));

      // Add 'active' class to the clicked button
      event.target.classList.add('active');

      // Filter data based on category
      const filteredData = allData.filter(
        (item) => item.category === filter
      );
      renderData(filteredData);
    }
  });

  // Initial Fetch Call
  fetchData();


// ! search part

const closeButton = document.getElementById("closebutton");
const openButton = document.getElementById("openbutton");
const searchContainer = document.getElementById("search_container")
const searchButton = document.getElementById("searchbutton");


openButton.addEventListener("click", () => {
  searchContainer.style.display = "flex"
  openButton.style.display = "none"
  closeButton.style.display = "flex"


})

closeButton.addEventListener("click", () => {
  searchContainer.style.display = "none"
  openButton.style.display = "flex"
  closeButton.style.display = "none"

})

searchButton.addEventListener("click", () => {
  searchContainer.style.display = "none"
  closeButton.style.display = "none"
  alert("Successfully")
  openButton.style.display = "flex"
})


// navigation scripts


const openNavigation = document.getElementById("open_navigation");
const navigatonClose = document.getElementById("navigation_close");
const hero = document.getElementById("hero");
const navigationPopup = document.getElementById("navigation_popup_bg")

openNavigation.addEventListener("click", () => {
  hero.style.display = "none"
  navigationPopup.style.display = "block"
})

navigatonClose.addEventListener("click", () => {
  hero.style.display = "block"
  navigationPopup.style.display = "none"
})


// ! transition process


function googleTranslateElementInit() {
  new google.translate.TranslateElement(
    {
      pageLanguage: "en", // Default language
      includedLanguages: "en,es", // Include only English and Spanish
      layout: google.translate.TranslateElement.InlineLayout.SIMPLE, // Simple dropdown
    },
    "google_translate_element"
  );
}




// !login-popup
const login = document.getElementById("login");
const loginContainerGenerally = document.getElementById("login_container_generally");
const closeLoginPopup = document.getElementById("close_login_popup")
const secondPart = document.getElementById("second_part");

login.addEventListener("click", () => {
  // Show the overlay
  loginContainerGenerally.style.display = "block";
  secondPart.style.zIndex = -1
  // Prevent body scroll
  document.body.style.overflow = "hidden";
});

// Optional: Close overlay when clicking on the container
closeLoginPopup.addEventListener("click", () => {
  loginContainerGenerally.style.display = "none";
  document.body.style.overflow = "";
});

// !swipper customize

const swiperCards = document.querySelector('.most_popular_right_cards');
const leftButton = document.querySelector('.swiper-button.left');
const rightButton = document.querySelector('.swiper-button.right');
let currentIndex = 0;

const slideWidth = swiperCards.children[0].offsetWidth;
const totalSlides = swiperCards.children.length;

leftButton.addEventListener('click', () => {
  currentIndex = Math.max(currentIndex - 1, 0);
  updateSwiperPosition();
});

rightButton.addEventListener('click', () => {
  currentIndex = Math.min(currentIndex + 1, totalSlides - 4);
  updateSwiperPosition();
});

function updateSwiperPosition() {
  swiperCards.style.transform = `translateX(-${currentIndex * slideWidth}px)`;

  if (currentIndex === 0) {
    leftButton.classList.add("disabled");
  } else {
    leftButton.classList.remove("disabled");
  }

  if (currentIndex === totalSlides - 4) {
    rightButton.classList.add("disabled");
  } else {
    rightButton.classList.remove("disabled");
  }
}

updateSwiperPosition();


// !select dropdown

const optionMenu = document.querySelector(".select-menu"),
  selectBtn = optionMenu.querySelector(".select-btn"),
  options = optionMenu.querySelectorAll(".option"),
  sBtn_text = optionMenu.querySelector(".sBtn-text");
selectBtn.addEventListener("click", () => optionMenu.classList.toggle("active"));
options.forEach(option => {
  option.addEventListener("click", () => {
    let selectedOption = option.querySelector(".option-text").innerText;
    sBtn_text.innerText = selectedOption;
    optionMenu.classList.remove("active");
  });
});
