

let BLOCKED_ELEMENT = [
    {
        name: '[class*="-ads-"]',
        status: true
    },
    {
        name: '[id*="ads"]',
        status: true
    },
    {
        name: '[id*="ad-container"]',
        status: true
    },
    {
        name: '[class*="banana"]',

        status: true
    },
    {
        name: '[style="position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;z-index: 6;display: flex;justify-content: center;align-items: center;"]',
        status: true
    }

]


let WRITE_URL = [
    {
        name: 'youtube',
        status: true
    }
]



let BLOCKED_URL = [
    {
        name: 'ads',
        status: true
    }
]


const deep_iframe = (iframe) => {
    try {
        BLOCKED_ELEMENT.forEach((selector) => {
            if (selector.status) {
                const elements = iframe?.contentWindow?.document?.body?.querySelectorAll(selector.name);
                elements?.forEach((element) => {
                    element.style.display = 'none';
                });
            }
        });

    } catch (e) { }
}


const debouncedRemoveElements = () => {
    try {
        chrome?.storage?.local?.get(['key'], function (result) {
            if (result.key) BLOCKED_ELEMENT = result.key;
            else chrome?.storage?.local?.set({ 'key': BLOCKED_ELEMENT }, () => { });
        });
        chrome?.storage?.local?.get(['url'], function (result) {
            if (result.url) BLOCKED_URL = result.url;
            else chrome?.storage?.local?.set({ 'url': BLOCKED_URL }, () => { });
        });
        chrome?.storage?.local?.get(['write_url'], function (result) {
            if (result.write_url) WRITE_URL = result.write_url;
            else chrome?.storage?.local?.set({ 'write_url': WRITE_URL }, () => { });
        });
    }
    catch (e) { }


    for (const url of BLOCKED_URL) {
        if (url.status && window.location.href.match(url.name)) {
            document.body.style.display = 'none';
            clearInterval(interval)
            return;
        }
    }

    if (!WRITE_URL.some((url) => window.location.href.match(url.name))) {
        BLOCKED_ELEMENT.forEach((selector) => {
            if (selector.status) {
                const elements = document.querySelectorAll(selector.name);
                elements?.forEach((element) => {
                    element.style.display = 'none';
                });
            }
        });

        const iframes = document.querySelectorAll('iframe');
        if (iframes) {
            iframes.forEach((iframe) => {
                deep_iframe(iframe);
            });
        }
    } else {
        clearInterval(interval)
    }
}

try {
    var interval = setInterval(debouncedRemoveElements, 100);
} catch (e) { }


setTimeout(() => {
    console.log(BLOCKED_ELEMENT, BLOCKED_URL, WRITE_URL)
    clearInterval(interval)
}, 3000)