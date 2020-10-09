const PAGE_OFF_SET = 5;
const DISPLAY_CARD_COUNT = 4
const NOTIFICATION_OFF_SET = 10;
const getPageCount = (arr) => {
    return Math.ceil(arr.length / PAGE_OFF_SET);
};

const getStartIndex = (number) => {
    return (number - 1) * PAGE_OFF_SET;
};
const getCardCount = (arr) => {
    return Math.ceil(arr.length / DISPLAY_CARD_COUNT);
};

const getNotificationCount = (arr) => {
    return Math.ceil(arr.length / NOTIFICATION_OFF_SET);
};
const getCardStartIndex = (number) => {
    return (number - 1) * DISPLAY_CARD_COUNT;
};
const getNotificationsIndex = (number) => {
    return (number - 1) * NOTIFICATION_OFF_SET;
};
export {
    PAGE_OFF_SET,
    getPageCount,
    getStartIndex,
    getCardCount,
    getCardStartIndex,
    DISPLAY_CARD_COUNT,
    getNotificationCount,
    getNotificationsIndex,
    NOTIFICATION_OFF_SET

}