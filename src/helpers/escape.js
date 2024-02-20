export function escape(str = "", symbol = "") {
    const RE = new RegExp(`(\\\\)?\\${symbol}`, 'g')
    

    function execRegexp(replacement) {
        return str.replace(RE, (_, esc) => {
            if (esc) {
               return _ 
            }
            return replacement || "\n"
        })
    }

    return {
        replace(replacement){
            return execRegexp(replacement)
        },

        split(){
            return execRegexp().split("\n")
        }
    }
}