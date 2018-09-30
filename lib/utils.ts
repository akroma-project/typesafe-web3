import { BigNumber } from 'bignumber.js';
import { sha3 } from './sha3';
import * as utf8 from 'utf8';

export default class Utils {

    private unitMap: any = {
        'noether': '0',
        'wei': '1',
        'kwei': '1000',
        'Kwei': '1000',
        'babbage': '1000',
        'femtoether': '1000',
        'mwei': '1000000',
        'Mwei': '1000000',
        'lovelace': '1000000',
        'picoether': '1000000',
        'gwei': '1000000000',
        'Gwei': '1000000000',
        'shannon': '1000000000',
        'nanoether': '1000000000',
        'nano': '1000000000',
        'szabo': '1000000000000',
        'microether': '1000000000000',
        'micro': '1000000000000',
        'finney': '1000000000000000',
        'milliether': '1000000000000000',
        'milli': '1000000000000000',
        'ether': '1000000000000000000',
        'kether': '1000000000000000000000',
        'grand': '1000000000000000000000',
        'mether': '1000000000000000000000000',
        'gether': '1000000000000000000000000000',
        'tether': '1000000000000000000000000000000',
    };
    /**
     * Should be called to pad string to expected length
     *
     * @method padLeft
     * @param {String} string to be padded
     * @param {Number} characters that result string should have
     * @param {String} sign, by default 0
     * @returns {String} right aligned string
     */
    public padLeft(string: string, chars: number, sign: string = ''): string {
        return new Array(chars - string.length + 1).join(sign ? sign : '0') + string;
    }

    /**
     * Should be called to pad string to expected length
     *
     * @method padRight
     * @param {String} string to be padded
     * @param {Number} characters that result string should have
     * @param {String} sign, by default 0
     * @returns {String} right aligned string
     */
    public padRight(string: string, chars: number, sign: string): string {
        return string + (new Array(chars - string.length + 1).join(sign ? sign : '0'));
    }

    /**
     * Should be called to get utf8 from it's hex representation
     *
     * @method toUtf8
     * @param {String} string in hex
     * @returns {String} ascii string representation of hex value
     */
    public toUtf8(hex: string): string {
        // Find termination
        let str = '';
        let i = 0;
        const l = hex.length;
        if (hex.substring(0, 2) === '0x') {
            i = 2;
        }
        for (; i < l; i += 2) {
            const code = parseInt(hex.substr(i, 2), 16);
            if (code === 0) {
                break;
            }
            str += String.fromCharCode(code);
        }

        return utf8.decode(str);
    }

    /**
     * Should be called to get ascii from it's hex representation
     *
     * @method toAscii
     * @param {String} string in hex
     * @returns {String} ascii string representation of hex value
     */
    public toAscii(hex: string): string {
        // Find termination
        let str = '';
        let i = 0;
        const l = hex.length;
        if (hex.substring(0, 2) === '0x') {
            i = 2;
        }
        for (; i < l; i += 2) {
            const code = parseInt(hex.substr(i, 2), 16);
            str += String.fromCharCode(code);
        }

        return str;
    }

    /**
     * Should be called to get hex representation (prefixed by 0x) of utf8 string
     *
     * @method fromUtf8
     * @param {String} string
     * @param {Boolean} allowZero to convert code point zero to 00 instead of end of string
     * @returns {String} hex representation of input string
     */
    public fromUtf8(str: string, allowZero: boolean): string {
        str = utf8.encode(str);
        let hex = '';
        for (let i = 0; i < str.length; i++) {
            const code = str.charCodeAt(i);
            if (code === 0) {
                if (allowZero) {
                    hex += '00';
                } else {
                    break;
                }
            } else {
                const n = code.toString(16);
                hex += n.length < 2 ? '0' + n : n;
            }
        }
        return '0x' + hex;
    }

    /**
     * Should be called to get hex representation (prefixed by 0x) of ascii string
     *
     * @method fromAscii
     * @param {String} string
     * @param {Number} optional padding
     * @returns {String} hex representation of input string
     */
    public fromAscii(str: string, num: number = 0): string {
        let hex = '';
        for (let i = 0; i < str.length; i++) {
            const code = str.charCodeAt(i);
            const n = code.toString(16);
            hex += n.length < 2 ? '0' + n : n;
        }
        return '0x' + hex.padEnd(num, '0');
    }

