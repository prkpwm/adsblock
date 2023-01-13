let BLOCKED = [
    '[class*="ad"]',
    '[id*="ad"]',
];


const addEl = (value) => {
    const el = document.createElement('div')
    el.className = 'content'
    const input = document.createElement('input')
    input.type = 'text'
    input.value = value
    el.appendChild(input)
    const button = document.createElement('button')
    button.innerText = 'X'
    button.className = 'remove'
    button.addEventListener('click', () => {
        const index = BLOCKED.indexOf(value)
        BLOCKED.splice(index, 1)
        chrome?.storage?.local.set({ 'key': BLOCKED }, function () { });
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
        chrome?.storage?.local.set({ 'key': BLOCKED }, function () { });
        el.remove()
    })

    input.addEventListener('change', () => {
        if (!BLOCKED?.find((value) => value === input.value)) {
            BLOCKED.push(input.value)
            chrome?.storage?.local.set({ 'key': BLOCKED }, function () { });
        }
    })
    el.appendChild(button)
    document.body.appendChild(el)
}

const init = () => {
    const flexRow = document.createElement('div')
    flexRow.className = 'flex-row'
    const h1 = document.createElement('h1')
    h1.innerText = 'BLOCKED LIST'
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
        else chrome.storage.local.set({ 'key': BLOCKED }, function () { });
        BLOCKED?.forEach((value) => {
            addEl(value)
        })
    });

}


document.addEventListener("DOMContentLoaded", () => {
    init();
});