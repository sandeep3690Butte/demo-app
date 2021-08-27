export const getViewHistory = payload => (
    {
        type: "getHistory",
        payload
    }
);

export const addToViewHistory = payload => (
    {
        type: "addToHistory",
        payload
    }
)