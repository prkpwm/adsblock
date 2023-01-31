let BLOCKED_ELEMENT = [
    {
        name: '[class*="ads"]',
        status: true
    },
    {
        name: '[id*="ads"]',
        status: true
    },
    {
        name: '[class*="-ad-"]',
        status: true
    },
    {
        name: '[id*="-ad-"]',
        status: true
    },
    {
        name: '[class*="banana"]',
        status: true
    }
    ,
    {
        name: '[class*="banner"]',
        status: true
    },
    {
        name: '[style="position: absolute; top: 0px; left: 0px; width: 100%; height: 100%; z-index: 6; display: flex; justify-content: center; align-items: center;"]',
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

let interval = null


const deep_iframe = (frame) => {
    try {
        BLOCKED_ELEMENT.forEach((selector) => {
            if (selector.status) {
                const elements = frame?.contentWindow?.document?.body?.querySelectorAll(selector.name);
                elements?.forEach((element) => {
                    element.style.display = 'none';
                    const iframes = document.querySelectorAll('iframe');
                    if (iframes) {
                        iframes.forEach((iframe) => {
                            deep_iframe(iframe);
                        });
                    }
                });
            }
        });

    } catch (e) { }
}


const debouncedRemoveElements = () => {
    for (const url of BLOCKED_URL) {
        if (url.status && window.location.href.match(url.name)) {
            window.location.href = 'https://www.google.com'
            clearInterval(interval)
        }
    }

    if (!WRITE_URL.some((url) => url.status && window.location.href.match(url.name))) {
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
    chrome?.storage?.local?.get(['BLOCKED_ELEMENT'], function (result) {
        if (result.BLOCKED_ELEMENT) BLOCKED_ELEMENT = result.BLOCKED_ELEMENT;
        else chrome?.storage?.local?.set({ 'BLOCKED_ELEMENT': BLOCKED_ELEMENT }, () => { });
    });
    chrome?.storage?.local?.get(['BLOCKED_URL'], function (result) {
        if (result.BLOCKED_URL) BLOCKED_URL = result.BLOCKED_URL;
        else chrome?.storage?.local?.set({ 'BLOCKED_URL': BLOCKED_URL }, () => { });
    });
    chrome?.storage?.local?.get(['WRITE_URL'], function (result) {
        if (result.WRITE_URL) WRITE_URL = result.WRITE_URL;
        else chrome?.storage?.local?.set({ 'WRITE_URL': WRITE_URL }, () => { });
    });
    setTimeout(() => {
        interval = setInterval(debouncedRemoveElements, 50);
        setTimeout(() => {
            clearInterval(interval)
        }, 3000)
    }, 10)
} catch (e) { }



