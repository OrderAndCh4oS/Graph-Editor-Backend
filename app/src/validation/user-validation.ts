export const usernameValidation = {
    isLongEnough: (val) => {
        if (val.length == 0) {
            throw new Error("Please provide a username")
        }
        if (val.length < 3) {
            throw new Error("Please choose a longer username")
        }
    },
    isShortEnough: (val) => {
        if (val.length > 44) {
            throw new Error("Please choose a shorter username")
        }
    },
};

export const passwordValidation = {
    isLongEnough: (val) => {
        if (val.length == 0) {
            throw new Error("Please provide a password")
        }
        if (val.length < 8) {
            throw new Error("Please choose a longer password")
        }
    }
};
