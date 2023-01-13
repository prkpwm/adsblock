
if (typeof init === 'undefined') {
    let BLOCKED = [
        '[class*="ads"]',
        '[id*="ads"]',
    ];

    const deep_iframe = (iframe) => {
        try {
            BLOCKED.forEach((selector) => {
                const elements = iframe?.contentWindow?.document?.body?.querySelectorAll(selector);
                elements?.forEach((element) => {
                    element.style.display = 'none';
                });
            });

            const iframes = iframe?.contentWindow?.document?.body?.querySelector('iframe');
            if (iframes) {
                deep_iframe(iframe);
            }
        } catch (e) { }
    }


    const init = () => {
        const debouncedRemoveElements = () => {
            chrome?.storage?.local?.get(['key'], function (result) {
                if (result.key) BLOCKED = result.key;
                else chrome?.storage?.local?.set({ 'key': BLOCKED }, function () { });
            });
            BLOCKED.forEach((selector) => {
                const elements = document.querySelectorAll(selector);
                elements?.forEach((element) => {
                    element.style.display = 'none';
                });
            });

            const iframe = document.querySelector('iframe');
            if (iframe) {
                deep_iframe(iframe);
            }
        }
        try {
            setInterval(debouncedRemoveElements, 1000);
        } catch (e) { }
    }
    init();
}

