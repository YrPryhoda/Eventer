import conferences from './conferences';
import people from './users';
import firebase from 'firebase';

export const saveMockToFB = () => {
  const eventsRef = firebase.database().ref('/events');
  const peopleRef = firebase.database().ref('/people');
  conferences.forEach(conference => eventsRef.push(conference))
  people.forEach(man => peopleRef.push(man))
}

export const runMigration = function () {
  firebase.database().ref().once('value', () => saveMockToFB())
}