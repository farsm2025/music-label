import test from 'node:test';
import assert from 'node:assert/strict';
import {validateContact} from '../lib/contact.mjs';
const valid={kind:'contact',email:'music@example.com',name:'Élodie',subject:'Collaboration',message:'Une idée de collaboration musicale.'};
test('accepts and trims a valid contact with a Unicode name',()=>{assert.equal(validateContact({...valid,name:' Élodie '}).data.name,'Élodie');});
test('rejects malformed bodies and missing required fields',()=>{for(const body of [null,[],{}, {...valid,email:'bad'},{...valid,message:'x'},{...valid,name:'x'},{...valid,subject:'x'},{...valid,kind:'other'}])assert.ok(validateContact(body).error);});
test('rejects spam honeypot and subject header injection',()=>{assert.ok(validateContact({...valid,website:'spam'}).error);assert.ok(validateContact({...valid,subject:'Hi\r\nBcc: other@example.com'}).error);});
test('enforces input limits',()=>{for(const [key,length]of [['name',121],['subject',201],['message',5001]])assert.ok(validateContact({...valid,[key]:'a'.repeat(length)}).error);});
test('newsletter produces an explicit request for manual confirmation',()=>{const result=validateContact({kind:'newsletter',email:valid.email});assert.ok(result.data.message.includes('Confirmer'));assert.ok(validateContact({kind:'newsletter',email:'bad'}).error);});
