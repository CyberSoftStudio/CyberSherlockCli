import {RU} from '../dictionaries/ru';
import {EN} from '../dictionaries/en';
import {Injectable} from '@angular/core';
import {config} from '../config';

/**
 * @name TranslatorService
 * @summary Service to translate values by keys from according dictionaries.
 */
@Injectable()
export class TranslatorService {
    public _dictionary: {};
    constructor() {}
    /**
     * @name set
     * @summary Sets translation language.
     * @public
     * @param {string} lang - translation language.
     */
    public set(lang: string) {
        const setDictionary = {
            RU: () => {
                this._dictionary = RU;
                return true;
            },
            EN: () => {
                this._dictionary = EN;
                return true;
            }
        };
        if (!setDictionary[lang]()) {
            this._dictionary = config().app.default_lang;
        }
    }
    /**
     * @name translate
     * @summary Translates key value from according dictionary.
     * @param {string} key - key from setted dictionary.
     * @return {string} string - translated key value.
     */
    public translate(key: string): string {
        const k = {
            key1: key.split('.')[0],
            key2: key.split('.')[1]} || null;
        return key && this._dictionary[k.key1][k.key2] ? this._dictionary[k.key1][k.key2] : '';
    }
}

