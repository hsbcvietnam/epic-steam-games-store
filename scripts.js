window.addEventListener('load', (event) => {
  renderHeroBanner();
  renderHeroImg(730);
  renderSliders();
  /* renderFreeGame();
  renderGameList(); */
});

// Get game list
const getFeaturedGames = async ()=>{
    try{
        const url = `https://cs-steam-api.herokuapp.com/features`
        const res = await fetch(url)
        const data = await res.json()
        return data
    } catch(err) {
        console.log("err", err)
    }
}

const getGameByCategory = async (category)=>{
    try{
        const url = `https://cs-steam-api.herokuapp.com/games?steamspy_tags=${category}`
        const res = await fetch(url)
        const data = await res.json()
        return data
    } catch(err) {
        console.log("err", err)
    }
}

const getAllGames = async ()=>{
    try{
        const url = `https://cs-steam-api.herokuapp.com/games?limit=1000?page=1`
        const res = await fetch(url)
        const data = await res.json()
        return data;
    } catch(err) {
        console.log("err", err)
    }
}

const getCategory = async ()=>{
    try{
        const url = `https://cs-steam-api.herokuapp.com/steamspy-tags?limit=339`
        const res = await fetch(url)
        const data = await res.json()
        return data
    } catch(err) {
        console.log("err", err)
    }
}

// Hero banner
const renderHeroBanner = async()=>{
    try{
        const data = await getFeaturedGames()
        const featuredGameList = document.getElementById("featured-game-list")
        const ulFeaturedGameList = featuredGameList.children[0]
        ulFeaturedGameList.innerHTML=""
        for (i = 0; i < 5; i++) {
          const x = document.createElement("li")
          x.innerHTML = `<div class="featured-game-img" onclick="renderHeroImg(${data.data[i].appid})"><img src="${data.data[i].header_image}" alt=""></div>
          <div class="featured-game-name" onclick="renderHeroImg(${data.data[i].appid})">${data.data[i].name}</div>`;
          ulFeaturedGameList.appendChild(x)
        }
    } catch(err){
        console.log("err", err)
    }
}

const renderHeroImg = async(gameid) => {
  try{
      const data = await getFeaturedGames()
      const heroImage = document.getElementById("hero-img")
      heroImage.innerHTML = ""
      const x = document.createElement("div")
      const game = data.data.find(a => a.appid == gameid)
      heroImage.style.background = `url(${game.header_image})`
      if (game.price === 0) {
        x.innerHTML = `<div class="mg-bt">
        <div class="description fonts">${game.description}</div>
        <div class="price fonts-free">Free</div>
        <div class="flex-hero">
          <div class="get-btn fonts1" class="btn">Play for free</div>
          <div class="wishlist-btn fonts1" class="btn"><i class="fa-solid fa-circle-plus"></i>Add to wishlist</div>
        </div>
        </div>`
      } else {
        x.innerHTML = `<div class="mg-bt">
        <div class="description fonts">${game.description}</div>
        <div class="price fonts-free">$ ${game.price}</div>
        <div class="flex-hero">
          <div class="get-btn fonts1" class="btn">$ ${game.price}</div>
          <div class="wishlist-btn fonts1" class="btn"><i class="fa-solid fa-circle-plus"></i>Add to wishlist</div>
        </div>
        </div>`
      }
      heroImage.appendChild(x)
  } catch(err){
      console.log("err", err)
  }
}

// Sliders
const renderSliders = () =>{
    renderNewGames();
    getRandomCategory();
}

const renderNewGames = async()=>{
    try{
      const data = await getAllGames()
      const newGames = document.getElementById("new-games")
      const ulNewGames = newGames.children[0]
      ulNewGames.innerHTML = ""
      for (i = 0; i < 5; i++) {
        const x = document.createElement("li")
        if (data.data[i].price === 0) {
          x.innerHTML = `<div class="game-area-slider">
            <div class="game-img-medium"><img src="${data.data[i].header_image}" alt=""></div>
            <div class="game-name">${data.data[i].name}</div>
            <div class="game-flex">
              <div>
                <div class="new-price">Free to play</div>
              </div>
            </div>
          </div>`
        } else {
          x.innerHTML = `<div class="game-area-slider">
            <div class="game-img-medium"><img src="${data.data[i].header_image}" alt=""></div>
            <div class="game-name">${data.data[i].name}</div>
            <div class="game-flex">
              <div>
                <div class="new-price">$ ${data.data[i].price}</div>
              </div>
            </div>
          </div>`
        }
        ulNewGames.appendChild(x)
      }
    } catch(err){
        console.log("err", err)
    }
}

const renderGameByCategory = async(i, item)=>{
    try{
      const data = await getGameByCategory(item)
      const newGames = document.getElementById(`category-game-${i}`)
      const ulNewGames = newGames.children[0]
      ulNewGames.innerHTML = ""
      for (i = 0; i < 5; i++) {
        const x = document.createElement("li")
        if (data.data[i].price === 0) {
          x.innerHTML = `<div class="game-area-slider">
            <div class="game-img-medium"><img src="${data.data[i].header_image}" alt=""></div>
            <div class="game-name">${data.data[i].name}</div>
            <div class="game-flex">
              <div>
                <div class="new-price">Free to play</div>
              </div>
            </div>
          </div>`
        } else {
          x.innerHTML = `<div class="game-area-slider">
            <div class="game-img-medium"><img src="${data.data[i].header_image}" alt=""></div>
            <div class="game-name">${data.data[i].name}</div>
            <div class="game-flex">
              <div>
                <div class="new-price">$ ${data.data[i].price}</div>
              </div>
            </div>
          </div>`
        }
        ulNewGames.appendChild(x)
      }
    } catch(err){
        console.log("err", err)
    }
}

const renderRandomCategory = async(category, i)=>{
  const categoryGame = document.getElementById("category-game")
  const ulCategoryGame = categoryGame.children[0]
          const x = document.createElement("li")
          x.innerHTML = `<div class="title-bar">
              <div class="section-title">${category} games</div>
              <div class="title-bar-hn">
                <div class="title-bar-button"><button>Show All</button></div>
              </div>
            </div>
            <div id="category-game-${i}" class="new-game-flex">
              <ul>
                <li>
                  <div class="game-area-slider">
                    <div class="game-img-medium"><img src="./anh-free-fire-1.jpg" alt=""></div>
                    <div class="game-name">Crysis 3 Remastered</div>
                    <div class="game-flex">
                      <div>
                        <div class="new-price">&#8363;168,000</div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>`
          ulCategoryGame.appendChild(x)
          renderGameByCategory(i, category)
}

const getRandomCategory = async() =>{
  try {
    const data = await getCategory()
    const index = getRandomNumbers()
    const categoryGame = document.getElementById("category-game")
    const ulCategoryGame = categoryGame.children[0]
    ulCategoryGame.innerHTML = ""
    for (i = 0; i < 3; i++) {
      renderRandomCategory(data.data[index[i]].name, i)
    }
  } catch(err) {
    console.log("err", err)
  }
}

const getRandomNumbers = () => {
  let a = Math.floor(Math.random() * (338 - 0 + 1)) + 0;
  let b = Math.floor(Math.random() * (338 - 0 + 1)) + 0;
  while (a === b) {
    b = Math.floor(Math.random() * (338 - 0 + 1)) + 0;
  }
  let c = Math.floor(Math.random() * (338 - 0 + 1)) + 0;
  while (a === c || b === c) {
    c = Math.floor(Math.random() * (338 - 0 + 1)) + 0;
  }
  let arr = []
  arr.push(a)
  arr.push(b)
  arr.push(c)
  return arr
}
