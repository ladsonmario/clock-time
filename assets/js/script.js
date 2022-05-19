/* ********************relogio/clima****************************** */
let digitalElement = document.querySelector('.digital');
let hElement = document.querySelector('.h');
let mElement = document.querySelector('.m');
let sElement = document.querySelector('.s');

function hours() {
    let d = new Date();
    let h = d.getHours();
    let m = d.getMinutes();
    let s = d.getSeconds();
    digitalElement.innerHTML = `${timeZero(h)}:${timeZero(m)}:${timeZero(s)}`;

    let sDeg = ((360 / 60) * s) -90;
    let mDeg = ((360 / 60) * m) -90;
    let hDeg = ((360 / 12) * h) -90;

    sElement.style.transform = `rotate(${sDeg}deg)`;
    mElement.style.transform = `rotate(${mDeg}deg)`;
    hElement.style.transform = `rotate(${hDeg}deg)`;    

    if(h == m && s == 0) {
        window.alert(`São ${h}:${m} saiba que eu te amo muito e que você é a minha vida!`);
    }
}

function timeZero(time) {
    if(time < 10) {
        return `0${time}`;
    } else {
        return time;
    }
}

setInterval(hours, 1000);
hours();

/* ************************************************************** */
async function clima() {
    let ananin = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI('ananindeua')}&appid=7f17bb0e14eca50bfe5211db2e0a8809&units=metric&lang=pt_br`;
    let belem = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI('belem')}&appid=7f17bb0e14eca50bfe5211db2e0a8809&units=metric&lang=pt_br`;
    /* **********ANANINDEUA*********** */
    let resultAnanin = await fetch(ananin);
    let jsonAnanin = await resultAnanin.json();
    
    /* *************BELÉM************ */
    let resultBelem = await fetch(belem);
    let jsonBelem = await resultBelem.json();
    

    if(jsonAnanin.cod === 200) {
        infoAnanin({
            name: jsonAnanin.name,
            country: jsonAnanin.sys.country,
            temp: jsonAnanin.main.temp,
            description: jsonAnanin.weather[0].description,
            tempIcon: jsonAnanin.weather[0].icon,
            wind: jsonAnanin.wind.speed,
            windDeg: jsonAnanin.wind.deg
        });
    }

    if(jsonBelem.cod === 200) {
        infoBelem({
            name: jsonBelem.name,
            country: jsonBelem.sys.country,
            temp: jsonBelem.main.temp,
            description: jsonBelem.weather[0].description,
            tempIcon: jsonBelem.weather[0].icon,
            wind: jsonBelem.wind.speed,
            windDeg: jsonBelem.wind.deg
        });
    }
    
}

function infoAnanin(jsonAnanin) {
    document.querySelector('.ananindeua .city').innerHTML = `${jsonAnanin.name}, ${jsonAnanin.country}`;
    document.querySelector('.ananindeua .temp span').innerHTML = `${jsonAnanin.temp} <sup>°C</sup>`;
    document.querySelector('.ananindeua img').src = `http://openweathermap.org/img/wn/${jsonAnanin.tempIcon}@2x.png`;
    document.querySelector('.ananindeua .vento span').innerHTML = `${jsonAnanin.wind} <sup>km/h</sup>`;
    document.querySelector('.ananindeua .ventoPonto').style.transform = `rotate(${jsonAnanin.windDeg - 90}deg)`;
    document.querySelector('.ananindeua .vento .clima').innerHTML = `${jsonAnanin.description}`;    
}

function infoBelem(jsonBelem) {
    document.querySelector('.belem .city').innerHTML = `${jsonBelem.name}, ${jsonBelem.country}`;
    document.querySelector('.belem .temp span').innerHTML = `${jsonBelem.temp} <sup>°C</sup>`;
    document.querySelector('.belem img').src = `http://openweathermap.org/img/wn/${jsonBelem.tempIcon}@2x.png`;
    document.querySelector('.belem .vento span').innerHTML = `${jsonBelem.wind} <sup>km/h</sup>`;
    document.querySelector('.belem .ventoPonto').style.transform = `rotate(${jsonBelem.windDeg - 90}deg)`;
    document.querySelector('.belem .vento .clima').innerHTML = `${jsonBelem.description}`;    
}

setInterval(clima, 1800000);
clima();