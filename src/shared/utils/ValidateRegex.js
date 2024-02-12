import ret from "https://cdn.jsdelivr.net/npm/ret@0.5.0/+esm"
var types = ret.types

export default function validate(re) {
    if (isRegExp(re)) re = re.source
    else if (typeof re !== "string") re = String(re)

    return (function walk(node, starHeight) {
        if (node.type === types.REPETITION) {
            starHeight++
            if (starHeight > 1) return false
        }

        if (node.options) {
            for (let i = 0, len = node.options.length; i < len; i++) {
                let ok = walk({ stack: node.options[i] }, starHeight)
                if (!ok) return false
            }
        }
        var stack = node.stack || (node.value && node.value.stack)
        if (!stack) return true

        for (let i = 0; i < stack.length; i++) {
            let ok = walk(stack[i], starHeight)
            if (!ok) return false
        }

        return true
    })(ret(re), 0)
}

function isRegExp(x) {
    return {}.toString.call(x) === "[object RegExp]"
}
