
export const text = (min, max, field = 'string') => ({
    isLongEnough: (val) => {
        if (val.length < min) {
            throw new Error("Please choose a longer " + field)
        }
    },
    isShortEnough: (val) => {
        if (val.length > max) {
            throw new Error("Please choose a shorter " + field)
        }
    },
});
