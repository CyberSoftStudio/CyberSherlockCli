import { Injectable, EventEmitter } from '@angular/core';
import {Info} from '../lib/classes';

@Injectable()
export class InfoMonitor {
    public info: Info[];
    public onInfo$ = new EventEmitter<Info>();
    constructor() {
        this.info = [];
    }
    add (msg: string, type: number) {
        if (typeof msg === 'string'
            && msg.length
            && msg.length < 256
            && ( type === 0 || type === 1 || type === 2 )// 0 - info, 1 - warning, 2 - error
        ) {
            const date = new Date(),
                info = new Info();
            info.info = msg;
            info.type = type;
            info.time = Math.round(date.getTime() / 1000);
            this.info.push(info);
            if (this.info.length > 100) {
                this.info.shift();
            }
            this.onInfo$.emit(info);
        }
    }
    get (filter: any): any {
        let res = this.info;
        if (!filter) {
            return [];
        } else {
            if (filter.time) {
                if (typeof filter.time === 'number') {
                    res = res.filter(msg => msg.time === filter.time);
                } else if (filter.time[0] && filter.time[1]) {
                    res = res.filter(msg => msg.time <= filter.time[0] && msg.time >= filter.time[1]);
                }
            }
            if (filter.msg && typeof filter.msg === 'string' && filter.msg.length < 256) {
                res = res.filter(msg => msg.info.match(new RegExp(filter.msg, 'i')));
            }
            if (filter.type
                && ( filter.type === 0 || filter.type === 1 || filter.type === 2)) {
                res = res.filter(msg => msg.type === filter.type);
            }
        }
        return res;
    }
    getAll () {
        return this.info;
    }
}
