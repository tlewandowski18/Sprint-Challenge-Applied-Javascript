// STEP 3: Create Article cards.
// -----------------------
// Send an HTTP GET request to the following address: https://lambda-times-backend.herokuapp.com/articles
// Stduy the response data you get back, closely.
// You will be creating a component for each 'article' in the list.
// This won't be as easy as just iterating over an array though.
// Create a function that will programmatically create the following DOM component:
//
// <div class="card">
//   <div class="headline">{Headline of article}</div>
//   <div class="author">
//     <div class="img-container">
//       <img src={url of authors image} />
//     </div>
//     <span>By {authors name}</span>
//   </div>
// </div>
//
// Create a card for each of the articles and add the card to the DOM.

const cardsContainer = document.querySelector('.cards-container');

axios
  .get('https://lambda-times-backend.herokuapp.com/articles')
    .then(res => {
        // console.log(res)
        const keysList = Object.keys(res.data.articles)
        keysList.forEach(key => {
            const articleArr = res.data.articles[key]
            articleArr.forEach(article => {
                cardsContainer.appendChild(createCard(article))
            })
        })
    })
    .catch (err => {
        console.log(`You have an error: ${err}`);
    })

function createCard(obj) {
    const card = document.createElement('div');
    const headline = document.createElement('div');
    const authorContainer = document.createElement('div');
    const authorImgContainer = document.createElement('div');
    const authorImg = document.createElement('img');
    const authorName = document.createElement('span');

    card.appendChild(headline);
    card.appendChild(authorContainer);
    authorContainer.appendChild(authorImgContainer);
    authorContainer.appendChild(authorName);
    authorImgContainer.appendChild(authorImg);
    
    card.classList.add('card');
    headline.classList.add('headline');
    authorContainer.classList.add('author');
    authorImgContainer.classList.add('img-container');

    headline.innerHTML = obj.headline;
    authorImg.src = obj.authorPhoto;
    authorName.innerHTML = obj.authorName;

    return card;
}