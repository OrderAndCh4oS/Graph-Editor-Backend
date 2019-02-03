export const titleValidation = {
    isLongEnough: (val) => {
        if (val.length == 0 || val === null || !val) {
            throw new Error("Please provide a title")
        }
        if (val.length < 3) {
            throw new Error("Please choose a longer title")
        }
    },
    isShortEnough: (val) => {
        if (val.length > 65) {
            throw new Error("Please choose a shorter title")
        }
    },
};

export const descriptionValidation = {
    isLongEnough: (val) => {
        if (val.length == 0 || val === null || !val) {
            throw new Error("Please provide a description")
        }
        if (val.length < 3) {
            throw new Error("Please choose a longer description")
        }
    },
    isShortEnough: (val) => {
        if (val.length > 255) {
            throw new Error("Please choose a shorter description")
        }
    },
};
