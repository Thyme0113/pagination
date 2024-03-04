export class TableHtmlBuilder {
    _html;
    _dataList;

    init(dataList) {
        this._dataList = dataList;
        this._html = $('<table>').attr({
            class: 'table',
        });
    }

    build() {
        let $tbody = $('<tbody>');
        for (let record of this._dataList) {
            let $tr = $('<tr>');
            for (let column of Object.keys(record)) {
                $tr.append($('<td>').text(record[column][0].value));
            }
            $tbody.append($tr);
        }
        this._html.append($tbody);
    }

    getResult() {
        return this._html;
    }
}