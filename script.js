const input = document.getElementById("number")
const convertBtn = document.getElementById("convert-btn")
const output = document.getElementById("output")
const resultText = document.getElementById("result")

const filter = (str) => {
    let regex = /([0-9]+e\+[0-9]+|[0-9]+[.][0-9]+|[.][0-9]+)/g;
    return str.replace(regex, "")
}

const invalidInput = () => {
    output.style.display = "block"
    output.style.backgroundColor = "var(--bg-3)"
    output.style.color = "var(--red)"
    output.style.borderColor = "var(--red)"
    resultText.style.fontSize = "1.5rem"
}

const validInput = () => {
    output.style.display = "block"
    output.style.backgroundColor = "var(--bg-2)"
    output.style.color = "var(--white)"
    output.style.borderColor = "var(--white)"
}

const checkInput = (str) => {
    str = filter(str)
    let inputNumber = parseInt(str);

    if (isNaN(inputNumber)) {
        invalidInput()
        resultText.innerText = "Please enter a valid number."
        return
    } else if (inputNumber > 3999) {
        invalidInput()
        resultText.innerText = "Please enter a number less than or equal to 3999"
        return
    } else if (inputNumber < 1) {
        invalidInput()
        resultText.innerText = "Please enter a number greater than or equal to 1."
        return
    }

    let result = convert(inputNumber)
    validInput()

    resultText.innerText = result
}

convertBtn.addEventListener("click", () => {
    checkInput(input.value)
})
input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        checkInput(input.value)
    }
})

const romanNum = {
    I: "I",
    V: "V",
    X: "X",
    L: "L",
    C: "C",
    D: "D",
    M: "M",
};
const { I, V, X, L, C, D, M } = romanNum;
const getDigit = (quotient) => {
    switch (quotient) {
        case 0:
            return ""
        case 1:
            return V
        case 2:
            return X
        case 10:
            return L
        case 20:
            return C
        case 100:
            return D
        case 200:
            return M
    }
}

const I__X = (num) => {
    let quotient = Math.floor(num / 5)
    let remainder = num % 5

    if (remainder >= 1 && remainder <= 3) {
        return getDigit(quotient) + I.repeat(remainder)
    } else if (remainder === 4) {
        return I + getDigit(quotient + 1)
    } else {
        return getDigit(quotient)
    }
}

const X__C = (num) => {
    if (num <= 10) {
        return I__X(num)
    }
    if (num > 10 && num < 40) {
        return X.repeat(Math.floor(num / 10)) + I__X(num % 10)
    }

    if (num >= 40 && num < 50) {
        return X + L + I__X(num % 10)
    }

    if (num >= 50 && num < 90) {
        return L + X.repeat(Math.floor((num - 50) / 10)) + I__X(num % 10)
    }

    if (num >= 90 && num < 100) {
        return X + C + I__X(num % 10)
    }
}

const C__M = (num) => {
    if (num <= 10) {
        return I__X(num)
    }
    if (num > 10 && num < 100) {
        return X__C(num)
    }
    if (num >= 100 && num < 400) {
        return C.repeat(Math.floor(num / 100)) + X__C(num % 100)
    }

    if (num >= 400 && num < 500) {
        return C + D + X__C(num % 100)
    }

    if (num >= 500 && num < 900) {
        return D + C.repeat(Math.floor((num - 500) / 100)) + X__C(num % 100)
    }

    if (num >= 900 && num < 1000) {
        return C + M + X__C(num % 100)
    }
}

const M__ = (num) => {
    return M.repeat(Math.floor(num / 1000)) + C__M(num % 1000)
}

const convert = (num) => {

    let result;

    if (num <= 10) {
        result = I__X(num)
    }
    if (num > 10 && num < 100) {
        result = X__C(num)
    }
    if (num >= 100 && num < 1000) {
        result = C__M(num)
    }

    if (num >= 1000 < 4000) {
        result = M__(num);
    }


    return result
}

