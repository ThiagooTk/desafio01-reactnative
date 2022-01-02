import React, { useEffect, useRef, useState } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { View, TouchableOpacity, Text, Image, StyleSheet, TextInput} from 'react-native';
import trashIcon from '../assets/icons/trash/trash.png';
import editIcon from '../assets/icons/edit/edit.png';
import { Task } from './TasksList';

interface TaskItemProps {
  task: Task;
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: (id: number, taskNewTitle: string) => void;
}

export function TaskItem({ task, toggleTaskDone, removeTask, editTask } :TaskItemProps) {

  const [editItem, setEditItem ] = useState(false);
  const [ taskNewTitleValue, setTaskNewTitleValue ] = useState(task.title);
  const textInputRef = useRef<TextInput>(null)

  function handleStartEditing(){
    setEditItem(true);
  }

  function handleCancelEditing(){
    setTaskNewTitleValue(task.title); //Manter o valor antigo 
    setEditItem(false); 
  }

  function handleSubmitEditing(){
    editTask(task.id, taskNewTitleValue);
    setEditItem(false); 
  }

  useEffect(() => {
    if (textInputRef.current) {
      if (editItem) {
        textInputRef.current.focus();
      } else {
        textInputRef.current.blur();
      }
    }
  }, [editItem]);

  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity
          //testID={`button-${index}`}
          activeOpacity={0.7}
          style={styles.taskButton}
          onPress={() => toggleTaskDone(task.id)}
        >
          
          <View 
            //testID={`marker-${index}`}
            style={task.done ? styles.taskMarkerDone : styles.taskMarker }
          >
            { task.done && (
              <Icon 
                name="check"
                size={12}
                color="#FFF"
              />
            )}
          </View>

          <TextInput 
            ref={textInputRef}
            style={ task.done ? styles.taskTextDone : styles.taskText}
            value={taskNewTitleValue}
            editable={editItem}
            onChangeText={setTaskNewTitleValue}
            onSubmitEditing={handleSubmitEditing}
          />

        </TouchableOpacity>
      </View>
      <View style={ styles.iconsContainer }>
          {
            editItem ? (
              <TouchableOpacity
                onPress={handleCancelEditing}
              >
                <Icon 
                  name="x"
                  size={24}
                  color="#FFF"
                />
             </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={handleStartEditing}
              >
              <Image source={editIcon} />
            </TouchableOpacity>
            )
          }
           <View style={ styles.iconsDivider } />
            <TouchableOpacity
              disabled={editItem}
              onPress={() => removeTask(task.id)}
            >
            <Image source={trashIcon} style={{ opacity: editItem ? 0.2 : 1 }} />
            </TouchableOpacity>
          </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center'
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#B2B2B2',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskText: {
    color: '#666',
    fontFamily: 'Inter-Medium'
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: '#1DB863',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskTextDone: {
    color: '#1DB863',
    textDecorationLine: 'line-through',
    fontFamily: 'Inter-Medium'
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 12,
    paddingRight: 24
  },
  iconsDivider: {
    width: 1,
    height: 24,
    backgroundColor: "rgba(196, 196, 196, 0.24)",
    paddingHorizontal: 1
  }
})