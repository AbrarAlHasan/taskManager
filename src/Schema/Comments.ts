import Realm, {BSON, ObjectSchema} from 'realm';
import {Task} from './Task';

export class Comments extends Realm.Object<Comments> {
  _id!: Realm.BSON.ObjectId;
  comment!: string;
  createdAt!: Date;

  static primaryKey = '_id';

  static schema: ObjectSchema = {
    name: 'Comments',
    properties: {
      _id: 'objectId',
      comment: {type: 'string'},
      createdAt: {
        type: 'date',
        default: new Date(),
      },
     
    },
  };
}
