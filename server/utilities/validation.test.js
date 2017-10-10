const expect = require('expect');

const {isRealString} = require('./validation');

describe('isRealString', ()=>{
    it('should pass the real string', ()=>{
        var str = 'This is real string';
        var result = isRealString(str);
        expect(result).toBe(true);
    });

    it('should not pass the empty strings', ()=>{
        var str = '   ';
        var result = isRealString(str);
        expect(result).toBe(false);
    });

    it('should allow string with non-space characters', ()=>{
        var str = ' -- . ';
        var result = isRealString(str);
        expect(result).toBe(true);
    });

    it('should not pass numbers only', ()=>{
        var str = 298;
        var result = isRealString(str);
        expect(result).toBe(false);
    })
});