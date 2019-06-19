import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Alert,
  Dimensions,
  ActivityIndicator
} from 'react-native'

import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Database from '../utils/Database.js'
import { FormLabel, FormInput, Icon} from 'react-native-elements'
import RNFS from 'react-native-fs'
import ActionButton from 'react-native-action-button';
import ImagePicker from 'react-native-image-crop-picker';
import Camera from 'react-native-image-picker';
import VideoPlayer from 'react-native-video-controls'
import Utils from '../utils/Utils'
import ImageCarousel from '../components/ImageCarousel'

export default class CreateIncident extends Component {

    constructor(props) {
        super(props)
        this.db = Database.getConnection()
        this.state = this.getInitialState();
    }

    getInitialState = () => {
        const initialState = {
          loading:Utils.stopLoading(),
          loggedUser:"57328",
          incidentRef:"",
          incidentText: "",
          incidentCorrectiveAction:"",
          attachmentFiles: []
        };
        return initialState;
    }


    createIncident = () => {
        this.setState({
          loading:Utils.startLoading(),
          loggedUser:'57328'
        })

        let latitude = null
        let longitude = null

        let localDbData = {}

        navigator.geolocation.getCurrentPosition((data) => {
          latitude = data.coords.latitude
          longitude = data.coords.longitude

          localDbData = {
            reportedBy:this.state.loggedUser,
            latitude:latitude,
            longitude:longitude,
            incident_ref:this.state.incidentRef,
            incident_text:this.state.incidentText,
            incident_corrective_action:this.state.incidentCorrectiveAction,
            status:'CREATED',
            loggedDate: Date.now()
          }

          let ofbizData = {
            serviceName: "CreateUpdateIncident",
            correctiveAction: localDbData.incident_corrective_action,
            incidentDetails: localDbData.incident_text,
            referenceId: localDbData.incident_ref,
            date: localDbData.loggedDate,
            reportedBy:localDbData.reportedBy,
            location: `${localDbData.latitude} ${localDbData.longitude}`,
            attachmentFiles: this.state.attachmentFiles,
            attachmentBase64: true
          }

          Utils.sendToOfbiz(ofbizData).then((data) => {
            Alert.alert(
              '',
              `Incident created with an Id : ${data.incidentId}`,
              [
                {text: 'OK', onPress: () => {
                    localDbData.status = 'UPLOADED'
                    this._storeIncidentLocally(this.state.selectedImages,localDbData).then((data) => {
                        this.setState({
                            loading:Utils.stopLoading()
                        })
                        this.props.navigation.pop()
                    })
                  }
                }
              ],
              { cancelable: false }
            )
          }).catch((err) => {
            console.log('incident was not synced to ofbiz due to ', err)
            this._storeIncidentLocally(this.state.selectedImages,localDbData).then((data) => {
              this.setState({
                loading:Utils.stopLoading()
              })
              this.props.navigation.pop()
            })
          })

        }, (data) => {
            console.log('location grabbing error', data)
        });


    }

    _storeIncidentLocally(imagesData,data) {
        return new Promise((resolve) => {
          let preparedStatement = Utils.prepareInsertSQLStatement(data, "Incidents")
          this.db.transaction((tx) => {
            tx.executeSql(preparedStatement,  Object.values(data), (tx,results) => {
              if (imagesData) {
                imagesData.map((img) => {
                  tx.executeSql('INSERT INTO IncidentContent (image_path, mediaType, incident_id) VALUES (?,?,?);', [img.path,this.state.mediaType, results.insertId])
                })
              }
              resolve(results.insertId)
            });
          });
        })
    }

    selectFromLibrary = (media) => {
        ImagePicker.openPicker({
            multiple: media == 'photo' ? true : false,
            mediaType:media
        }).then(images => {
            if (media == 'photo') {
              for (let i of images) {
                i['image_path'] = i.path
              }
            }
            this.setState({
                'selectedImages':media == 'photo' ? images : [images],
                'mediaType':media
            });

            this.convertImagesIntoBase64()
        });
    }

