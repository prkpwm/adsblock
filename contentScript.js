let BLOCKED_ELEMENT = [
    '[class*="-ads-"]',
    '[id*="ads"]',
    '[id*="ad-container"]',
    '[class*="banana"]',
    '[style="position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;z-index: 6;display: flex;justify-content: center;align-items: center;"]'
];

let WRITE_URL = [
    'youtube',
]

let BLOCKED_URL = [
    'ads'
]

let count = 0;

const deep_iframe = (iframe) => {
    try {
        BLOCKED_ELEMENT.forEach((selector) => {
            const elements = iframe?.contentWindow?.document?.body?.querySelectorAll(selector);
            elements?.forEach((element) => {
                element.style.display = 'none';
            });
        });

    } catch (e) { }
}


const debouncedRemoveElements = () => {
    count++;
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
        if (window.location.href.match(url)) {
            document.body.style.display = 'none';
            clearInterval(interval)
            return;
        }
    }

    if (!WRITE_URL.some((url) => window.location.href.match(url))) {
        BLOCKED_ELEMENT.forEach((selector) => {
            const elements = document.querySelectorAll(selector);
            elements?.forEach((element) => {
                element.style.display = 'none';
            });
        });

        const iframes = document.querySelectorAll('iframe');
        if (iframes) {
            iframes.forEach((iframe) => {
                deep_iframe(iframe);
            });
        }
    }
    if (count > 100) {
        clearInterval(interval)
        return;
    }
}

try {
    var interval = setInterval(debouncedRemoveElements, 100);
} catch (e) { }
