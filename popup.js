let BLOCKED = [
    '[class*="ad"]',
    '[id*="ad"]',
];

let BLOCKED_URL = [
    "animekimi.com",
]


const addEl = (value) => {
    const el = document.createElement('div')
    el.className = 'content'
    const input = document.createElement('input')
    input.type = 'text'
    input.value = value
    input.style.backgroundColor = 'white'
    input.style.color = 'black'
    el.appendChild(input)
    const button = document.createElement('button')
    button.innerText = 'X'
    button.className = 'remove'
    button.addEventListener('click', () => {
        const index = BLOCKED.indexOf(value)
        BLOCKED.splice(index, 1)
        chrome?.storage?.local.set({ 'key': BLOCKED }, () => { });
        el.remove()
    })
    el.appendChild(button)
    document.body.appendChild(el)
}

const addUrl = (value) => {
    const el = document.createElement('div')
    el.className = 'content'
    const input = document.createElement('input')
    input.type = 'text'
    input.value = value
    input.style.backgroundColor = 'black'
    input.style.color = 'white'
    el.appendChild(input)

    const button = document.createElement('button')
    button.innerText = 'X'
    button.className = 'remove'
    button.addEventListener('click', () => {
        const index = BLOCKED_URL.indexOf(value)
        BLOCKED_URL.splice(index, 1)
        chrome?.storage?.local.set({ 'url': BLOCKED_URL }, () => { });
        el.remove()
    })
    el.appendChild(button)
    document.body.appendChild(el)
}


const onAddEl = () => {
    const el = document.createElement('div')
    el.className = 'content'
    const input = document.createElement('input')
    input.type = 'text'
    input.placeholder = 'Enter CSS Selector'
    el.appendChild(input)
    const button = document.createElement('button')
    button.innerText = 'X'
    button.className = 'remove'
    button.addEventListener('click', () => {
        const index = BLOCKED.indexOf(input.value)
        BLOCKED.splice(index, 1)
        chrome?.storage?.local.set({ 'key': BLOCKED }, () => { });
        el.remove()
    })

    input.addEventListener('change', () => {
        if (!BLOCKED?.find((value) => value === input.value)) {
            BLOCKED.push(input.value)
            chrome?.storage?.local.set({ 'key': BLOCKED }, () => { });
        }
    })
    el.appendChild(button)
    document.body.appendChild(el)
}

const onAddUrl = () => {
    const el = document.createElement('div')
    el.className = 'content'
    const input = document.createElement('input')
    input.type = 'text'
    input.placeholder = 'Enter URL'
    el.appendChild(input)
    const button = document.createElement('button')
    button.innerText = 'X'
    button.className = 'remove'
    button.addEventListener('click', () => {
        const index = BLOCKED_URL.indexOf(input.value)
        BLOCKED_URL.splice(index, 1)
        chrome?.storage?.local.set({ 'url': BLOCKED_URL }, () => { });
        el.remove()
    })

    input.addEventListener('change', () => {
        if (!BLOCKED_URL?.find((value) => value === input.value)) {
            BLOCKED_URL.push(input.value)
            chrome?.storage?.local.set({ 'url': BLOCKED_URL }, () => { });
        }
    })
    el.appendChild(button)
    document.body.appendChild(el)
}

const initEl = () => {
    const flexRow = document.createElement('div')
    flexRow.className = 'flex-row'
    const h1 = document.createElement('h1')
    h1.innerText = 'BLOCKED LIST'
    h1.style.width = '100%'
    h1.style.backgroundColor = 'white'
    h1.style.color = 'black'
    h1.style.lineHeight = '50px'
    h1.style.border = '1px solid black'
    h1.style.margin = '0.5rem 0'
    flexRow.appendChild(h1)
    const div = document.createElement('div')
    const button = document.createElement('button')
    button.className = 'add'
    const innerText = document.createElement('div')
    innerText.innerText = 'X'
    button.appendChild(innerText)
    button.addEventListener('click', onAddEl)
    flexRow.appendChild(button)
    document.body.appendChild(flexRow)

    chrome?.storage?.local?.get(['key'], function (result) {
        if (result.key) BLOCKED = result.key;
        else chrome.storage.local.set({ 'key': BLOCKED }, () => { });
        BLOCKED?.forEach((value) => {
            addEl(value)
        })
    });
}

const initUrl = () => {
    const flexRow2 = document.createElement('div')
    flexRow2.className = 'flex-row'
    const h2 = document.createElement('h1')
    h2.innerText = 'BLOCKED URL'
    h2.style.backgroundColor = 'black'
    h2.style.color = 'white'
    h2.style.width = '100%'
    h2.style.lineHeight = '50px'
    h2.style.margin = '0.5rem 0'
    flexRow2.appendChild(h2)
    const div2 = document.createElement('div')
    const button2 = document.createElement('button')
    button2.className = 'add'
    const innerText2 = document.createElement('div')
    innerText2.innerText = 'X'
    button2.appendChild(innerText2)
    button2.addEventListener('click', onAddUrl)
    flexRow2.appendChild(button2)
    document.body.appendChild(flexRow2)

    chrome?.storage?.local?.get(['url'], function (result) {
        if (result.url) BLOCKED_URL = result.url;
        else chrome.storage.local.set({ 'url': BLOCKED_URL }, () => { });
        BLOCKED_URL?.forEach((value) => {
            addUrl(value)
        })
    });
}



const init = () => {
    initEl()
    initUrl()
}


document.addEventListener("DOMContentLoaded", () => {
    init();
});