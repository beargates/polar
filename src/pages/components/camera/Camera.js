/**
 * 相机View
 * todo: Add Permissions For Android
 * To use the camera on Android you must ask for camera permission:
 *    <uses-permission android:name="android.permission.CAMERA" />
 *
 * To enable video recording feature you have to add the following code to the AndroidManifest.xml:
 *    <uses-permission android:name="android.permission.RECORD_AUDIO"/>
 *    <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
 *    <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
 */
import React from 'react';
import {
  CameraRoll,
  Dimensions,
  Image,
  SafeAreaView,
  Slider,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import { RNCamera } from 'react-native-camera';

const flashModeOrder = {
  off: 'on',
  on: 'auto',
  auto: 'torch',
  torch: 'off',
};

const wbOrder = {
  auto: 'sunny',
  sunny: 'cloudy',
  cloudy: 'shadow',
  shadow: 'fluorescent',
  fluorescent: 'incandescent',
  incandescent: 'auto',
};

const landmarkSize = 2;

export default class CameraScreen extends React.Component {
  state = {
    flash: 'off',
    zoom: 0,
    autoFocus: 'on',
    autoFocusPoint: {
      normalized: { x: 0.5, y: 0.5 }, // normalized values required for autoFocusPointOfInterest
      drawRectPosition: {
        x: Dimensions.get('window').width * 0.5 - 32,
        y: Dimensions.get('window').height * 0.5 - 32,
      },
    },
    depth: 0,
    type: 'back',
    whiteBalance: 'auto',
    ratio: '16:9',
    recordOptions: {
      mute: false,
      maxDuration: 5,
      quality: RNCamera.Constants.VideoQuality['288p'],
    },
    isRecording: false,
    canDetectFaces: false,
    canDetectText: false,
    canDetectBarcode: false,
    faces: [],
    textBlocks: [],
    barcodes: [],
  };

  toggleFacing = () => {
    this.setState({
      type: this.state.type === 'back' ? 'front' : 'back',
    });
  }

  toggleFlash = () => {
    this.setState({
      flash: flashModeOrder[this.state.flash],
    });
  }

  toggleWB = () => {
    this.setState({
      whiteBalance: wbOrder[this.state.whiteBalance],
    });
  }

  toggleFocus = () => {
    this.setState({
      autoFocus: this.state.autoFocus === 'on' ? 'off' : 'on',
    });
  }

  touchToFocus = (event) => {
    const { pageX, pageY } = event.nativeEvent;
    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;
    const isPortrait = screenHeight > screenWidth;

    let x = pageX / screenWidth;
    let y = pageY / screenHeight;
    // Coordinate transform for portrait. See autoFocusPointOfInterest in docs for more info
    if (isPortrait) {
      x = pageY / screenHeight;
      y = -(pageX / screenWidth) + 1;
    }

    this.setState({
      autoFocusPoint: {
        normalized: { x, y },
        drawRectPosition: { x: pageX, y: pageY },
      },
    });
  }

  zoomOut = () => {
    this.setState({
      zoom: this.state.zoom - 0.1 < 0 ? 0 : this.state.zoom - 0.1,
    });
  }

  zoomIn = () => {
    this.setState({
      zoom: this.state.zoom + 0.1 > 1 ? 1 : this.state.zoom + 0.1,
    });
  }

  setFocusDepth = (depth) => {
    this.setState({
      depth,
    });
  }

  takePicture = async () => {
    if (this.camera) {
      const data = await this.camera.takePictureAsync();
      this.setState({ photoData: data });
      CameraRoll.saveToCameraRoll(data.uri, 'photo');
    }
  };

  takeVideo = async () => {
    if (this.camera) {
      try {
        const promise = this.camera.recordAsync(this.state.recordOptions);

        if (promise) {
          this.setState({ isRecording: true });
          const data = await promise;
          this.setState({ isRecording: false });
          CameraRoll.saveToCameraRoll(data.uri, 'video');
        }
      } catch (e) {
        console.error(e);
      }
    }
  };

  toggle = value => () => this.setState(prevState => ({ [value]: !prevState[value] }));

  facesDetected = ({ faces }) => this.setState({ faces });

  renderFace = ({ bounds, faceID, rollAngle, yawAngle }) => (
    <View
      key={faceID}
      transform={[
        { perspective: 600 },
        { rotateZ: `${rollAngle.toFixed(0)}deg` },
        { rotateY: `${yawAngle.toFixed(0)}deg` },
      ]}
      style={[
        styles.face,
        {
          ...bounds.size,
          left: bounds.origin.x,
          top: bounds.origin.y,
        },
      ]}
    >
      <Text style={styles.faceText}>ID: {faceID}</Text>
      <Text style={styles.faceText}>rollAngle: {rollAngle.toFixed(0)}</Text>
      <Text style={styles.faceText}>yawAngle: {yawAngle.toFixed(0)}</Text>
    </View>
  );

  renderLandmarksOfFace(face) {
    const renderLandmark = position =>
      position && (
        <View
          style={[
            styles.landmark,
            {
              left: position.x - landmarkSize / 2,
              top: position.y - landmarkSize / 2,
            },
          ]}
        />
      );
    return (
      <View key={`landmarks-${face.faceID}`}>
        {renderLandmark(face.leftEyePosition)}
        {renderLandmark(face.rightEyePosition)}
        {renderLandmark(face.leftEarPosition)}
        {renderLandmark(face.rightEarPosition)}
        {renderLandmark(face.leftCheekPosition)}
        {renderLandmark(face.rightCheekPosition)}
        {renderLandmark(face.leftMouthPosition)}
        {renderLandmark(face.mouthPosition)}
        {renderLandmark(face.rightMouthPosition)}
        {renderLandmark(face.noseBasePosition)}
        {renderLandmark(face.bottomMouthPosition)}
      </View>
    );
  }

  renderFaces = () => (
    <View style={styles.facesContainer} pointerEvents="none">
      {this.state.faces.map(this.renderFace)}
    </View>
  );

  renderLandmarks = () => (
    <View style={styles.facesContainer} pointerEvents="none">
      {this.state.faces.map(this.renderLandmarksOfFace)}
    </View>
  );

  renderTextBlocks = () => (
    <View style={styles.facesContainer} pointerEvents="none">
      {this.state.textBlocks.map(this.renderTextBlock)}
    </View>
  );

  renderTextBlock = ({ bounds, value }) => (
    <React.Fragment key={value + bounds.origin.x}>
      <Text style={[styles.textBlock, { left: bounds.origin.x, top: bounds.origin.y }]}>
        {value}
      </Text>
      <View
        style={[
          styles.text,
          {
            ...bounds.size,
            left: bounds.origin.x,
            top: bounds.origin.y,
          },
        ]}
      />
    </React.Fragment>
  );

  textRecognized = object => {
    const { textBlocks } = object;
    this.setState({ textBlocks });
  };

  barcodeRecognized = ({ barcodes }) => this.setState({ barcodes });

  renderBarcodes = () => (
    <View style={styles.facesContainer} pointerEvents="none">
      {this.state.barcodes.map(this.renderBarcode)}
    </View>
  );

  renderBarcode = ({ bounds, data, type }) => (
    <React.Fragment key={data + bounds.origin.x}>
      <View
        style={[
          styles.text,
          {
            ...bounds.size,
            left: bounds.origin.x,
            top: bounds.origin.y,
          },
        ]}
      >
        <Text style={[styles.textBlock]}>{`${data} ${type}`}</Text>
      </View>
    </React.Fragment>
  );

  renderPanel() {
    const { canDetectFaces, canDetectText, canDetectBarcode } = this.state;
    const drawFocusRingPosition = {
      top: this.state.autoFocusPoint.drawRectPosition.y - 32,
      left: this.state.autoFocusPoint.drawRectPosition.x - 32,
    };
    return <SafeAreaView
      style={[StyleSheet.absoluteFill, {
        justifyContent: 'space-between'
      }]}
    >
      <View style={StyleSheet.absoluteFill}>
        <View style={[styles.autoFocusBox, drawFocusRingPosition]}/>
        <TouchableWithoutFeedback onPress={this.touchToFocus}>
          <View style={{ flex: 1 }}/>
        </TouchableWithoutFeedback>
      </View>
      <View style={styles.topMenu}>
        <TouchableOpacity style={styles.flipButton} onPress={this.toggleFacing}>
          <Text style={styles.flipText}> FLIP </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.flipButton} onPress={this.toggleFlash}>
          <Text style={styles.flipText}> FLASH: {this.state.flash} </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.flipButton} onPress={this.toggleWB}>
          <Text style={styles.flipText}> WB: {this.state.whiteBalance} </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.flipButton} onPress={this.toggle('canDetectFaces')}>
          <Text style={styles.flipText}>
            {!canDetectFaces ? 'Detect Faces' : 'Detecting Faces'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.flipButton} onPress={this.toggle('canDetectText')}>
          <Text style={styles.flipText}>
            {!canDetectText ? 'Detect Text' : 'Detecting Text'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.flipButton} onPress={this.toggle('canDetectBarcode')}>
          <Text style={styles.flipText}>
            {!canDetectBarcode ? 'Detect Barcode' : 'Detecting Barcode'}
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        {
          this.state.autoFocus === 'on' ? null : <Slider
            style={{ width: 150, alignSelf: 'flex-end' }}
            onValueChange={this.setFocusDepth}
            step={0.1}
            disabled={this.state.autoFocus === 'on'}
          />
        }
        {this.state.zoom !== 0 && (
          <Text style={[styles.flipText, styles.zoomText]}>Zoom: {this.state.zoom}</Text>
        )}
        <View
          style={{
            flexDirection: 'row',
            alignSelf: 'flex-end',
          }}
        >
          {/*缩放*/}
          {/*<TouchableOpacity*/}
          {/*style={[styles.flipButton, { flex: 0.1, alignSelf: 'flex-end' }]}*/}
          {/*onPress={this.zoomIn}*/}
          {/*>*/}
          {/*<Text style={styles.flipText}> + </Text>*/}
          {/*</TouchableOpacity>*/}
          {/*<TouchableOpacity*/}
          {/*style={[styles.flipButton, { flex: 0.1, alignSelf: 'flex-end' }]}*/}
          {/*onPress={this.zoomOut}*/}
          {/*>*/}
          {/*<Text style={styles.flipText}> - </Text>*/}
          {/*</TouchableOpacity>*/}

          {/*自动对焦*/}
          {/*<TouchableOpacity*/}
          {/*style={[styles.flipButton, { flex: 0.25, alignSelf: 'flex-end' }]}*/}
          {/*onPress={this.toggleFocus}*/}
          {/*>*/}
          {/*<Text style={styles.flipText}> AF : {this.state.autoFocus} </Text>*/}
          {/*</TouchableOpacity>*/}
          <TouchableOpacity
            style={[
              styles.flipButton,
              {
                flex: 0.3,
                backgroundColor: this.state.isRecording ? 'white' : 'darkred',
              },
            ]}
            onPress={this.state.isRecording ? () => {
            } : this.takeVideo}
          >
            <Text style={styles.flipText}>
              {this.state.isRecording ? '☕' : 'REC'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.flipButton, styles.picButton, { flex: 0.3 }]}
            onPress={this.takePicture}
          >
            <Text style={styles.flipText}> SNAP </Text>
          </TouchableOpacity>
        </View>
      </View>
      {!!canDetectFaces && this.renderFaces()}
      {!!canDetectFaces && this.renderLandmarks()}
      {!!canDetectText && this.renderTextBlocks()}
      {!!canDetectBarcode && this.renderBarcodes()}
    </SafeAreaView>
  }

  renderCamera() {
    const { canDetectFaces, canDetectText, canDetectBarcode } = this.state;
    return (
      <RNCamera
        ref={ref => {
          this.camera = ref;
        }}
        style={{ position: 'absolute', top: 120, right: 0, bottom: 100, left: 0 }}
        type={this.state.type}
        flashMode={this.state.flash}
        autoFocus={this.state.autoFocus}
        autoFocusPointOfInterest={this.state.autoFocusPoint.normalized}
        zoom={this.state.zoom}
        whiteBalance={this.state.whiteBalance}
        ratio={this.state.ratio}
        focusDepth={this.state.depth}
        permissionDialogTitle={'Permission to use camera'}
        permissionDialogMessage={'We need your permission to use your camera phone'}
        faceDetectionLandmarks={
          RNCamera.Constants.FaceDetection.Landmarks
            ? RNCamera.Constants.FaceDetection.Landmarks.all
            : undefined
        }
        onFacesDetected={canDetectFaces ? this.facesDetected : null}
        onTextRecognized={canDetectText ? this.textRecognized : null}
        onGoogleVisionBarcodesDetected={canDetectBarcode ? this.barcodeRecognized : null}
      />
    );
  }

  render() {
    const clientWidth = Dimensions.get('window').width;
    const { width, height } = this.state.photoData || {};
    return <View style={styles.container}>
      {this.renderCamera()}
      {this.renderPanel()}
      {/* 预览 */}
      {
        this.state.photoData && false ?
          <View>
            <Image
              style={{ width: clientWidth, height: clientWidth / width * height }}
              source={this.state.photoData}
            />
          </View> : null
      }
    </View>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: '#000',
  },
  flipButton: {
    // flex: 0.3,
    width: Dimensions.get('window').width * 0.3,
    height: 40,
    marginHorizontal: 2,
    marginBottom: 10,
    marginTop: 10,
    borderRadius: 8,
    borderColor: 'white',
    borderWidth: 1,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  topMenu: {
    height: 144,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  autoFocusBox: {
    position: 'absolute',
    height: 64,
    width: 64,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'white',
    opacity: 0.4,
  },
  flipText: {
    color: 'white',
    fontSize: 15,
  },
  zoomText: {
    position: 'absolute',
    bottom: 70,
    zIndex: 2,
    left: 2,
  },
  picButton: {
    backgroundColor: 'darkseagreen',
  },
  facesContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    top: 0,
  },
  face: {
    padding: 10,
    borderWidth: 2,
    borderRadius: 2,
    position: 'absolute',
    borderColor: '#FFD700',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  landmark: {
    width: landmarkSize,
    height: landmarkSize,
    position: 'absolute',
    backgroundColor: 'red',
  },
  faceText: {
    color: '#FFD700',
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10,
    backgroundColor: 'transparent',
  },
  text: {
    padding: 10,
    borderWidth: 2,
    borderRadius: 2,
    position: 'absolute',
    borderColor: '#F00',
    justifyContent: 'center',
  },
  textBlock: {
    color: '#F00',
    position: 'absolute',
    textAlign: 'center',
    backgroundColor: 'transparent',
  },
});