    useCamera = (media) => {
        Camera.launchCamera({mediaType:media}, (response)  => {
            if (!response.didCancel) {
                this.setState({
                    mediaType: media,
                    selectedImages: media === 'photo' ? [{image_path:response.uri}] : [{image_path:response.path}]
                });
                this.state.attachmentFiles.push(`data:image/png;base64,${response.data}`)
            }
        });
    };

    convertImagesIntoBase64 = () => {
      this.state.selectedImages.map((img) => {
        RNFS.readFile(img.path, 'base64')
          .then(res => {
            this.state.attachmentFiles.push(`data:image/png;base64,${res}`)
          })
      })
    };

    render() {
      const renderImage = () => {
        const width = Dimensions.get('window').width;
          if (this.state.selectedImages) {
            if (this.state.mediaType == 'photo') {
              return (
                  <ImageCarousel images={this.state.selectedImages}></ImageCarousel>
              )
            } else {
              return (
              <VideoPlayer
                  source={{uri:this.state.selectedImages[0].path}}
                  disableBack={true}
                  disableFullscreen={true}
                  paused={true}
                  muted={true}
              />
              )
            }
          } else {
              return <Text>No image selected</Text>
          }
      }

    return (
      <View style={styles.container} testID={'createIncidentScreen'}>
        <View style={styles.inputContainer}>
            <FormLabel>Incident details</FormLabel>
            <FormInput
              onChangeText={(text) => this.setState({incidentText:text})}
              textInputRef={input => { this.incidentTextInput = input }}
              testID={'incidentTextInput'}
            />
            <FormLabel>What did you do about it?</FormLabel>
            <FormInput
                  onChangeText={(text) => this.setState({incidentCorrectiveAction:text})}
                  textInputRef={input => { this.incidentCorrectiveActionInput = input }}

                  testID={'correctiveActionInput'}
            />
            <FormLabel>Reference</FormLabel>
            <FormInput
                onChangeText={(text) => this.setState({incidentRef:text})}
                textInputRef={input => { this.incidentRefInput = input }}
                testID={'incidentReferenceInput'}
            />
        </View>
        <View style={styles.imageContainer}>
             {renderImage()}
        </View>

        <ActionButton buttonColor="green" bgColor="rgba(52, 52, 52, 0.8)" offsetY={30}>
          <ActionButton.Item buttonColor='#1abc9c' title="Select Photos From Library" onPress={() => {
            this.selectFromLibrary('photo')
          }}>
            <Icon name="photo-library" style={styles.actionButtonIcon} />
          </ActionButton.Item>

          <ActionButton.Item buttonColor='#1abc9c' title="Select Video From Library" onPress={() => {
            this.selectFromLibrary('media')
          }}>
            <Icon name="video-library" style={styles.actionButtonIcon} />
          </ActionButton.Item>

          <ActionButton.Item buttonColor='#1abc9c' title="Take Photo" onPress={() => {
            this.useCamera('photo')
          }}>
            <Icon name="camera" style={styles.actionButtonIcon} />
          </ActionButton.Item>

          <ActionButton.Item buttonColor='#1abc9c' title="Record Video" onPress={() => {
            this.useCamera('video')
          }}>
            <Icon name="videocam" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='yellow' title="Create Incident" onPress={() => this.createIncident()}>
            <Icon name="warning" style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>
        {this.state.loading &&
          <View style={styles.loading}>
              <ActivityIndicator size="large" color="#0000ff" />
          </View>
        }
      </View>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'white'
  },
  inputContainer: {
    height: hp('40%')
  },
  imageContainer: {
    height: hp('35%'),
    justifyContent:'center',
    alignItems:'center',
    flexDirection:'column',
    margin:'5%'
  },
   loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'#F5FCFF88',
  }
});