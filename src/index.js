//! GLOBAL VARIABLES
const DOGSURL = 'http://localhost:3000/pups';

const nav = document.querySelector('#dog-bar');
const dogInfo = document.querySelector('#dog-info');
let dogStatus;

//! HELPERS
const appendDog = dog => {
    const span = document.createElement('span');
    span.textContent = dog.name;
    span.addEventListener('click', () => displayDogInfo(dog))

    nav.append(span);

}   

const displayDogInfo = dog => {
    const image = document.createElement('img');
    image.src = dog.image;
    image.alt = dog.name;
    const h2 = document.createElement('h2');
    h2.textContent = dog.name;
    const btn = document.createElement('button');
    btn.textContent = (dog.isGoodDog) ? 'Good Dog!' : 'Bad Dog!';
    btn.addEventListener('click', () => updateDogStatus(dog))
    
    while (dogInfo.firstChild) {
        dogInfo.removeChild(dogInfo.lastChild);
    }
    dogInfo.append(image, h2, btn);
}

const updateDogStatus = dog => {
    fetch(`${DOGSURL}/${dog.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'isGoodDog': (dog.isGoodDog) ? false : true
        })
    })
    .then(resp => resp.json())
    .then(newDogStatus => displayDogInfo(newDogStatus))
}

//! EXECUTE
fetch(DOGSURL)
.then(resp => resp.json())
.then(dogs => dogs.forEach(dog => appendDog(dog)))
