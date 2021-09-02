const searceInputField = document.getElementById('input-field');
const displayingShowBooks = document.getElementById('displaying-books');
const loadingSpinner = document.getElementById('loading-spinner');
loadingSpinner.style.display = 'none';
const countingOfFoundResult = document.getElementById('found-counting');
const errorMessage1 = document.getElementById('first-error-handle');
const errorMessage2 = document.getElementById('secund-error-handle');

// searce books
const searceBook = () => {
    const searceText = searceInputField.value;
    searceInputField.value = '';

    if (searceText === '') {
        // error handle 1 
        errorMessage1.style.display = 'block';
        // clear display
        displayingShowBooks.innerText = '';
        countingOfFoundResult.style.display = 'none';
        errorMessage2.style.display = 'none';

    }
    else {
        // loading spinner
        loadingSpinner.style.display = 'block';
        // clear display
        displayingShowBooks.innerText = '';
        countingOfFoundResult.style.display = 'none';
        errorMessage1.style.display = 'none';
        errorMessage2.style.display = 'none';

        // fetch data
        fetch(`https://openlibrary.org/search.json?q=${searceText}`)
            .then(res => res.json())
            .then(data => showBooks(data))
    }
}

const showBooks = (books) => {
    countingOfFoundResult.style.display = 'none';
    countingOfFoundResult.innerHTML = `
    <h2 class="text-center fw-bold text"> Showing <span class=" text-count">${books.docs.length}</span> results out of <span class=" text-count"> ${books.numFound}</span> </h2> 
    `
    // error handle 2
    if (books.docs.length === 0) {
        errorMessage2.style.display = 'block';
    } else if (books.docs.length > 0) {
        countingOfFoundResult.style.display = 'block';
        errorMessage2.style.display = 'none';
    }

    // loading spinner
    loadingSpinner.style.display = 'none';

    displayingShowBooks.innerText = '';
    const allBooks = books.docs;
    allBooks.forEach(book => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card h-100">
            <img src= "https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top w-100 mb-5" style="height: 250px; object-fit: cover;">
            <div class="card-body">
                <h5 class="card-title"><span class="text">Name :</span> ${book.title ? book.title : 'N/a'}</h5>
                 <h5><span class="text">Author :</span> ${book.author_name ? book.author_name[0] : 'N/a'}</h5>
                <h5><span class="text">Publisher :</span> ${book.publisher ? book.publisher[0] : 'N/a'}</h5>
                <h5><span class="text">First publish  :</span> ${book.first_publish_year ? book.first_publish_year : 'N/a'}</h5>
            </div>
        </div>
        `
        displayingShowBooks.appendChild(div);
    });
}