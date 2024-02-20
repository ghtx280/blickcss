export function CreateStore() {
    let STYLE_STORE = Object.create(null);
    let ATTRS_STORE = Object.create(null);
    let MEDIA_STORE = Object.create(null);
    let CSS_STORE   = Object.create(null);

    CSS_STORE.MEDIA = {};

    return {
        STYLE_STORE,
        ATTRS_STORE,
        MEDIA_STORE,
        CSS_STORE,
    }
}
