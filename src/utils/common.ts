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

const getColor = function(td:HTMLTableCellElement|null|undefined) {
    // var listDataColor = {
    //     'color-minpoint8': '#7dcbca',
    //     'color-minpoint7': '#90dac5',
    //     'color-minpoint5': '#cae9e0',
    //     'color-minpoint4': '#f3d2ac',
    //     'color-minpoint2': '#f3d2ac',
    //     'color-minpoint0': '#f3b8b1',
    //     'color-dontwork': '#cecbd6'
    // }
    if (td) {
        if (td.classList.contains('color-minpoint8')) {
            return 'minpoint8';
        }
        if (td.classList.contains('color-minpoint7')) {
            return 'minpoint7';
        }
        if (td.classList.contains('color-minpoint5')) {
            return 'minpoint5';
        }
        if (td.classList.contains('color-minpoint4')) {
            return 'minpoint4';
        }
        if (td.classList.contains('color-minpoint2')) {
            return 'minpoint2';
        }
        if (td.classList.contains('color-minpoint0')) {
            return 'minpoint0';
        }
        if (td.classList.contains('color-dontwork')) {
            return 'dontwork';
        }
    }
    return "";
}
const exportExcelFromTable = function(tableid:string,name:string,start:string, end:string) {
    const table = document.getElementById(tableid);
    const tableJson:{thead:{row:number,col:number,text:string,color:string}[][],tbody:{row:number,col:number,text:string,color:string}[][]} = {
        thead: [],
        tbody: []
    };
    if (table instanceof HTMLTableElement) {
        const thead = table.tHead?.children;
        const tbody = table.tBodies[0];
        for (let i = 0; thead != null && i < thead.length; i++) {
            const item = thead[i];
            const tr = [];
            if (item != null) {
                for (let x = 0; item.children != null && x < item.children.length; x++) {
                    const th = item.children[x];
                    if(th instanceof HTMLTableCellElement)
                    tr.push({
                        row: th.rowSpan,
                        col: th.colSpan,
                        text: th.innerText,
                        color: getColor(th)
                    })
                }
            }
            tableJson.thead.push(tr);
        }
        for (let i = 0; tbody.children != null && i < tbody.children.length; i++) {
            const item = tbody.children[i];
            const tr = [];
            if (item != null) {
                for (let x = 0; item.children != null && x < item.children.length; x++) {
                    const td = item.children[x];
                    if(td instanceof HTMLTableCellElement)
                    tr.push({
                        text: td.innerText,
                        row: td.rowSpan,
                        col: td.colSpan,
                        color: getColor(td)
                    })
                }
            }
            tableJson.tbody.push(tr);
        }
    }
    //const urlTest = 'https://localhost:44381/ConvertTableJson?exportFunction='+name+'&datetime=' + start + '_' + end + '&className=' +"ReportTable";
    const url = 'https://excel.eduso.vn/ConvertTableJson?exportFunction='+name+'&datetime=' + start + '_' + end + '&className=' +"ReportTable";
    return {
        data : tableJson,
        url : url
    };
}
export {
    caculatorDate,
    exportExcelFromTable
}
