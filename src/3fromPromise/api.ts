
const texts = [
    "text 1",
    "text 2",
    "big egg"
];
export async function getTheText(index: number) {
    await timeoutPromise(2000);
    if (texts[index]) {
        return texts[index];
    }
    throw new Error("goog error");
}

export async function countTheTexts() {
    await timeoutPromise(5000);
    return texts.length;
}

function timeoutPromise(timeout: number) {
    return new Promise(res => setTimeout(res, timeout));
}