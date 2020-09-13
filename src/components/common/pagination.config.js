const PAGE_OFF_SET = 5;
const DISPLAY_CARD_COUNT = 2

const getPageCount = (arr) => {
    return Math.ceil(arr.length / PAGE_OFF_SET);
};

const getStartIndex = (number) => {
    return (number - 1) * PAGE_OFF_SET;
};
const getCardCount = (arr) => {
    return Math.ceil(arr.length / DISPLAY_CARD_COUNT);
};

const getCardStartIndex = (number) => {
    return (number - 1) * DISPLAY_CARD_COUNT;
};
export {
    PAGE_OFF_SET,
    getPageCount,
    getStartIndex,
    getCardCount,
    getCardStartIndex,
    DISPLAY_CARD_COUNT

}