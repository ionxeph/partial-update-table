export class VisibleSlice {
  _visibleRows: string[] = [];
  _additionalRows: string[] = [];
  _rowPadding: number = 0;
  _rowNumber: number = 1000;
  constructor(rowPadding: number = 0, rowNumber: number = 1000) {
    this._rowPadding = rowPadding;
    this._rowNumber = rowNumber;
  }

  callback = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        this._visibleRows.push(entry.target.id);
      } else {
        this._visibleRows = this._visibleRows.filter(
          (id) => id !== entry.target.id
        );
      }
    });

    let minRow: number = this._rowNumber;
    let maxRow: number = 0;
    this._visibleRows.forEach((row) => {
      const rowNumber = Number(row);
      minRow = Math.min(rowNumber, minRow);
      maxRow = Math.max(rowNumber, maxRow);
    });

    let additionalMinRows = Array.from(
      { length: Math.min(this._rowPadding, minRow) },
      (_, i) => `${minRow - i - 1}`
    );

    let additionalMaxRows = Array.from(
      { length: Math.min(this._rowPadding, this._rowNumber - maxRow) },
      (_, i) => `${i + maxRow}`
    );
    this._additionalRows = [...additionalMinRows, ...additionalMaxRows];
  };

  observer = new IntersectionObserver(this.callback);

  getObserver() {
    return this.observer;
  }

  getVisibleRows() {
    return [...this._visibleRows, ...this._additionalRows];
  }
}
