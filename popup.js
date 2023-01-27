let BLOCKED = [];

let BLOCKED_URL = []

let WRITE_URL = []


const addEl = (value) => {
    console.log(value)
    const el = document.createElement('div')
    el.className = 'content'
    const input = document.createElement('input')
    input.type = 'text'
    input.value = value.name
    input.style.backgroundColor = 'white'
    input.style.color = 'black'
    el.appendChild(input)
    const button = document.createElement('button')
    button.innerText = 'X'
    button.className = 'remove'
    button.addEventListener('click', () => {
        const index = BLOCKED.findIndex((item) => item.name === value.name)
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
    input.value = value.name
    input.style.backgroundColor = 'black'
    input.style.color = 'red'
    el.appendChild(input)

    const button = document.createElement('button')
    button.innerText = 'X'
    button.className = 'remove'
    button.addEventListener('click', () => {
        const index = BLOCKED_URL.findIndex((item) => item.name === value.name)
        BLOCKED_URL.splice(index, 1)
        chrome?.storage?.local.set({ 'url': BLOCKED_URL }, () => { });
        el.remove()
    })
    el.appendChild(button)
    document.body.appendChild(el)
}

const addWriteUrl = (value) => {
    console.log(value)
    const el = document.createElement('div')
    el.className = 'content'
    const input = document.createElement('input')
    input.type = 'text'
    input.value = value.name
    input.style.backgroundColor = 'black'
    input.style.color = 'white'
    el.appendChild(input)

    const button = document.createElement('button')
    button.innerText = 'X'
    button.className = 'remove'
    button.addEventListener('click', () => {
        const index = WRITE_URL.findIndex((item) => item.name === value.name)
        WRITE_URL.splice(index, 1)

        chrome?.storage?.local.set({ 'write_url': WRITE_URL }, () => { });
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
    input.style.backgroundColor = 'white'
    input.style.color = 'black'
    el.appendChild(input)
    const button = document.createElement('button')
    button.innerText = 'X'
    button.className = 'remove'
    button.addEventListener('click', () => {
        const index = BLOCKED.findIndex((value) => value.name === input.value)
        BLOCKED.splice(index, 1)
        chrome?.storage?.local.set({ 'key': BLOCKED }, () => { });
        el.remove()
    })

    input.addEventListener('change', () => {
        if (!BLOCKED?.find((value) => value.name === input.value)) {
            BLOCKED.push({ status: true, name: input.value })
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
    input.style.backgroundColor = 'black'
    input.style.color = 'red'
    el.appendChild(input)
    const button = document.createElement('button')
    button.innerText = 'X'
    button.className = 'remove'
    button.addEventListener('click', () => {
        const index = BLOCKED_URL.findIndex((value) => value.name === input.value)
        BLOCKED_URL.splice(index, 1)
        chrome?.storage?.local.set({ 'url': BLOCKED_URL }, () => { });
        el.remove()
    })

    input.addEventListener('change', () => {
        if (!BLOCKED_URL?.find((value) => value.name === input.value)) {
            BLOCKED_URL.push({ status: true, name: input.value })
            chrome?.storage?.local.set({ 'url': BLOCKED_URL }, () => { });
        }
    })
    el.appendChild(button)
    document.body.appendChild(el)
}

const onAddWriteUrl = () => {
    const el = document.createElement('div')
    el.className = 'content'
    const input = document.createElement('input')
    input.type = 'text'
    input.placeholder = 'Enter Write URL'
    input.style.backgroundColor = 'black'
    input.style.color = 'white'
    el.appendChild(input)
    const button = document.createElement('button')
    button.innerText = 'X'
    button.className = 'remove'
    button.addEventListener('click', () => {
        const index = WRITE_URL.findIndex((value) => value.name === input.value)
        WRITE_URL.splice(index, 1)
        chrome?.storage?.local.set({ 'write_url': WRITE_URL }, () => { });
        el.remove()
    })

    input.addEventListener('change', () => {
        if (!WRITE_URL?.find((value) => value.name === input.value)) {
            WRITE_URL.push({ status: true, name: input.value })
            chrome?.storage?.local.set({ 'write_url': WRITE_URL }, () => { });
        }
    })
    el.appendChild(button)
    document.body.appendChild(el)
}

const initEl = () => {
    const flexRow = document.createElement('div')
    flexRow.className = 'flex-row'
    const h1 = document.createElement('h1')
    h1.innerText = 'BLOCK LIST'
    h1.style.width = '100%'
    h1.style.backgroundColor = 'white'
    h1.style.color = 'black'
    h1.style.lineHeight = '50px'
    h1.style.border = '1px solid black'
    h1.style.margin = '0.5rem 0'
    flexRow.appendChild(h1)
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
    const flexRow = document.createElement('div')
    flexRow.className = 'flex-row'
    const h1 = document.createElement('h1')
    h1.innerText = 'BLOCK URL'
    h1.style.backgroundColor = 'black'
    h1.style.color = 'red'
    h1.style.width = '100%'
    h1.style.lineHeight = '50px'
    h1.style.margin = '0.5rem 0'
    flexRow.appendChild(h1)
    const button = document.createElement('button')
    button.className = 'add'
    const innerText = document.createElement('div')
    innerText.innerText = 'X'
    button.appendChild(innerText)
    button.addEventListener('click', onAddUrl)
    flexRow.appendChild(button)
    document.body.appendChild(flexRow)

    chrome?.storage?.local?.get(['url'], function (result) {
        if (result.url) BLOCKED_URL = result.url;
        else chrome.storage.local.set({ 'url': BLOCKED_URL }, () => { });
        BLOCKED_URL?.forEach((value) => {
            addUrl(value)
        })
    });
}

const innitWriteUrl = () => {
    const flexRow = document.createElement('div')
    flexRow.className = 'flex-row'
    const h1 = document.createElement('h1')
    h1.innerText = 'WRITE URL'
    h1.style.backgroundColor = 'black'
    h1.style.color = 'white'
    h1.style.width = '100%'
    h1.style.lineHeight = '50px'
    h1.style.margin = '0.5rem 0'
    flexRow.appendChild(h1)
    const button = document.createElement('button')
    button.className = 'add'
    const innerText = document.createElement('div')
    innerText.innerText = 'X'
    button.appendChild(innerText)
    button.addEventListener('click', onAddWriteUrl)
    flexRow.appendChild(button)
    document.body.appendChild(flexRow)

    chrome?.storage?.local?.get(['write_url'], function (result) {
        if (result.write_url) WRITE_URL = result.write_url;
        else chrome?.storage?.local?.set({ 'write_url': WRITE_URL }, () => { });
        WRITE_URL?.forEach((value) => {
            addWriteUrl(value)
        })
    });
}




const init = () => {
    initEl()
    initUrl()
    innitWriteUrl()
}


document.addEventListener("DOMContentLoaded", () => {
    init();
});