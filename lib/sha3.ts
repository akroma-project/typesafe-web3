import * as CryptoJS from 'crypto-js';
import { SHA3 } from 'crypto-js';

export function sha3(value: any, options: any = null) {
    if (options && options.encoding === 'hex') {
        if (value.length > 2 && value.substr(0, 2) === '0x') {
            value = value.substr(2);
        }
        value = CryptoJS.enc.Hex.parse(value);
    }

    return SHA3(value, {
        outputLength: 256,
    }).toString();
};


