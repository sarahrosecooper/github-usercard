import axios from "axios";

/*
  STEP 1: using axios, send a GET request to the following URL
    (replacing the placeholder with your Github name):
    https://api.github.com/users/<your name>
*/

const entryPoint = document.querySelector(".cards");
const getInformation = axios.get(
  "https://api.github.com/users/sarahrosecooper"
);

getInformation
  .then((r) => {
    console.log(r.data);
    const gitData = gitCard(r.data);
    entryPoint.appendChild(gitData);
  })
  .catch((error) => {
    console.log("Error", error);
  });
/*
  STEP 2: Inspect and study the data coming back, this is YOUR
    github info! You will need to understand the structure of this
    data in order to use it to build your component function

    Skip to STEP 3.
*/

/*
  STEP 4: Pass the data received from Github into your function,
    and append the returned markup to the DOM as a child of .cards
*/

/*
  STEP 5: Now that you have your own card getting added to the DOM, either
    follow this link in your browser https://api.github.com/users/<Your github name>/followers,
    manually find some other users' github handles, or use the list found at thenpm
    bottom of the page. Get at least 5 different Github usernames and add them as
    Individual strings to the friendsArray below.

    Using that array, iterate over it, requesting data for each user, creating a new card for each
    user, and adding that card to the DOM.
*/

const followersArray = [];
axios
  .get("https://api.github.com/users/sarahrosecooper/followers")
  .then(() => {
    return followersArray.concat([
      "ChadDiaz",
      "ajablanco",
      "ORiveraJr84",
      "BrityHemming",
      "sarahmarie1976",
      "cameronyoung94",
      "tetondan",
    ]);
  })
  .then((followers) => {
    followers.map((follower) => {
      axios
        .get(`https://api.github.com/users/${follower}`)
        .then((secondResponse) => {
          console.log("secondResponse", secondResponse);
          document
            .querySelector(".cards")
            .appendChild(gitCard(secondResponse.data));
        })
        .catch((err) => {
          console.log(err);
        });
    });
  })
  .catch((err) => {
    console.log(err);
  });

/*
  STEP 3: Create a function that accepts a single object as its only argument.
    Using DOM methods and properties, create and return the following markup:

    <div class="card">
      <img src={image url of user} />
      <div class="card-info">
        <h3 class="name">{users name}</h3>
        <p class="username">{users user name}</p>
        <p>Location: {users location}</p>
        <p>Profile:
          <a href={address to users github page}>{address to users github page}</a>
        </p>
        <p>Followers: {users followers count}</p>
        <p>Following: {users following count}</p>
        <p>Bio: {users bio}</p>
      </div>
    </div>
*/

const gitCard = (item) => {
  const card = document.createElement("div");
  const userImage = document.createElement("img");
  const cardInfo = document.createElement("div");
  const h3 = document.createElement("h3");
  const username = document.createElement("p");
  const location = document.createElement("p");
  const profile = document.createElement("p");
  const anchor = document.createElement("a");
  const followers = document.createElement("p");
  const following = document.createElement("p");
  const bio = document.createElement("p");

  // classes

  card.classList.add("card");
  cardInfo.classList.add("card-info");
  h3.classList.add("name");
  username.classList.add("username");

  // text content

  userImage.src = item.avatar_url;
  h3.textContent = item.name;
  username.textContent = item.login;
  location.textContent = `Location: ${item.location}`;
  profile.textContent = "Profile: ";
  anchor.textContent = item.html_url;
  following.textContent = `Following: ${item.following}`;
  followers.textContent = `Followers: ${item.followers}`;
  bio.textContent = `Bio ${item.bio}`;
  // append children

  card.append(userImage, cardInfo);
  cardInfo.append(h3, username, location, profile, followers, following, bio);
  profile.appendChild(anchor);

  return card;
};

/*
  List of LS Instructors Github username's:
    tetondan
    dustinmyers
    justsml
    luishrd
    bigknell
*/
