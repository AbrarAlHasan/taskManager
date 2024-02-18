import Realm, {BSON, ObjectSchema} from 'realm';
import {Comments} from './Comments';

export class Task extends Realm.Object<Task> {
  _id!: Realm.BSON.ObjectId;
  description!: string;
  isComplete!: boolean;
  createdAt!: Date;
  comments!: Realm.List<Comments>;

  static primaryKey = '_id';

  static schema: ObjectSchema = {
    name: 'Task',
    properties: {
      _id: 'objectId',
      description: {type: 'string'},
      createdAt: {
        type: 'date',
        default: new Date(),
      },
      isComplete: {
        type: 'bool',
        default: false,
        indexed: true,
      },
      comments:'Comments[]'
    },
  };
}