    /**
     * Should be used to create full function/event name from json abi
     *
     * @method transformToFullName
     * @param {Object} json-abi
     * @return {String} full fnction/event name
     */
    public transformToFullName(json: any): string {
        if (json.name.indexOf('(') !== -1) {
            return json.name;
        }

        const typeName = json.inputs.map(function (i: any) { return i.type; }).join();
        return json.name + '(' + typeName + ')';
    }

    /**
     * Should be called to get display name of contract function
     *
     * @method extractDisplayName
     * @param {String} name of function/event
     * @returns {String} display name for function/event eg. multiply(uint256) -> multiply
     */
    public extractDisplayName(name: string): string {
        const stBracket = name.indexOf('(');
        const endBracket = name.indexOf(')');
        return (stBracket !== -1 && endBracket !== -1) ? name.substr(0, stBracket) : name;
    }

    /**
     * Should be called to get type name of contract function
     *
     * @method extractTypeName
     * @param {String} name of function/event
     * @returns {String} type name for function/event eg. multiply(uint256) -> uint256
     */
    public extractTypeName(name: string): string {
        const stBracket = name.indexOf('(');
        const endBracket = name.indexOf(')');
        return (stBracket !== -1 && endBracket !== -1) ? name.substr(stBracket + 1, endBracket - stBracket - 1).replace(' ', '') : '';
    }

    /**
     * Converts value to it's decimal representation in string
     *
     * @method toDecimal
     * @param {String|Number|BigNumber}
     * @return {String}
     */
    public toDecimal(value: string | number | BigNumber): number {
        return this.toBigNumber(value).toNumber();
    }

    /**
     * Converts value to it's hex representation
     *
     * @method fromDecimal
     * @param {String|Number|BigNumber}
     * @return {String}
     */
    public fromDecimal(value: number): string {
        const number = this.toBigNumber(value);
        const result = number.toString(16);

        return number.isLessThan(0) ? '-0x' + result.substr(1) : '0x' + result;
    }

    /**
     * Auto converts any given value into it's hex representation.
     *
     * And even stringifys objects before.
     *
     * @method toHex
     * @param {String|Number|BigNumber|Object}
     * @return {String}
     */
    public toHex(val: any) {

        // const toHex = function (val) {
        /*jshint maxcomplexity: 8 */

        if (this.isBoolean(val)) {
            return this.fromDecimal(+val);
        }

        if (this.isBigNumber(val)) {
            return this.fromDecimal(val);
        }

        if (typeof val === 'object') {
            return this.fromUtf8(JSON.stringify(val), false);
        }

        // if its a negative number, pass it through fromDecimal
        if (this.isString(val)) {
            if (val.indexOf('-0x') === 0) {
                return this.fromDecimal(val);
            } else if (val.indexOf('0x') === 0) {
                return val;
            } else if (!isFinite(val)) {
                return this.fromUtf8(val, true);
            }
        }

        return this.fromDecimal(val);
    }

    /**
     * Returns value of unit in Wei
     *
     * @method getValueOfUnit
     * @param {String} unit the unit to convert to, default ether
     * @returns {BigNumber} value of the unit (in Wei)
     * @throws error if the unit is not correct:w
     */
    public getValueOfUnit(unit: string): BigNumber {
        // const getValueOfUnit = function (unit) {
        unit = unit ? unit.toLowerCase() : 'ether';
        const unitValue = this.unitMap[unit];
        if (unitValue === undefined) {
            throw new Error('This unit doesn\'t exists, please use the one of the following units' + JSON.stringify(this.unitMap, null, 2));
        }
        return new BigNumber(unitValue, 10);
    }

