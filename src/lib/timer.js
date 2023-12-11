export function timer(label) {
    const startTime = performance.now();
    const diff = () => performance.now() - startTime
    return {
        stop() {
            console.log(`${label}: ${diff().toFixed(1)}ms`);
        },
        get() {
            return diff().toFixed(1)
        },
        getFormated(){
            return `${diff().toFixed(1)}ms`
        }
    };
}
