const deg = 6;
const hr = document.querySelector('#hr');
const mn = document.querySelector('#min');
const sc = document.querySelector('#sec');
const from = document.querySelector('#from');
const to = document.querySelector('#to');
const color = document.querySelector('#color');
const butt = document.querySelector('#btn')
const circle = document.querySelector('.progress-ring__circle');
const radius = circle.r.baseVal.value;
const okr = 2 * Math.PI * radius;
const btnNameTask = document.querySelector('#btnnametask')
const desk = document.querySelector('.list-desk_body')
circle.style.strokeDasharray = `${okr} ${okr}`;
circle.style.strokeDashoffset = okr;


butt.addEventListener('click', () => {
    let a = from.value.split(':');
    let b = to.value.split(':');
    let c = color.value
    let valueDesk = btnNameTask.value
    let hour = Math.abs(a[0] - b[0]);
    let minuts = forMinuts(a[1],b[1])
    let rez = izm(hour, minuts)
    let d = corner(a[0],a[1])
    circle.style.transform = `rotate(${-90 + d}deg)`
    circle.style.strokeDashoffset = (okr - rez);
    circle.style.stroke = c
    createTask(c, valueDesk,from.value,to.value)
})

function start() {
    setInterval(() => {
        let day = new Date();
        let hh = day.getHours() * 30;
        let mm = day.getMinutes() * deg;
        let ss = day.getSeconds() * deg;
        hr.style.transform = `rotateZ(${(hh) + (mm/12)}deg)`;
        min.style.transform = `rotateZ(${mm}deg)`;
        sc.style.transform = `rotateZ(${ss}deg)`
    } );
    
}
 start()

function izm (h, m) { 
    if (h <= 12) {    
    let deg = h* (okr / 12);
        deg = deg + (m * (okr / 12) / 60)
        return deg;
    } else if (h > 12) {
        let deg = (h - 12) * (okr / 12);
        deg = deg + (m * (okr / 12) / 60)
        deg = okr - deg
        return deg
    }
}

function corner(h,m) {
    if (h <= 11) {
        return (h * 30) + (m * 0.5)
    } else if (h == 12 || h == 0) {
        return (m * 0.5) 
    } else {
        return (h - 12) * 30 + (m * 0.5)
    }
}


function forMinuts (a,b) {
    if (a > b) {
        return -(Math.abs(a - b))
    } else {
        return Math.abs(a - b)
    }
}


function createTask(color, name, from, to) {
    let dd = document.querySelector('.list-desk_body__item')
    dd.style.color = color
    dd.innerHTML = `${from} - ${to}`
    const p = document.createElement('p')
    p.classList.add('name-task')
    p.innerHTML = name
    dd.prepend(p)
    
    
}

