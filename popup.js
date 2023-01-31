let BLOCKED_ELEMENT = [];

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
        const index = BLOCKED_ELEMENT.findIndex((item) => item.name === value.name)
        BLOCKED_ELEMENT.splice(index, 1)
        chrome?.storage?.local.set({ 'BLOCKED_ELEMENT': BLOCKED_ELEMENT }, () => { });
        el.remove()
    })

    const button2 = document.createElement('button')
    const index = BLOCKED_ELEMENT.findIndex((item) => item.name === value.name)
    if (BLOCKED_ELEMENT[index].status) {
        button2.innerText = '| |'
    } else {
        button2.innerText = '>'
    }
    button2.className = 'pause'
    button2.addEventListener('click', () => {
        const index = BLOCKED_ELEMENT.findIndex((item) => item.name === value.name)
        BLOCKED_ELEMENT[index].status = !BLOCKED_ELEMENT[index].status
        chrome?.storage?.local.set({ 'BLOCKED_ELEMENT': BLOCKED_ELEMENT }, () => { });
        if (BLOCKED_ELEMENT[index].status) {
            button2.innerText = '| |'
        } else {
            button2.innerText = '>'
        }
    })
    el.appendChild(button)
    el.appendChild(button2)
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
        chrome?.storage?.local.set({ 'BLOCKED_URL': BLOCKED_URL }, () => { });
        el.remove()
    })
    const button2 = document.createElement('button')
    const index = BLOCKED_URL.findIndex((item) => item.name === value.name)
    if (BLOCKED_URL[index].status) {
        button2.innerText = '| |'
    } else {
        button2.innerText = '>'
    }
    button2.className = 'pause'
    button2.addEventListener('click', () => {
        const index = BLOCKED_URL.findIndex((item) => item.name === value.name)
        BLOCKED_URL[index].status = !BLOCKED_URL[index].status
        chrome?.storage?.local.set({ 'BLOCKED_URL': BLOCKED_URL }, () => { });
        if (BLOCKED_URL[index].status) {
            button2.innerText = '| |'

        } else {
            button2.innerText = '>'
        }
    })
    el.appendChild(button)
    el.appendChild(button2)
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

        chrome?.storage?.local.set({ 'WRITE_URL': WRITE_URL }, () => { });
        el.remove()
    })
    const button2 = document.createElement('button')
    const index = WRITE_URL.findIndex((item) => item.name === value.name)
    if (WRITE_URL[index].status) {
        button2.innerText = '| |'
    } else {
        button2.innerText = '>'
    }
    button2.className = 'pause'
    button2.addEventListener('click', () => {
        const index = WRITE_URL.findIndex((item) => item.name === value.name)
        WRITE_URL[index].status = !WRITE_URL[index].status
        chrome?.storage?.local.set({ 'WRITE_URL': WRITE_URL }, () => { });
        if (WRITE_URL[index].status) {
            button2.innerText = '| |'
        } else {
            button2.innerText = '>'
        }
    })
    el.appendChild(button)
    el.appendChild(button2)
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
        const index = BLOCKED_ELEMENT.findIndex((value) => value.name === input.value)
        BLOCKED_ELEMENT.splice(index, 1)
        chrome?.storage?.local.set({ 'BLOCKED_ELEMENT': BLOCKED_ELEMENT }, () => { });
        el.remove()
    })

    input.addEventListener('change', () => {
        if (!BLOCKED_ELEMENT?.find((value) => value.name === input.value)) {
            BLOCKED_ELEMENT.push({ status: true, name: input.value })
            chrome?.storage?.local.set({ 'BLOCKED_ELEMENT': BLOCKED_ELEMENT }, () => { });
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
        chrome?.storage?.local.set({ 'BLOCKED_URL': BLOCKED_URL }, () => { });
        el.remove()
    })

    input.addEventListener('change', () => {
        if (!BLOCKED_URL?.find((value) => value.name === input.value)) {
            BLOCKED_URL.push({ status: true, name: input.value })
            chrome?.storage?.local.set({ 'BLOCKED_URL': BLOCKED_URL }, () => { });
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
        chrome?.storage?.local.set({ 'WRITE_URL': WRITE_URL }, () => { });
        el.remove()
    })

    input.addEventListener('change', () => {
        if (!WRITE_URL?.find((value) => value.name === input.value)) {
            WRITE_URL.push({ status: true, name: input.value })
            chrome?.storage?.local.set({ 'WRITE_URL': WRITE_URL }, () => { });
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

    chrome?.storage?.local?.get(['BLOCKED_ELEMENT'], function (result) {
        if (result.BLOCKED_ELEMENT) BLOCKED_ELEMENT = result.BLOCKED_ELEMENT;
        else chrome.storage.local.set({ 'BLOCKED_ELEMENT': BLOCKED_ELEMENT }, () => { });
        BLOCKED_ELEMENT?.forEach((value) => {
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

    chrome?.storage?.local?.get(['BLOCKED_URL'], function (result) {
        if (result.BLOCKED_URL) BLOCKED_URL = result.BLOCKED_URL;
        else chrome.storage.local.set({ 'BLOCKED_URL': BLOCKED_URL }, () => { });
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

    chrome?.storage?.local?.get(['WRITE_URL'], function (result) {
        if (result.WRITE_URL) WRITE_URL = result.WRITE_URL;
        else chrome?.storage?.local?.set({ 'WRITE_URL': WRITE_URL }, () => { });
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