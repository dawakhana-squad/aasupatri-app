import React from 'react';
import { ScrollView, AppRegistry, View, Text, TextInput, StyleSheet, TouchableOpacity, Picker } from 'react-native';
import { makeRegister } from "./../services/backendConnection";
import DatePicker from 'react-native-datepicker'

const bloodGroupList = ['A+ve','A-ve','B+ve','B-ve','AB+ve','AB-ve','O+ve', 'O-ve',];
const genderList=['Male','Female','Others'];
export default class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: 'Loading application',
            color: '#f5a623',
            firstname: '',
            lastname: '',
            mobilenumber: '',
            password: '',
            date: null,
            bloodGroup:null,
            gender:null,
        }
        this.navigation = this.props.navigation;
    }

    _continueRegister = () => {
        message:'Successfully Registered'
        this.props.navigation.goBack();
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
            <ScrollView>
            <View style={[styles.container, backgroundStyler]}>
                <Text style={[styles.mainHeading, (this.state.showPinMode ? styles.pinMode : {})]}>
                    Asupathri
                </Text>
                <View style={[styles.logInInfoHolder]}>
                    <View style={[styles.logInInfoHolderTop]}>
                        <Text style={[styles.fieldLabel, getLabelHeight(this.state.firstname)]}>First Name</Text>
                        <TextInput
                            placeholder="First Name"
                            style={[styles.inputTextStyle, getInputHeight(this.state.firstname)]}
                            onChangeText={(firstname) => this.setState({ firstname })}
                            value={this.state.firstname}
                            underlineColorAndroid={'transparent'}
                            placeholderTextColor={"#000"}
                            keyboardType='default'
                        />
                    </View>
                    <View style={[styles.logInInfoHolderTop]}>
                        <Text style={[styles.fieldLabel, getLabelHeight(this.state.lastname)]}>Last Name</Text>
                        <TextInput
                            placeholder="Last Name"
                            style={[styles.inputTextStyle, getInputHeight(this.state.lastname)]}
                            onChangeText={(lastname) => this.setState({ lastname })}
                            value={this.state.lastname}
                            underlineColorAndroid={'transparent'}
                            placeholderTextColor={"#000"}
                            keyboardType='default'
                        />
                    </View>
                    <View style={[styles.logInInfoHolderTop]}>
                        <Text style={[styles.fieldLabel, {height: 15}]}>Gender</Text>
                        <Picker
                            placeholder="Choose"
                            selectedValue={this.state.gender}
                            onValueChange={(itemValue) =>
                                this.setState({ gender:itemValue })
                            }>
                            {
                                genderList.map((type)=>{
                                    return(
                                        <Picker.Item label={type} value={type} />
                                    )
                                })
                            }
                        </Picker>
                    </View>
                    <View style={[styles.logInInfoHolderTop]}>
                        <Text style={[styles.fieldLabel, getLabelHeight(this.state.mobilenumber)]}>Mobile Number</Text>
                        <TextInput
                            placeholder="Mobile Number"
                            style={[styles.inputTextStyle, getInputHeight(this.state.mobilenumber)]}
                            onChangeText={(mobilenumber) => this.setState({ mobilenumber })}
                            value={this.state.mobilenumber}
                            underlineColorAndroid={'transparent'}
                            placeholderTextColor={"#000"}
                            keyboardType='numeric'
                        />
                    </View>
                    <View style={[styles.logInInfoHolderTop]}>
                        <Text style={[styles.fieldLabel, getLabelHeight(this.state.password)]}>Password</Text>
                        <TextInput
                            placeholder="Password"
                            secureTextEntry={true}
                            style={[styles.inputTextStyle, getInputHeight(this.state.password)]}
                            onChangeText={(password) => this.setState({ password })}
                            value={this.state.password}
                            underlineColorAndroid={'transparent'}
                            placeholderTextColor={"#000"}
                        />
                    </View>
                    <View style={[styles.logInInfoHolderTop]}>
                        <Text style={[styles.fieldLabel, { height: 15 }]}>Date of Birth</Text>
                        <DatePicker
                            style={{width:'100%' }}
                            date={this.state.date}
                            mode="date"
                            format="YYYY-MM-DD"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{
                                dateIcon: {
                                    position: 'absolute',
                                    left: 0,
                                    top: 0,
                                    marginLeft: 0
                                },
                                dateInput: {
                                    marginLeft: 36
                                }
                                // ... You can check the source to find the other keys.
                            }}
                            onDateChange={(date) => { this.setState({ date: date }) }}
                        />
                    </View>
                    <View style={[styles.logInInfoHolderTop]}>
                        <Text style={[styles.fieldLabel, {height: 15}]}>Blood Group</Text>
                        <Picker
                            // placeholder="Choose"
                            selectedValue={this.state.bloodGroup}
                            onValueChange={(itemValue) =>
                                this.setState({ bloodGroup: itemValue })
                            }>
                            {
                                bloodGroupList.map((type)=>{
                                    return(
                                        <Picker.Item label={type} value={type} />
                                    )
                                })
                            }
                        </Picker>
                    </View>
                    <View style={styles.button}>
                        <TouchableOpacity
                            //disabled={!this.state.userid || !this.state.firstname||!this.state.lastname || !this.state.mobilenumber|| !this.state.password }
                            style={styles.submit}
                            onPress={this._continueRegister}
                            //onPress={() => this.props.navigation.goBack()}
                            //onPress={this._goBackToSplash}
                            underlayColor='#fff'>
                            <Text style={[styles.submitText]}>Register</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    mainHeading: {
        paddingTop: 40,
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
        backgroundColor: '#fff',
        marginBottom: 10
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
    submit: {
        marginTop: 15,
        backgroundColor: '#e84925',
        borderRadius: 10,
        borderWidth: 0,
        width: "100%",
        height: 50,
        paddingTop: 14,
    },
    submitText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 16,
    },
    button:{
            marginBottom:25,
    },
    yellowColor: {
        backgroundColor: '#f5a623',
    }
});
AppRegistry.registerComponent('Register', () => Register);