    /**
     * Takes a number of wei and converts it to any other ether unit.
     *
     * Possible units are:
     *   SI Short   SI Full        Effigy       Other
     * - kwei       femtoether     babbage
     * - mwei       picoether      lovelace
     * - gwei       nanoether      shannon      nano
     * - --         microether     szabo        micro
     * - --         milliether     finney       milli
     * - ether      --             --
     * - kether                    --           grand
     * - mether
     * - gether
     * - tether
     *
     * @method fromWei
     * @param {Number|String} number can be a number, number string or a HEX of a decimal
     * @param {String} unit the unit to convert to, default ether
     * @return {String|Object} When given a BigNumber object it returns one as well, otherwise a number
    */
    public fromWei(number: string|number, unit: string) {
        const returnValue = this.toBigNumber(number).dividedBy(this.getValueOfUnit(unit));

        return this.isBigNumber(number) ? returnValue : returnValue.toString(10);
    }

    /**
     * Takes a number of a unit and converts it to wei.
     *
     * Possible units are:
     *   SI Short   SI Full        Effigy       Other
     * - kwei       femtoether     babbage
     * - mwei       picoether      lovelace
     * - gwei       nanoether      shannon      nano
     * - --         microether     szabo        micro
     * - --         milliether     finney       milli
     * - ether      --             --
     * - kether                    --           grand
     * - mether
     * - gether
     * - tether
     *
     * @method toWei
     * @param {Number|String|BigNumber} number can be a number, number string or a HEX of a decimal
     * @param {String} unit the unit to convert from, default ether
     * @return {String|Object} When given a BigNumber object it returns one as well, otherwise a number
    */
    public toWei(number: number, unit: string): string|object {
        const returnValue = this.toBigNumber(number).times(this.getValueOfUnit(unit));

        return this.isBigNumber(number) ? returnValue : returnValue.toString(10);
    }

    /**
     * Takes an input and transforms it into an bignumber
     *
     * @method toBigNumber
     * @param {Number|String|BigNumber} a number, string, HEX string or BigNumber
     * @return {BigNumber} BigNumber
    */
    public toBigNumber(number: string | number | BigNumber): BigNumber {
        /*jshint maxcomplexity:5 */
        number = number || 0;
        if (this.isBigNumber(number)) {
            return number as BigNumber;
        }

        if (this.isString(number)) {
            const str = number as string;
            if (str.indexOf('0x') === 0 || str.indexOf('-0x') === 0) {
                return new BigNumber(str.replace('0x', ''), 16);
            }
        }
        const n = number as number;
        return new BigNumber(n.toString(10), 10);
    }

    /**
     * Takes and input transforms it into bignumber and if it is negative value, into two's complement
     *
     * @method toTwosComplement
     * @param {Number|String|BigNumber}
     * @return {BigNumber}
     */
    public toTwosComplement(number: number | string | BigNumber): BigNumber {
        const bigNumber: BigNumber = this.toBigNumber(number);
        if (bigNumber.isLessThan(0)) {
            return new BigNumber('ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff', 16).plus(bigNumber).plus(1);
        }
        return bigNumber;
    }

    /**
     * Checks if the given string is strictly an address
     *
     * @method isStrictAddress
     * @param {String} address the given HEX adress
     * @return {Boolean}
    */
    public isStrictAddress(address: string): boolean {
        return /^0x[0-9a-f]{40}$/i.test(address);
    }

    /**
     * Checks if the given string is an address
     *
     * @method isAddress
     * @param {String} address the given HEX adress
     * @return {Boolean}
    */
    public isAddress(address: string): boolean {
        if (!/^(0x)?[0-9a-f]{40}$/i.test(address)) {
            // check if it has the basic requirements of an address
            return false;
        } else if (/^(0x)?[0-9a-f]{40}$/.test(address) || /^(0x)?[0-9A-F]{40}$/.test(address)) {
            // If it's all small caps or all all caps, return true
            return true;
        } else {
            // Otherwise check each case
            return this.isChecksumAddress(address);
        }
    }

    /**
     * Checks if the given string is a checksummed address
     *
     * @method isChecksumAddress
     * @param {String} address the given HEX adress
     * @return {Boolean}
    */
    public isChecksumAddress(address: string): boolean {
        // Check each case
        address = address.replace('0x', '');
        const addressHash = sha3(address.toLowerCase());

        for (let i = 0; i < 40; i++) {
            // the nth letter should be uppercase if the nth digit of casemap is 1
            if ((parseInt(addressHash[i], 16) > 7 && address[i].toUpperCase() !== address[i]) || (parseInt(addressHash[i], 16) <= 7 && address[i].toLowerCase() !== address[i])) {
                return false;
            }
        }
        return true;
    }



