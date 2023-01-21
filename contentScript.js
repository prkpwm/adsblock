
if (typeof init === 'undefined') {

    let BLOCKED_ELEMENT = [
        '[class*="-ads-"]',
        '[id*="ads"]',
        '[id*="ad-container"]',
        '[class*="banana"]',
        '[style="position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;z-index: 6;display: flex;justify-content: center;align-items: center;"]'
    ];

    const deep_iframe = (iframe) => {
        try {
            if (count > 100) return;
            BLOCKED_ELEMENT.forEach((selector) => {
                const elements = iframe?.contentWindow?.document?.body?.querySelectorAll(selector);
                elements?.forEach((element) => {
                    element.style.display = 'none';
                });
            });

        } catch (e) { }
    }

    const init = () => {
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
            }
            catch (e) { }
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
        try {
            setInterval(debouncedRemoveElements, 100);
        } catch (e) { }
    }
    let count = 0;
    init();
}


chrome.runtime.sendMessage({ url: window.location.href })