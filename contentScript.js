
if (typeof init === 'undefined') {
    let BLOCKED_ELEMENT = [
        '[class*="ads"]',
        '[id*="ads"]',
    ];

    let BLOCKED_URL = [
        "animekimi.com",
    ]

    const deep_iframe = (iframe) => {
        try {
            BLOCKED_ELEMENT.forEach((selector) => {
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

            const iframe = document.querySelector('iframe');
            if (iframe) {
                deep_iframe(iframe);
            }
        }
        try {
            BLOCKED_URL.forEach((url) => {
                if (window.location.href.includes(url)) { window.location.href = 'https://www.google.com/'; } else { }
            });
            setInterval(debouncedRemoveElements, 1000);
        } catch (e) { }
    }



    init();
}

