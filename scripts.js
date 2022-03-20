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
        const data = await res.json() //have a look the retrieved data
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
    renderNewGames
}
