const checkParticipant = require('../commands/mogiri').checkParticipant;

test('valid member pass the check', () => {
	expect(checkParticipant('To2-12345')).toBeTruthy();
});

test('valid member with emoji pass the check', () => {
	expect(checkParticipant('π£π£To2-12345πΊπΊ')).toBeTruthy();
});

test('valid member with empty pass the check', () => {
	expect(checkParticipant('  To2-12345  ')).toBeTruthy();
	expect(checkParticipant('γγTo2-12345γγ')).toBeTruthy();
});

test('invalid member do not pass the check', () => {
	expect(checkParticipant('lorem ipsum')).toBeFalsy();
});

test('invalid member do not pass the check', () => {
	expect(checkParticipant('To2 - 12345')).toBeFalsy();
});