const caculatorDate = function (date:Date, type:string) {
    if (!date) {
        date = new Date()
    }
    const month = date.getMonth();
    const year = date.getFullYear();
    if (type == "month") {
        const thisMonth = month < 12 ? new Date(year, month, 1) : new Date(year + 1, 1, 1);
        const nextMonth = month < 11 ? new Date(year, month + 1, 1) : new Date(year + 1, 1, 1);
        const lastMonth = new Date(nextMonth.setDate(-1));

        return {
            first: thisMonth,
            last: lastMonth
        }
    }
    else {
        const week = [1, 2, 3, 4, 5, 6, 0];
        const dateIndex = date.getDay();
        const clone = new Date(date.getTime());
        const cloneDate = clone.getDate();

        const firstWeek = new Date(clone.setDate(cloneDate - week.indexOf(dateIndex)));
        const cloneFirstWeek = new Date(firstWeek.getTime());
        const lastWeek = new Date(cloneFirstWeek.setDate(cloneFirstWeek.getDate() + 6));
        return {
            first: firstWeek,
            last: lastWeek
        }
    }
}
export {
    caculatorDate
}
