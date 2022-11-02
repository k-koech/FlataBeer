const url = 'https://flatabeer001.herokuapp.com/beers/'
let parentEl = document.getElementById('beer-list')

document.addEventListener('DOMContentLoaded', () => {
    getBeer()

})

function getBeer(){
    fetch(url).then(res => res.json()).then(data => {
        beerDescription(data[0])
        beerReviews(data[0])

        data.forEach(beer => {
            singleBeer(beer)
        });
    })
}

function singleBeer(beer){
    const childEl = document.createElement('li')

    childEl.innerHTML = beer.name

    parentEl.appendChild(childEl)

    childEl.addEventListener('click', () => {
        beerDescription(beer)
        handleDescription(beer)
        beerReviews(beer)
        handleReview(beer)
    })
    
}

function beerDescription(beer){
    const beerName = document.getElementById('beer-name').innerHTML = beer.name
    const beerImage = document.getElementById('beer-image').src = beer.image_url
    const beerDescription = document.getElementById('beer-description').innerHTML = beer.description
}

function beerReviews(beer){
    let allReviews = beer.reviews
    var data = ''
    for (const review of allReviews) {
        data += `
        <li>${review}</li>
         `
    }
    document.getElementById('review-list').innerHTML = data

}

function updateBeer(beer)
{
    fetch(url + `${beer.id}`, {
        method:'PATCH', 
        headers: {
        'Content-type': 'application/json',
    },
    body: JSON.stringify(beer)
}).then(res => {res.json()
   console.log("saved")
})
.then(data => beerDescription(data))
}

function handleDescription(beer){
    let form = document.getElementById('description-form')
    form.addEventListener('submit', event => {
        event.preventDefault()
        beer.description = form.description.value;
        console.log(beer.description);
        form.reset()
    })
}

function handleReview(beer){
    let form = document.getElementById('review-form')
    console.log("xxx",form)
    form.addEventListener('submit', event => {
        event.preventDefault()
        let newReview = form.review.value;
        beer.reviews.push(newReview)
        updateBeer(beer)
    })
}

// function postReview(beer){
//     fetch(url + `${beer.id}`, {
//         method:'POST', 
//         headers: {
//             'Content-type': 'application/json',
//             'Access-Control-Allow-Credentials' : true,
//             'Access-Control-Allow-Origin':'*',
//             'Access-Control-Allow-Methods':'GET',
//             'Access-Control-Allow-Headers':'application/json',
//     },
//     body: JSON.stringify(beer)
// }).then(res => res.json())
// .then(data => console.log(data))
// }








