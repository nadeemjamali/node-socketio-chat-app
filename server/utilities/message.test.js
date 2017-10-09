const expect = require('expect');

const {generateMessage,generateLocationMessage} = require('./message');

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

describe('generateLocationMessage', ()=>{
    it('should create correct location object', ()=>{
        var from = 'Admin';
        var lat = 1;
        var long = 2;
        var resultUrl = 'https://www.google.com/maps?q=1,2';

        var msg = generateLocationMessage(from, lat, long);

        
        expect(msg.from).toBe(from);
        expect(msg.url).toBe(resultUrl);
        expect(msg.createdAt).toBeA('number');

    });
});