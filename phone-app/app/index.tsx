import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function App() {
	const [permission, requestPermission] = useCameraPermissions();
	const [qr_scanned, setQr_scanned] = useState(false);

	function send_creds(data: any) {
		// TEST SAMPLE
		// {'SITE': 'test_site', 'STATUS': False, 'UID': 'ID_TEST'}

		data = data.split(',');

		// FOR ACTUAL USE
		const UID = data[0];
		const SITE = data[1];

		// FOR TESTING
		// const UID = 'ID_TEST';
		// const SITE = 'test_site';

		let test_userID = 'ID_TEST';
		let test_password = 'TEST_password';

		console.log(`UID: ${UID}`);
		console.log(`SITE: ${SITE}`);

		const CREDS_PACKAGE = {
			UID: UID,
			USERNAME: test_userID,
			PASSWORD: test_password,
		};

		const BASE_URL = 'https://armacwan.pythonanywhere.com/';

		console.log('SENDING CREDS');

		// send http request to backend
		fetch(BASE_URL + 'send_creds', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(CREDS_PACKAGE),
		})
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
			});
	}

	if (!permission) {
		// Camera permissions are still loading.
		return <View />;
	}

	if (!permission.granted) {
		// Camera permissions are not granted yet.
		return (
			<View style={styles.container}>
				<Text style={styles.message}>
					We need your permission to show the camera
				</Text>
				<Button
					onPress={requestPermission}
					title="grant permission"
				/>
			</View>
		);
	}

	return (
		<View style={styles.container}>
			{/* display camera view only if qr_scanned is false */}
			{!qr_scanned && (
				<CameraView
					style={styles.camera}
					facing="back"
					onBarcodeScanned={({ data }) => {
						setQr_scanned(true);
						send_creds(data);
					}}
				></CameraView>
			)}

			{qr_scanned && (
				<View style={styles.container}>
					<Text style={styles.message}>Authentication Sent</Text>
				</View>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
	},
	message: {
		textAlign: 'center',
		paddingBottom: 10,
	},
	camera: {
		flex: 1,
	},
	buttonContainer: {
		flex: 1,
		flexDirection: 'row',
		backgroundColor: 'transparent',
		margin: 64,
	},
	button: {
		flex: 1,
		alignSelf: 'flex-end',
		alignItems: 'center',
	},
	text: {
		fontSize: 24,
		fontWeight: 'bold',
		color: 'white',
	},
});
