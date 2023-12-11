let STYLE_TAG = {
    textContent: '',
};

if (typeof window !== 'undefined') {
    STYLE_TAG = document.createElement('style');
    STYLE_TAG.id = 'BLICK_OUTPUT';
    document.head.append(STYLE_TAG);
}

export default STYLE_TAG;
