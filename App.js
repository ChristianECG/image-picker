import { Text, TouchableOpacity, View, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Sharing from 'expo-sharing';
import React, { useState } from 'react';

export default function App() {
	// Assign a state variable to the image
	const [image, setImage] = useState(null);

	// A function to handle the image picker
	// This function will be called when the user clicks the button
	async function openImagePickerAsync() {
		const permissionResult =
			await ImagePicker.requestCameraPermissionsAsync();

		if (!permissionResult.granted) {
			alert('Permission denied');
			return;
		}

		// Show the image picker
		pickImage();
	}

	// A function to handle the image picker
	// This function will be called when the user clicks the button and the permission is granted
	async function pickImage() {
		// Let the user pick an image from the gallery
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [1, 1],
			quality: 1,
		});

		if (!result.cancelled) {
			// Set the image state to the image that was picked
			setImage(result.uri);
		}
	}

	// A function to handle the sharing of the image
	async function shareWith() {
		if (!image) {
			alert('Please pick an image first');
			return;
		}

		if (!(await Sharing.isAvailableAsync())) {
			alert(`Uh oh, sharing isn't available on your platform`);
			return;
		}

		// Share the image
		await Sharing.shareAsync(image);

		// Reset the image state
		setImage(null);
	}

	// In case the user selects an image, show it
	if (image !== null) {
		return (
			<View style={styles.view}>
				{image && (
					<Image
						source={{ uri: image }}
						style={{ width: 200, height: 200 }}
					/>
				)}

				<TouchableOpacity style={styles.button2} onPress={shareWith}>
					<Text>Share with</Text>
				</TouchableOpacity>
			</View>
		);
	}

	// In case the user doesn't select an image, show the other view
	return (
		<View style={styles.view}>
			<Image
				source={{ uri: 'https://source.unsplash.com/random' }}
				style={{ width: 200, height: 200 }}
			/>

			<TouchableOpacity
				style={styles.button}
				onPress={openImagePickerAsync}
			>
				<Text>Pick an image</Text>
			</TouchableOpacity>
		</View>
	);
}

// Styles
const styles = {
	view: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	image: {
		width: 200,
		height: 200,
		borderRadius: 100,
		marginBottom: 50,
	},
	button: {
		backgroundColor: '#5ea7ff',
		padding: 10,
		margin: 10,
		borderRadius: 10,
	},
	button2: {
		backgroundColor: '#d7f4fc',
		padding: 10,
		margin: 10,
		borderRadius: 10,
	},
};