    /**
     * Makes a checksum address
     *
     * @method toChecksumAddress
     * @param {String} address the given HEX adress
     * @return {String}
    */
    public toChecksumAddress(address: string): string {
        if (typeof address === 'undefined') { return ''; }

        address = address.toLowerCase().replace('0x', '');
        const addressHash = sha3(address);
        let checksumAddress = '0x';

        for (let i = 0; i < address.length; i++) {
            // If ith character is 9 to f then make it uppercase
            if (parseInt(addressHash[i], 16) > 7) {
                checksumAddress += address[i].toUpperCase();
            } else {
                checksumAddress += address[i];
            }
        }
        return checksumAddress;
    }

    /**
     * Transforms given string to valid 20 bytes-length addres with 0x prefix
     *
     * @method toAddress
     * @param {String} address
     * @return {String} formatted address
     */
    public toAddress(address: string): string {
        if (this.isStrictAddress(address)) {
            return address;
        }

        if (/^[0-9a-f]{40}$/.test(address)) {
            return '0x' + address;
        }

        return '0x' + this.padLeft(this.toHex(address).substr(2), 40);
    }

    /**
     * Returns true if object is BigNumber, otherwise false
     *
     * @method isBigNumber
     * @param {Object}
     * @return {Boolean}
     */
    public isBigNumber(object: any): boolean {
        return (object && (object instanceof BigNumber || (object.constructor && object.constructor.name === 'BigNumber')));
    }

    /**
     * Returns true if object is string, otherwise false
     *
     * @method isString
     * @param {Object}
     * @return {Boolean}
     */
    public isString(object: any): boolean {
        return typeof object === 'string' ||
            (object && object.constructor && object.constructor.name === 'String');
    }

    /**
     * Returns true if object is function, otherwise false
     *
     * @method isFunction
     * @param {Object}
     * @return {Boolean}
     */
    public isFunction(object: any): boolean {
        return typeof object === 'function';
    }

    /**
     * Returns true if object is Objet, otherwise false
     *
     * @method isObject
     * @param {Object}
     * @return {Boolean}
     */
    public isObject(object: any): boolean {
        return object !== null && !(Array.isArray(object)) && typeof object === 'object';
    }

    /**
     * Returns true if object is boolean, otherwise false
     *
     * @method isBoolean
     * @param {Object}
     * @return {Boolean}
     */
    public isBoolean(object: object): boolean {
        return typeof object === 'boolean';
    }

    /**
     * Returns true if object is array, otherwise false
     *
     * @method isArray
     * @param {Object}
     * @return {Boolean}
     */
    public isArray(object: object): boolean {
        return Array.isArray(object);
    }

    /**
     * Returns true if given string is valid json object
     *
     * @method isJson
     * @param {String}
     * @return {Boolean}
     */
    public isJson(str: string): boolean {
        try {
            return !!JSON.parse(str);
        } catch (e) {
            return false;
        }
    }

    /**
     * Returns true if given string is a valid Ethereum block header bloom.
     *
     * @method isBloom
     * @param {String} hex encoded bloom filter
     * @return {Boolean}
     */
    public isBloom(bloom: string): boolean {
        if (!/^(0x)?[0-9a-f]{512}$/i.test(bloom)) {
            return false;
        } else if (/^(0x)?[0-9a-f]{512}$/.test(bloom) || /^(0x)?[0-9A-F]{512}$/.test(bloom)) {
            return true;
        }
        return false;
    }

    /**
     * Returns true if given string is a valid log topic.
     *
     * @method isTopic
     * @param {String} hex encoded topic
     * @return {Boolean}
     */
    public isTopic(topic: string): boolean {
        if (!/^(0x)?[0-9a-f]{64}$/i.test(topic)) {
            return false;
        } else if (/^(0x)?[0-9a-f]{64}$/.test(topic) || /^(0x)?[0-9A-F]{64}$/.test(topic)) {
            return true;
        }
        return false;
    }
}
