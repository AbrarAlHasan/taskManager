import {View, Text, Pressable} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useQuery, useRealm} from '@realm/react';
import Realm from 'realm';
import {Task} from '../Schema/Task';

const Messaging = () => {
  const [tasks, setTasks] = useState<any>(null);
  const taskList = useQuery('Task');
  useEffect(() => {
    setTasks(taskList);
  }, []);

  const realm = useRealm();

  const addTask = () => {
    realm.write(() => {
      realm.create('Task', {
        _id: new Realm.BSON.ObjectID(),
        description: 'Hello New Task 3',
        createdAt: new Date(),
        isComplete: false,
      });
    });
  };

  const deleteTask = (task: any) => {
    realm.write(() => {
      realm.delete(task);
    });
  };
  const deleteComment = (comment: any) => {
    realm.write(() => {
      realm.delete(comment);
    });
  };

  const addNewComment = (task: any) => {
    console.log('added Triggered');
    try {
      const newComment = realm.write(() => {
        return realm.create('Comments', {
          _id: new Realm.BSON.ObjectId(),
          comment: 'New Comment Added',
          createdAt: new Date(),
        });
      });
      realm.write(() => {
        task.comments.push(newComment);
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView>
      <Text className=" text-black">Messaging</Text>
      <Pressable onPress={() => addTask()}>
        <Text>Add Task</Text>
      </Pressable>
      <View>
        {tasks?.map((data: any) => {
          return (
            <React.Fragment key={data?._id}>
              <Pressable style={{flexDirection: 'row', marginVertical: 10}}>
                <Pressable
                  onPress={() => {
                    addNewComment(data);
                  }}>
                  <Text>{data?.description}</Text>
                </Pressable>
                <Pressable
                  onPress={() => {
                    deleteTask(data);
                  }}>
                  <Text style={{marginLeft: 20}}>Delete</Text>
                </Pressable>
              </Pressable>
              {data?.comments?.map((data: any) => {
                return (
                  <Pressable
                    key={data?._id}
                    onPress={() => {
                      deleteComment(data);
                    }}>
                    <Text>{data?.comment}</Text>
                  </Pressable>
                );
              })}
            </React.Fragment>
          );
        })}
      </View>
    </SafeAreaView>
  );
};

export default Messaging;
