import {Injectable} from '@angular/core';
import {People, Device} from '../lib/classes';
import {UserService} from './user.service';

@Injectable()
export class PeopleService {
    private people: People[];
    constructor (
        private user: UserService
    ) {}
    getPeople () {}
    addPeople () {}
    getByFilter () {}
}
