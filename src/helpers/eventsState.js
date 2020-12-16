import { Map, OrderedMap } from 'immutable'

export default function eventsArray(data, RecordModel = Map) {
  return (new OrderedMap(data)).mapEntries(([uid, value]) => (
    [uid, (new RecordModel(value)).set('uid', uid)]
  ));
}