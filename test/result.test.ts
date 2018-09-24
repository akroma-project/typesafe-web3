import { expect } from 'chai';
import { Result } from '../lib/model/result';

describe('success result', () => {
    it('should set ok as true', () => {
        const result = Result.success<string>('data');
        expect(result.ok).to.eq(true);
    });
    it('should return data', () => {
        const result = Result.success<string>('data');
        expect(result.data).to.eq('data');
    });
});
