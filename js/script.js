
/*
Напишите небольшое приложение, которое будет работать с Rick&Morty API.

Начальный код представлен в архивах ниже:
version 1 - empty -- содержит чистый js файл для написания функций с нуля
version 2 - with card renders -- содержит функцию которая рисует карточку со статическими данными.

Напишите функцию, которая получает с сервера массив персонажей мультфильма
и отрисовывает их на странице в карточках.

Данные в карточках заполнять согласно тестовому примеру в html файле.

Если персонаж мертв, нужно добавлять класс dead к диву с классом 'live-status'.

upd: Напишите функцию, которая по клику на фильтр в правом верхнем углу фильтрует персонажей
по соответсвующим критериям (male/female/ alive/dead).

Ожидаемый результат приведен на скринах ниже:
10 персонажей с id от 1 до 10;

список персонажей отфильтрованных по критерию gender=female;

https://rickandmortyapi.com/documentation/#get-multiple-characters - вот тут есть дока по API
*/

const apiUrl = 'https://rickandmortyapi.com/api/character/';
let charArr = [1,2,3,4,5,6,7,8,9,10];

const request = fetch(apiUrl + charArr.toString());

let characters;

request.then(req => req.json())
    .then(data => {
        render(data);
        characters = {...data}
    })
    .catch(err => {
        console.log(err);
});


function render(obj) {
    const divCharacters = document.getElementById('characters');

    for(elem of obj) {
        if(elem === undefined || elem ==='undefined[object Object]') continue;
        const divCard = document.createElement('div');
        divCard.classList.add('card');

        const divCardInfo = document.createElement('div');
        divCardInfo.classList.add('card-info');
            const divTitle = document.createElement('div');
            divTitle.classList.add('title');
                const h1 = document.createElement('h1');
                h1.innerText = elem.name;
                const divStatus = document.createElement('div');
                divStatus.classList.add('status')
                    const divLiveStatus = document.createElement('div');
                    divLiveStatus.classList.add('live-status');
                    if (elem.status === 'Dead') divLiveStatus.classList.add('dead');
                    const pStatus = document.createElement('p');
                    pStatus.innerHTML = `${elem.species} -- ${elem.status}`;
                    divStatus.append(divLiveStatus, pStatus);

                divTitle.append(h1, divStatus);

            const divContent = document.createElement('div');
            divContent.classList.add('content');
                const pLocation = document.createElement('p');
                pLocation.innerHTML = elem.location.name;
                divContent.appendChild(pLocation);
            divCardInfo.append(divTitle, divContent);


        const divCardImage = document.createElement('div');
        divCardImage.classList.add('card-image');
            const img = document.createElement('img');
            img.src = elem.image;
            img.alt = 'Img';
            divCardImage.appendChild(img);

        divCard.append(divCardInfo, divCardImage);

        divCharacters.appendChild(divCard);
    };
};


// Фильтр из формы

const form = document.forms[0];

form.addEventListener('change', ()=>{

    let newData = [];

    const male = document.getElementById('male').checked ? 'Male' : null;
    const female = document.getElementById('female').checked ? 'Female' : null;
    const alive = document.getElementById('alive').checked ? 'Alive' : null;
    const dead = document.getElementById('dead').checked ? 'Dead' : null;


    for (i in characters) {

        if (
            (characters[i].gender === male || characters[i].gender === female) &&
            (characters[i].status === alive || characters[i].status === dead)

        ) {
            newData[i] += characters[i];
        } else if (
            (characters[i].gender === male || characters[i].gender === female) &&
            (alive === null && dead === null)
        ) {
            newData[i] = characters[i];
        } else if (
            (male === null ||female === null) &&
            (characters[i].status === alive || characters[i].status === dead)
        ) {
            newData[i] = characters[i];
        } else if (male === null && female === null && alive === null && dead === null) {
            newData[i] = characters[i];
        }


    }

    const charactersOld = document.getElementById('characters');
    while(charactersOld.firstChild) {
        charactersOld.removeChild(charactersOld.firstChild);
    }
    render(newData)
});

