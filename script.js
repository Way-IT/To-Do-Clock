
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
const form = document.querySelector('.s')
const obolCir = document.querySelector('.obol')
const btnShow = document.querySelector('#show-desk')
let timeMin = '12:00'
let timeMax = '23:59'
let x = 0
let taskCount = 1
let chosenColor = 0
let collection = document.getElementsByClassName('progress-ring__circle')
butt.addEventListener('click', () => {
    let testMin = from.value
    let testMax = to.value
    if ((testMin >= timeMin) && (testMin < testMax || (testMax =='00:00')) && (testMax > '12:00' || testMax == '00:00') && (testMin != '00:00') && (btnNameTask.value.trim() != '')) {
        console.log(`first - ${testMin}, last - ${testMax}`)
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
        timeMin = to.value
        setTimeout(() => {
            from.setAttribute('min', timeMin)
        }, 0); 
        createTime(c,(okr - rez), d)
        createTask(c, valueDesk,from.value,to.value)
        console.log(from)
        from.value = to.value
    }

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
    let dd = document.querySelector('.list-desk_body')
    let div = document.createElement('div')
    let pp = `number-${taskCount}`
    div.classList.add('list-desk_body__item')
    div.classList.add(pp)
    div.style.color = color
    div.innerHTML = `${from} - ${to}`
    const p = document.createElement('p')
    p.classList.add('name-task')
    p.innerHTML = name
    div.style.borderBottom = `2px solid ${color}`
    div.addEventListener('mouseover', (event)=> {
        event.target.style.cursor = 'pointer'
        let b = '.' + event.target.classList[1]
        let a = document.querySelector('.obol').querySelector(b)
        for (let elem of collection) {
            elem.classList.add('opa')
            if (elem.classList.contains(event.target.classList[1])) {
                elem.classList.remove('opa')
            } 
        } 

    })
    div.addEventListener('mouseleave', (event)=> {
        let b = '.' + event.target.classList[1]
        let a = document.querySelector('.obol').querySelector(b)
        for (let elem of collection) {
            elem.classList.remove('opa')
        }
    })
    div.prepend(p);
    dd.append(div);
    taskCount++
    
}


function createTime(col,size,cor) {
let clone = document.querySelector('.progress-ring').cloneNode(true)
clone.classList.add('position')
let ell = clone.firstElementChild;
let yy = `number-${taskCount}`
ell.classList.add('fuck')
ell.classList.add(yy)
ell.style.strokeDashoffset = size
ell.style.stroke = col
ell.style.transform = `rotate(${-90 + cor}deg)`
ell.style.cursor = 'pointer'
obolCir.append(clone)
}

btnShow.addEventListener('click', () => {
    if (btnShow.value === 'Hide') {
    desk.style.display = 'none';
    btnShow.value = 'Show'
    btnShow.style.boxShadow = "0 0 5px #0de906"
    btnShow.style.border = '1px solid rgb(13, 233, 5)'
    } else if (btnShow.value === 'Show') {
        desk.style.display = 'block';
    btnShow.value = 'Hide'
    btnShow.style.boxShadow = '0 0 0 '
    btnShow.style.border = ''
    }
})

