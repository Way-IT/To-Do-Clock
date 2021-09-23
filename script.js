const deg = 6;
const hr = document.querySelector('#hr');
const mn = document.querySelector('#min');
const sc = document.querySelector('#sec');
const from = document.querySelector('#from');
const to = document.querySelector('#to');
const color = document.querySelector('#color');
const butt = document.querySelector('#butt')
const circle = document.querySelector('.progress-ring__circle');
const radius = circle.r.baseVal.value;
const okr = 2 * Math.PI * radius;
circle.style.strokeDasharray = `${okr} ${okr}`;
circle.style.strokeDashoffset = okr;
butt.addEventListener('click', () => {
    let a = from.value.split(':');
    let b = to.value.split(':');
    let c = color.value
    let hour = Math.abs(a[0] - b[0]);
    let minuts = Math.abs(a[1] - b[1]);
    console.log(okr, c, minuts, a, circle.style.transform);
    let rez = izm(hour, minuts)
    console.log(rez)
    let d = corner(a[0],a[1])
    circle.style.transform = `rotate(${-90 + d}deg)`
    console.log(d)
    circle.style.strokeDashoffset = (okr - rez);
    circle.style.stroke = c
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
    if(h <= 12) {
        let deg = h* 143.41;
        deg = deg + (m * 2.39)
        return deg;
    } else { 
        let deg = (h - 12)* 143.41;
        deg = deg + (m * 2.39)
        return deg;
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