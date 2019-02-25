import React from 'react';
import {AppRegistry,View, Text, TextInput, StyleSheet} from 'react-native';

 export default class Register extends React.Component{ 
    constructor(props) {
        super(props);
        this.state = {
            message: 'Loading application',
            color: '#f5a623',
            username: '',
            password: '',
            showLogin: false
        }
        this.navigation = this.props.navigation;

    }


     render(){  
        let backgroundStyler = {
            backgroundColor: this.state.color
        }
        let getLabelHeight = (info) => {
            return ({ height: (info.length) ? 15 : 0 });
        }
    
        let getInputHeight = (info) => {
            return ({ height: (info.length) ? 35 : 50 });
        }    
        return(
            // <View>
            //             <Text style={[styles.fieldLabel, getLabelHeight(this.state.username)]}>User ID</Text>
            //             <TextInput
            //                 placeholder="User ID"
            //                 style={[styles.inputTextStyle, getInputHeight(this.state.username)]}
            //                 onChangeText={(username) => this.setState({ username })}
            //                 value={this.state.username}
            //                 underlineColorAndroid={'transparent'}
            //                 placeholderTextColor={"#000"}
            //                 keyboardType = 'default'
            //             />
            //             <Text style={[styles.fieldLabel, getLabelHeight(this.state.username)]}>First Name</Text>
            //             <TextInput
            //                 placeholder="First Name"
            //                 style={[styles.inputTextStyle, getInputHeight(this.state.username)]}
            //                 onChangeText={(username) => this.setState({ username })}
            //                 value={this.state.username}
            //                 underlineColorAndroid={'transparent'}
            //                 placeholderTextColor={"#000"}
            //                 keyboardType = 'default'
            //             />
            //              <Text style={[styles.fieldLabel, getLabelHeight(this.state.username)]}>Last Name</Text>
            //             <TextInput
            //                 placeholder="Last Name"
            //                 style={[styles.inputTextStyle, getInputHeight(this.state.username)]}
            //                 onChangeText={(username) => this.setState({ username })}
            //                 value={this.state.username}
            //                 underlineColorAndroid={'transparent'}
            //                 placeholderTextColor={"#000"}
            //                 keyboardType = 'default'
            //             />
            //              <Text style={[styles.fieldLabel, getLabelHeight(this.state.username)]}>Mobile Number</Text>
            //             <TextInput
            //                 placeholder="Mobile Number"
            //                 style={[styles.inputTextStyle, getInputHeight(this.state.username)]}
            //                 onChangeText={(username) => this.setState({ username })}
            //                 value={this.state.username}
            //                 underlineColorAndroid={'transparent'}
            //                 placeholderTextColor={"#000"}
            //                 keyboardType = 'numeric'
            //             />
                        
            //             <Text style={[styles.fieldLabel, getLabelHeight(this.state.password)]}>Password</Text>
            //             <TextInput
            //                 placeholder="Password"
            //                 secureTextEntry={true}
            //                 style={[styles.inputTextStyle, getInputHeight(this.state.password)]}
            //                 onChangeText={(password) => this.setState({ password })}
            //                 value={this.state.password}
            //                 underlineColorAndroid={'transparent'}
            //                 placeholderTextColor={"#000"}
            //             />

                <View style={[styles.container, backgroundStyler]}>
                    <Text style={[styles.mainHeading, (this.state.showPinMode ? styles.pinMode : {})]}>
                        Asupathri
                    </Text>
                    <View style={[styles.logInInfoHolder]}>
                        {!this.state.showLogin && <View style={[styles.logInInfoHolderTop]}>
                        <Text style={[styles.fieldLabel, getLabelHeight(this.state.username)]}>User ID</Text>
                            <TextInput
                            placeholder="User ID"
                            style={[styles.inputTextStyle, getInputHeight(this.state.username)]}
                            onChangeText={(username) => this.setState({ username })}
                            value={this.state.username}
                            underlineColorAndroid={'transparent'}
                            placeholderTextColor={"#000"}
                            keyboardType = 'default'
                            />
                            <View
                            style={styles.horizentalLine}
                            />
                            <Text style={[styles.fieldLabel, getLabelHeight(this.state.username)]}>First Name</Text>
                            <TextInput
                            placeholder="First Name"
                            style={[styles.inputTextStyle, getInputHeight(this.state.username)]}
                            onChangeText={(username) => this.setState({ username })}
                            value={this.state.username}
                            underlineColorAndroid={'transparent'}
                            placeholderTextColor={"#000"}
                            keyboardType = 'default'
                            />
                            <View
                            style={styles.horizentalLine}
                            />
                            <Text style={[styles.fieldLabel, getLabelHeight(this.state.username)]}>Last Name</Text>
                            <TextInput
                            placeholder="Last Name"
                            style={[styles.inputTextStyle, getInputHeight(this.state.username)]}
                            onChangeText={(username) => this.setState({ username })}
                            value={this.state.username}
                            underlineColorAndroid={'transparent'}
                            placeholderTextColor={"#000"}
                            keyboardType = 'default'
                            /> 
                            <View
                            style={styles.horizentalLine}
                            />                           
                            <Text style={[styles.fieldLabel, getLabelHeight(this.state.username)]}>Mobile Number</Text>
                            <TextInput
                            placeholder="Mobile Number"
                            style={[styles.inputTextStyle, getInputHeight(this.state.username)]}
                            onChangeText={(username) => this.setState({ username })}
                            value={this.state.username}
                            underlineColorAndroid={'transparent'}
                            placeholderTextColor={"#000"}
                            keyboardType = 'numeric'
                            />
                            <View
                            style={styles.horizentalLine}
                            />
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
                        }
                    </View>
            </View>
        );
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
        marginTop:15,
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
        backgroundColor: '#f5a623',
    }
});
AppRegistry.registerComponent('Register', () => Register);