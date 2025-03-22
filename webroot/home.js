/*
    Buttons@ home
*/
this.dailyHomeBtn =  /** @type {HTMLButtonElement} */ (
    document.querySelector('#dailyHomeBtn')
);

this.rapidHomeBtn =  /** @type {HTMLButtonElement} */ (
    document.querySelector('#rapidHomeBtn')
);

this.leaderboardHomeBtn =  /** @type {HTMLButtonElement} */ (
    document.querySelector('#leaderboardHomeBtn')
);

this.howtoHomeBtn =  /** @type {HTMLButtonElement} */ (
    document.querySelector('#howtoHomeBtn')
);

/*
    buttons @pages
*/

this.dailyBtn =  /** @type {HTMLButtonElement} */ (
    document.querySelector('#dailyBtn')
);

this.leaderboardBtn =  /** @type {HTMLButtonElement} */ (
    document.querySelector('#leaderboardBtn')
);

this.rapidBtn =  /** @type {HTMLButtonElement} */ (
    document.querySelector('#rapidBtn')
);

this.howtoBtn =  /** @type {HTMLButtonElement} */ (
    document.querySelector('#howtoBtn')
);

/*
    event listeners
*/

this.dailyHomeBtn.addEventListener('click', ()=> {
    console.log('dailyHome');
    switchPage('daily')
});

this.rapidHomeBtn.addEventListener('click', ()=> {
    console.log('rapidHome');
    switchPage('rapid')
});

this.leaderboardHomeBtn.addEventListener('click', ()=> {
    console.log('leaderboardHome');
    switchPage('leaderboard')
});

this.howtoHomeBtn.addEventListener('click', ()=> {
    console.log('howtoHome');
    switchPage('howto')
});

this.dailyBtn.addEventListener('click', ()=> {
    console.log('dailyBtn');
    switchPage('home')
});
this.rapidBtn.addEventListener('click', ()=> {
    console.log('dailyBtn');
    switchPage('home')
});
this.leaderboardBtn.addEventListener('click', ()=> {
    console.log('dailyBtn');
    switchPage('home')
});
this.howtoBtn.addEventListener('click', ()=> {
    console.log('dailyBtn');
    switchPage('home')
});



function reset()
{

    let hiddenElements = document.querySelectorAll('.page');
    hiddenElements.forEach(function (element){
        element.classList.add('hidden');
    });
}

function switchPage(page)
{
    reset();

    let elements = document.getElementsByClassName(page);
    for (let i = 0; i < elements.length; i++) {
        elements[i].classList.remove("hidden"); // Toggles the hidden class
}
    
}