import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, TouchableOpacity, Text, StyleSheet, SafeAreaView, Image } from 'react-native';
import axios from 'axios';

export default function HomeScreen() {
	const [todoList, setTodoList] = useState<string[]>([]);
	const [currentItem, setCurrentItem] = useState('');
	const [isEditing, setIsEditing] = useState(false);
	const [editIndex, setEditIndex] = useState<number | null>(null);

	// Load TODO items from backend on initial load
	useEffect(() => {
		axios.get('http://192.168.1.182:3001/load')
			.then((response) => {
				setTodoList(response.data);
			})
			.catch((error) => console.error('Error loading todo list:', error));
	}, []);

	// Save TODO items to backend (Redis)
	const saveToBackend = () => {
		axios.post('http://192.168.1.182:3001/save', { todoList })
			.then(() => alert('List saved!'))
			.catch((error) => console.error('Error saving todo list:', error));
	};

	// Restore TODO items from backend
	const restoreFromBackend = () => {
		axios.get('http://192.168.1.182:3001/load')
			.then((response) => {
				setTodoList(response.data);
			})
			.catch((error) => console.error('Error restoring todo list:', error));
	};

	// Clear TODO items from backend
	const clearTodoList = () => {
		axios.get('http://192.168.1.182:3001/clear')
			.then(() => {
				setTodoList([]);
			})
			.catch((error) => console.error('Error clearing todo list:', error));
	};

	// Add or Edit item in the todo list
	const handleAddOrEdit = () => {
		if (isEditing && editIndex !== null) {
			const updatedList = [...todoList];
			updatedList[editIndex] = currentItem;

			setTodoList(updatedList);
			setIsEditing(false);
			setCurrentItem('');
			setEditIndex(null);
		} else {
			setTodoList([...todoList, currentItem]);
			setCurrentItem('');
		}
	};

	// Delete item from the todo list
	const deleteItem = (index: number) => {
		const updatedList = todoList.filter((_, i) => i !== index);

		setTodoList(updatedList);
	};

	// Edit item in the todo list
	const editItem = (index: number) => {
		setCurrentItem(todoList[index]);
		setIsEditing(true);
		setEditIndex(index);
	};

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.innerContainer}>
				<Image
					source={require('@/assets/images/logo.png')}
					style={styles.logo}
					resizeMode="contain"
				/>

				{/* Add/Edit Todo */}
				<View style={styles.inputContainer}>
					<Text style={styles.label}>Task</Text>
					<TextInput
						style={styles.input}
						value={currentItem}
						onChangeText={setCurrentItem}
						placeholder="Enter a new task"
					/>
				</View>

				<TouchableOpacity style={styles.button} onPress={handleAddOrEdit}>
					<Text style={styles.buttonText}>{isEditing ? 'Edit' : 'Add'}</Text>
				</TouchableOpacity>

				{/* Control Buttons */}
				<View style={styles.buttonContainer}>
					<TouchableOpacity style={styles.controlButton} onPress={saveToBackend}>
						<Text style={styles.controlButtonText}>Save</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.controlButton} onPress={restoreFromBackend}>
						<Text style={styles.controlButtonText}>Restore</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.controlButton} onPress={clearTodoList}>
						<Text style={styles.controlButtonText}>Clear</Text>
					</TouchableOpacity>
				</View>

				{/* Todo List */}
				<FlatList
					data={todoList}
					renderItem={({ item, index }) => (
						<View style={styles.item}>
							<Text style={styles.itemText}>{item}</Text>
							<TouchableOpacity onPress={() => editItem(index)}>
								<Image
									source={require('@/assets/images/edit.png')}
									style={{ width: 24, height: 24 }}
								/>
							</TouchableOpacity>
							<TouchableOpacity onPress={() => deleteItem(index)}>
								<Image
									source={require('@/assets/images/delete.png')}
									style={{ width: 24, height: 24 }}
								/>
							</TouchableOpacity>
						</View>
					)}
					keyExtractor={(item, index) => index.toString()}
					contentContainerStyle={styles.listContent}
					style={styles.flatListContainer}
				/>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white'
	},
	innerContainer: {
		paddingHorizontal: 20,
	},
	logo: {
		width: 250,
		height: 50,
		alignSelf: 'center',
		marginVertical: 10
	},
	inputContainer: {
		marginBottom: 10,
	},
	label: {
		fontSize: 16,
		fontWeight: 'bold',
		marginBottom: 8,
		color: '#333',
	},
	input: {
		height: 40,
		borderColor: 'gray',
		borderWidth: 1,
		borderRadius: 5,
		paddingHorizontal: 10,
		backgroundColor: '#fff',
	},
	button: {
		backgroundColor: '#007BFF',
		paddingVertical: 10,
		paddingHorizontal: 20,
		borderRadius: 5,
		alignItems: 'center',
		marginBottom: 25,
	},
	buttonText: {
		color: '#fff',
		fontSize: 16,
		fontWeight: 'bold',
	},
	buttonContainer: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		marginBottom: 35
	},
	controlButton: {
		backgroundColor: '#007BFF',
		paddingVertical: 10,
		paddingHorizontal: 20,
		borderRadius: 5,
		alignItems: 'center',
		flex: 1,
		marginHorizontal: 5,
	},
	controlButtonText: {
		color: '#fff',
		fontSize: 16,
		fontWeight: 'bold',
		textAlign: 'center',
	},
	flatListContainer: {
		maxHeight: 550,
		overflow: 'hidden',
	},
	listContent: {
		paddingBottom: 10,
	},
	item: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingVertical: 10,
		paddingHorizontal: 15,
		borderBottomWidth: 1,
		borderBottomColor: '#ccc',
	},
	itemText: {
		flex: 1,
		maxWidth: '70%',
		fontSize: 16,
		color: '#333',
	},
	action: {
		color: 'blue',
	},
});
