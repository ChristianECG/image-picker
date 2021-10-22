import React, { useState } from 'react';
import {
	StyleSheet,
	Text,
	View,
	Image,
	Button,
	Alert,
	TouchableOpacity,
	TouchableOpacityBase,
	StatusBar,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Sharing from 'expo-sharing';

export default function App() {
	const [selectedImage, setSelectedImage] = useState(
		'https://picsum.photos/200/300'
	);

	let openImagePickerAsync = async () => {
		let permissionResult =
			await ImagePicker.requestMediaLibraryPermissionsAsync();
		if (permissionResult.granted === false) {
			alert('Necesitamos el permiso de tu camara'); //Permiso para utilzar camara
			return;
		}
		let pickerResult = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [1, 1],
			quality: 1,
		});
		if (pickerResult.cancelled == true) {
			let openShareDialogAsync = async () => {
				if (!(await Sharing.isAvailableAsync())) {
					alert('Uh oh, sharing isnt available on your platform');
					return;
				}
			};
			return;
		}
		setSelectedImage(pickerResult.uri); //actualización del estado
		await Sharing.shareAsync(pickerResult.uri);
	};
	return (
		<View style={styles.container}>
			<Text style={styles.buttonText}>
				{' '}
				Open up App.js to start working on your app!
			</Text>
			<Image source={{ uri: selectedImage }} style={styles.image} />
			<StatusBar style="auto" />
			<TouchableOpacity
				onPress={openImagePickerAsync}
				style={styles.button}
			>
				<Text>Presioname</Text>
			</TouchableOpacity>
		</View>
	);
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	image: {
		height: 180,
		width: 180,
		borderRadius: 90,
	},
	button: {
		backgroundColor: 'blue',
		padding: 7,
	},
	buttonText: { fontSize: 20, color: '#fff' },
});
