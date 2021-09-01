const searchBtn = () => {
    const searchInput = document.getElementById('search-input')
    const searchText = searchInput.value

    // document.getElementById('search-input') = '';
    const url = `http://openlibrary.org/search.json?q=${searchText}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayResult(data.docs))
}

const displayResult = items => {
    console.log(items);
    const showDetails = document.getElementById('show-details')
    for (const item of items) {
        // console.log(item.title);
        const cardPerentDiv = document.createElement('div')
        cardPerentDiv.classList.add('col')
        const cardItems = document.createElement('div')
        cardItems.classList.add('card')

        cardItems.innerHTML = `
            <img src="..." class="card-img-top" alt="">
            <div class="card-body">
                <h5 class="card-title">${item.title}</h5>
                <p class="card-text">This is a longer card with supporting text below as a natural lead-in
                to additional content. This content is a little bit longer.</p>
            </div>

`


        cardPerentDiv.appendChild(cardItems)
        showDetails.appendChild(cardPerentDiv)
    }
}