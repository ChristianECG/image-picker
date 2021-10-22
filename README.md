<img src="head.png" width="100%">

# Image Picker

The Image Picker App is a simple app that allows you to select an image from your device's photo library and share it with your friends.

The app is built using React Native and Expo.

We used the Expo API to get the image from the device's photo library and the Expo Image Picker API to share the image.

<img src="https://img.shields.io/github/repo-size/christianecg/image-picker?style=for-the-badge">
<img src="https://img.shields.io/badge/license-MIT-blue?style=for-the-badge">
<img src="https://img.shields.io/github/followers/christianecg?style=for-the-badge">
<img src="https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB">
<img src="https://img.shields.io/badge/Play_Store-444444?style=for-the-badge&logo=google-play&logoColor=61DAFB">

## Tech Stack

-   React Native
-   Expo
-   Expo Image Picker

## Installation

    git clone git@github.com:ChristianECG/image-picker.git
    cd image-picker
    npm install

## Usage

    npm start

## Deployment

    expo build:android
    expo build:ios

## Platforms

-   Android (Play Store): https://play.google.com/store/apps/details?id=com.christianecg.imagepicker

## Contributing

-   Fork the repo.
-   Create a new branch.
-   Commit your changes.
-   Push your branch to your fork.
-   Create a new branch on the original repo.
-   Commit your changes.
-   Push your branch to the original repo.
-   Open a pull request on GitHub.

## License

This project is licensed under the MIT license. See more at [MIT](https://opensource.org/licenses/MIT).

## Relevant code

At line 8 of the App.js, we used the useState hook to set the image to null.

    const [image, setImage] = useState(null);

At lines 12 - 19, we used the openImagePickerAsync function to open the request for camera permissions.

    async function openImagePickerAsync() {
    const permissionResult =
    await ImagePicker.requestCameraPermissionsAsync();

    if (!permissionResult.granted) {
    	alert('Permission denied');
    	return;
    }

At lines 27 - 34, we used the pickImage function to open the image picker and set the image to the image selected.

    async function pickImage() {
    	// Let the user pick an image from the gallery
    	let result = await ImagePicker.launchImageLibraryAsync({
    		mediaTypes: ImagePicker.MediaTypeOptions.All,
    		allowsEditing: true,
    		aspect: [1, 1],
    		quality: 1,
    	});

At line 38, we used the setImage function to set the image of the image picker to the image selected.

    setImage(result.uri);

At line 55, in shareWith function, we used the Sharing.shareAsync function to share the image with the user's friends.

    await Sharing.shareAsync(image);

At lines 62 - 76, we used an if statement to check if the image is null. If it isn't, we display a view with the image.

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

And, at lines 80 - 94, we display the other view with a generic image.

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
