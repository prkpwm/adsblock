
if (typeof init === 'undefined') {

    let BLOCKED_ELEMENT = [
        '[class*="-ads-"]',
        '[id*="-ads-"]',
    ];

    let BLOCKED_URL = [
    ]

    const deep_iframe = (iframe) => {
        try {
            if (count > 100) return;
            BLOCKED_ELEMENT.forEach((selector) => {
                const elements = iframe?.contentWindow?.document?.body?.querySelectorAll(selector);
                elements?.forEach((element) => {
                    element.style.display = 'none';
                });
            });
            // const iframes = iframe?.contentWindow?.document?.body?.querySelectorAll('iframe');
            // if (iframes) {
            //     iframes.forEach((iframe2) => {
            //         deep_iframe(iframe2);
            //     });
            // }
        } catch (e) { }
    }


    const init = () => {



        const debouncedRemoveElements = () => {
            python run.py run            try {
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

            BLOCKED_URL.forEach((url) => {
                if (window.location.href.match(url)) { window.location.href = 'https://www.google.com/'; } else { }
            });
            setInterval(debouncedRemoveElements, 1000);
        } catch (e) { }
    }


    let count = 0;
    init();
}

