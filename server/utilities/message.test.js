const expect = require('expect');

const {generateMessage} = require('./message');

describe('generateMessage', ()=>{
    it('should create a message with all values', ()=>{
        var from = 'Test User 1';
        var text = 'The dummy test message';

        var msg = generateMessage(from, text);

        
        expect(msg.from).toBe(from);
        expect(msg.text).toBe(text);
        expect(msg.createdAt).toBeA('number');

    });
});