export class DT {
  public Date: Date;
    constructor(data = null) {
        this.Date = new Date(data);
    }
    public toDateHumanString () {
        return ((this.Date.getDate() < 10) ? '0' : '') + this.Date.getDate() + '.'
            + ((this.Date.getMonth() + 1 < 10) ? '0' : '') + (this.Date.getMonth() + 1) + '.'
            + this.Date.getFullYear();
    }
    public toTimeHumanString () {
        return ((this.Date.getHours() < 10) ? '0' : '') + this.Date.getHours() + ':'
            + ((this.Date.getMinutes() < 10) ? '0' : '') + this.Date.getMinutes() + ':'
            + ((this.Date.getSeconds() < 10) ? '0' : '') + this.Date.getSeconds();
    }
    public getHours() { return this.Date.getHours(); }
    public getDate() { return this.Date.getDate(); }
    public getMonth() { return this.Date.getMonth(); }
    public getFullYear() { return this.Date.getFullYear(); }
    public getMinutes() { return this.Date.getMinutes(); }
    public getSeconds() { return this.Date.getSeconds(); }
    public getTime() { return this.Date.getTime(); }
}
