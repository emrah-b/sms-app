export default Ember.Object.create({
    Workbook: Ember.Object.extend({
        SheetNames: [],
        Sheets: {}
    }),
    settings: {
        sheetName: "Sheet1",
        modelList: true,
        templateOnly: false
    },
    createDataFromModelArray: function(models) {
        if (!models) return {};
        if (!models instanceof Array) return {};
        if (models.length === 0) return {}
        return new Promise(function(resolve) {
            var data = [];
            var expectedLength = (this.settings.templateOnly) ? 1 : models.get("length") + 1;
            models.forEach(function(model) {
                model.serialize().then(function(s) {
                    data.push(s.displayValues);
                    if (data.length === expectedLength - 1) {
                        data[0] = s.labels;
                        resolve(data);
                    }
                }.bind(this));
            });
        }.bind(this));
    },
    createSheetFrom2DArray: function(data) {
        var ws = {};
        var range = {
            s: {
                c: 10000000,
                r: 10000000
            },
            e: {
                c: 0,
                r: 0
            }
        };
        for (var R = 0; R !== data.length; ++R) {
            for (var C = 0; C !== data[R].length; ++C) {
                if (range.s.r > R) range.s.r = R;
                if (range.s.c > C) range.s.c = C;
                if (range.e.r < R) range.e.r = R;
                if (range.e.c < C) range.e.c = C;
                var cell = {
                    v: data[R][C]
                };
                if (cell.v == null) continue;
                var cell_ref = XLSX.utils.encode_cell({
                    c: C,
                    r: R
                });
                if (typeof cell.v === 'number') cell.t = 'n';
                else if (typeof cell.v === 'boolean') cell.t = 'b';
                else if (cell.v instanceof Date) {
                    cell.t = 'n';
                    cell.z = XLSX.SSF._table[14];
                    cell.v = this.datenum(cell.v);
                } else cell.t = 's';
                ws[cell_ref] = cell;
            }
        }
        if (range.s.c < 10000000) ws['!ref'] = XLSX.utils.encode_range(range);
        return ws;
    },
    s2ab: function(s) {
        var buf = new ArrayBuffer(s.length);
        var view = new Uint8Array(buf);
        for (var i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
        return buf;
    },
    exportToExcel: function(data, fileName, options) {
        Ember.$().extend(this.settings, options);
        if (!this.settings.modelList) {
            this.saveSpreadsheet(data, fileName);
            return;
        }
        this.createDataFromModelArray(data).then(function(dataArray) {
            return this.saveSpreadsheet(dataArray, fileName);
        }.bind(this));
    },
    saveSpreadsheet: function(data, fileName) {
        var ws = this.createSheetFrom2DArray(data);
        var wb = this.Workbook.create();
        /* add ranges to worksheet */
        ws['!merges'] = [];
        /* add worksheet to workbook */
        wb.SheetNames.push(this.settings.sheetName);
        wb.Sheets[this.settings.sheetName] = ws;
        var wbout = XLSX.write(wb, {
            bookType: 'xlsx',
            bookSST: false,
            type: 'binary'
        });
        saveAs(new Blob([this.s2ab(wbout)], {
            type: "application/octet-stream"
        }), fileName || "export.xlsx");
    },
    datenum: function(v, date1904) {
        if (date1904) v += 1462;
        var epoch = Date.parse(v);
        return (epoch - new Date(Date.UTC(1899, 11, 30))) / (24 * 60 * 60 * 1000);
    }
});
