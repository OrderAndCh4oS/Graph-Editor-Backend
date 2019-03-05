export const text = (min, max, nullable, field = 'string') => ({
    isNull: (val) => {
        if (!nullable && val.length == 0) {
            throw new Error("Please provide a " + field)
        }
    },
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
