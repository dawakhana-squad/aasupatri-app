import React, { Component } from 'react';
import { AppRegistry, StyleSheet, View, Text, NetInfo, TextInput, TouchableOpacity, Vibration, ToastAndroid } from 'react-native';
import { NavigationActions } from 'react-navigation';

import { initDataBase, getSavedPin, saveAppPin, saveLoginInfo } from "./../services/databaseConnection";
import { makeLogin } from "./../services/backendConnection";
import EnterPin from "./../components/EnterPin"
// import SVGImage from 'react-native-svg-image';

  
const DURATION = 500;


export default class SplashPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: 'Loading application',
            color: '#0080d1',
            Mob_number: '',
            Pwd: '',
            showLogin: false,
            //showRegister: true
        }
        this.navigation = this.props.navigation;
        this._verifyDataBase();
    }

    /**
     * Verifing basic data base setup
     */
    _verifyDataBase = () => {
        initDataBase(() => {
            /**
             * Getting the saved pin from db
             */
            getSavedPin((p)=>{
                if(p){
                    this.pin = p;
                    this.currentPinPross = "VERIFY_PIN";
                    this.setState({
                        showPinMode: true,
                        pinText: "Enter your App Pin"
                    });
                    //Show pin option
                } else {
                    //Show login page first time login
                    this._verifyNetworkConnectionAndProccedForLogin();
                }
            });
        });
    }

    /**
     * Verifies the network connection and procced for login
     */
    _verifyNetworkConnectionAndProccedForLogin = () => {
        NetInfo.isConnected.fetch().done(isConnected => {
            if (isConnected) {
                /**
                 * Network connection present
                 * Showing Login view
                 */
                NetInfo.removeEventListener('connectionChange',this._verifyNetworkConnectionAndProccedForLogin);
                this.setState({
                    showLogin: true,
                    color: '#0080d1'
                });
            } else {
                /**
                 * No network connection
                 * Showing error view.
                 */
                this.setState({
                    message: 'Data must be synced at least once. Please connect to the network.',
                    color: '#E64623'
                });
                /**
                 * Listaning for network changes
                 */
                NetInfo.addEventListener('connectionChange', this._verifyNetworkConnectionAndProccedForLogin);
            }
        });
    }

    _continueToRegister = () => {
        this.props.navigation.navigate('Register');

    }

    _continueToLandingPage=()=>{
        this.props.navigation.navigate('Landing');
    }
    _continueToHospitalsList=()=>{
        this.props.navigation.navigate('HospitalsList');
    }
    
    /**
     * When user clicks on login button
     * or
     * automatic update event flow
     */
    _continueLogin = () => {
        this.setState({
            message: 'Authenticating the user!!!',
            showLogin: false
        });
        /**
         * Making backend call to verify user
         */
        makeLogin(this.state.Mob_number, this.state.Pwd, (res)=>{
            console.log(res);
            if(res){
            
                /**
                 * Storing login info.
                 */
                saveLoginInfo(this.state.Mob_number, this.state.Pwd, ()=> {
                        //Need to show set pin view
                    this.currentPinPross = "NEW_PIN";
                    this.setState({
                        showPinMode: true,
                        pinText: "Enter your New App Pin"
                    });
                })
                
            } else {
                //user atentication failed
                this.setState({
                    message: 'Authentication failed with server!!!',
                    showLogin: false,
                    showPinMode: false,
                    color: '#E64623',
                    logInEroor: true
                });
            }
        });
    }



    /**
     * When user click on try again
     */
    _logInTry = () => {
        this.setState({
            showLogin: true,
            color: '#0080d1',
            logInEroor: false
        });
    }

    _showPinError = () => {
        Vibration.vibrate(DURATION);
        ToastAndroid.show("Incorrect Pin", ToastAndroid.LONG);
        this.clearPinFunction();
    }

    _pinEntered = (inputPin) =>{
        switch(this.currentPinPross){
            case "VERIFY_PIN":
                if(inputPin == this.pin){
                    this.setState({
                        showPinMode: false
                    });
                    this._continueToLandingPage();
                } else {
                    this._showPinError();
                }
                break;
            case "NEW_PIN":
                this.newPin = inputPin;
                this.clearPinFunction();
                this.setState({
                    pinText: "Reenter your App Pin"
                });
                this.currentPinPross = "RE_NEW_PIN"
                break;
            case "RE_NEW_PIN":
                if(this.newPin == inputPin){
                    //Saving pin in local db.
                    saveAppPin(inputPin, () => {
                        this.setState({
                            showPinMode: false
                        });
                        //need to get emp data.
                        this._continueToLandingPage();
                    });
                } else {
                    this._showPinError();
                }
                break;
        }
    }

    render() {
        let backgroundStyler = {
            backgroundColor: this.state.color
        }
        let getLabelHeight = (info) => {
            return ({ height: (info.length) ? 15 : 0 });
        }
    
        let getInputHeight = (info) => {
            return ({ height: (info.length) ? 35 : 50 });
        }
        return (
            <View style={[styles.container, backgroundStyler]}>
                <Text style={[styles.mainHeading, (this.state.showPinMode ? styles.pinMode : {})]}>
                    Asupathri
                </Text>
                {/* <SVGImage
                    style={{ width: 20, height: 20 }}
                    source={require('../images/LOGO.svg')} */}
                {/* /> */}

                {/* <Svg width="80" height="80">
                <Image 
                href={require('../images/LOGO_02.svg')}/>
                </Svg> */}
                <View style={[styles.logInInfoHolder]}>
                    {this.state.showLogin && <View style={[styles.logInInfoHolderTop]}>
                        <Text style={[styles.fieldLabel, getLabelHeight(this.state.Mob_number)]}>Mobile Number</Text>
                        <TextInput
                            placeholder="Mobile Number"
                            style={[styles.inputTextStyle, getInputHeight(this.state.Mob_number)]}
                            onChangeText={(Mob_number) => this.setState({ Mob_number })}
                            value={this.state.Mob_number}
                            underlineColorAndroid={'transparent'}
                            placeholderTextColor={"#000"}
                            keyboardType = 'numeric'
                        />
                        <View
                            style={styles.horizentalLine}
                        />
                        <Text style={[styles.fieldLabel, getLabelHeight(this.state.Pwd)]}>Password</Text>
                        <TextInput
                            placeholder="Password"
                            secureTextEntry={true}
                            style={[styles.inputTextStyle, getInputHeight(this.state.Pwd)]}
                            onChangeText={(Pwd) => this.setState({ Pwd })}
                            value={this.state.Pwd}
                            underlineColorAndroid={'transparent'}
                            placeholderTextColor={"#000"}
                        />
                    </View> }
                    {this.state.showLogin && 
                        <TouchableOpacity 
                            disabled={!this.state.Pwd || !this.state.Mob_number}
                            style={styles.submit}
                            onPress={this._continueLogin}
                            underlayColor='#fff'>
                            <Text style={[styles.submitText]}>Login</Text>
                        </TouchableOpacity>
                    } 
                        {this.state.showLogin && 
                        <TouchableOpacity 
                           // disabled={!this.state.Pwd || !this.state.Mob_number}
                            style={styles.submit}
                            onPress={this._continueToRegister}
                            underlayColor='#fff'>
                            <Text style={[styles.submitText]}>New User? Register</Text>
                        </TouchableOpacity>
                    }
                </View>
            
                {this.state.showPinMode && 
                    <View style={styles.pinHolder}>
                        <Text style={styles.pinText}>{this.state.pinText}</Text>
                        <EnterPin pinEntered={this._pinEntered} ref={(ref) => { ref && (this.clearPinFunction = ref._clearPin)}}/>
                    </View>
                }

                {!this.state.showLogin && !this.state.showPinMode && <Text style={styles.loadingInfo}>
                    {this.state.message}
                </Text>}
                {this.state.logInEroor && 
                    <View style={[styles.logInInfoHolder]}>
                        <TouchableOpacity 
                            disabled={!this.state.Pwd || !this.state.Mob_number}
                            style={[styles.submit, styles.yellowColor]}
                            onPress={this._logInTry}
                            underlayColor='#fff'>
                            <Text style={[styles.submitText]}>Try Again!</Text>
                        </TouchableOpacity>
                    </View>
                }
                <View>
                <TouchableOpacity 
                           // disabled={!this.state.Pwd || !this.state.Mob_number}
                            style={styles.submit}
                            onPress={this._continueToHospitalsList}
                            underlayColor='#fff'>
                            <Text style={[styles.submitText]}>Emergency Services!</Text>
                        </TouchableOpacity>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    mainHeading: {
        paddingTop: 120,
        fontSize: 40,
        color: '#fff'
    },
    pinMode: {
        paddingTop: 20,
    },
    pinHolder: {
        width: "100%",
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20
    },
    pinText: {
        color: "#fff",
        fontSize: 16,
        paddingBottom: 10
    },
    loadingInfo: {
        width: "100%",
        marginTop: 50,
        textAlign: 'center',
        fontSize: 20,
        paddingLeft: 50,
        paddingRight: 50,
        color: '#f2f2f2'
    },
    logInInfoHolder: {
        width: "100%",
        paddingLeft: 30,
        paddingRight: 30,
        paddingTop: 40
    },
    logInInfoHolderTop: {
        width: "100%",
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 10,
        backgroundColor: '#fff'
    },
    inputTextStyle: {
        paddingLeft: 20,
        paddingRight: 20,
        borderWidth: 0,
        width: "100%",
        color: "#000",
        fontSize: 14
    },
    horizentalLine: {
        borderBottomColor: '#000',
        borderBottomWidth: 1,
        width: '100%'
    },
    fieldLabel: {
        paddingLeft: 20,
        paddingRight: 20,
        fontSize: 10
    },
    submit:{
        marginTop:25,
        backgroundColor:'#e84925',
        borderRadius:10,
        borderWidth: 0,
        width: "100%",
        height: 50,
        paddingTop: 14
    },
    submitText:{
        color:'#fff',
        textAlign:'center',
        fontSize: 16
    },
    yellowColor: {
        backgroundColor: '#0080d1',
    }
});

AppRegistry.registerComponent('SplashPage', () => SplashPage);