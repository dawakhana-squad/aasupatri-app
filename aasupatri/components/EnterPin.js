import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import FontAwesome, { Icons } from 'react-native-fontawesome';


class EnterPin extends Component {
    constructor(props) {
        super(props)
        this.state ={
            pin:""
        }
    };

    _onTapOfNumber = (number) => {
        this.state.pin = this.state.pin + number;
        this.setState({
            pin : this.state.pin
        });
        if(this.state.pin.length == 4){
            this.props.pinEntered(this.state.pin);
        }
    }
    
    _onDeletePressed = () => {
        this.setState({
            pin : this.state.pin.substr(0, this.state.pin.length - 1)
        });
        
    }

    _clearPin = () => {
        this.setState({
            pin: ''
        });
    }

    render() {
        return (
            <View style={styles.pinHolder}>
                <View style={styles.renderingHolder}>
                    <View style={styles.pinEle}>
                        <View style={[styles.pinStyle, (this.state.pin.length >= 1)? styles.pinActive : {}]}>
                        </View>
                    </View>
                    <View style={styles.pinEle}>
                        <View style={[styles.pinStyle, (this.state.pin.length >= 2)? styles.pinActive : {}]}>
                        </View>
                    </View>
                    <View style={styles.pinEle}>
                        <View style={[styles.pinStyle, (this.state.pin.length >= 3)? styles.pinActive : {}]}>
                        </View>
                    </View>
                    <View style={styles.pinEle}>
                        <View style={[styles.pinStyle, (this.state.pin.length >= 4)? styles.pinActive : {}]}>
                        </View>
                    </View>
                </View>
                <View style={styles.keyBoardHolder}>
                    <View style={styles.keyHolder}>
                        <TouchableOpacity style={styles.key} onPress={()=>this._onTapOfNumber("1")}>
                            <Text style={styles.keyText}>1</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.keyHolder}>
                        <TouchableOpacity style={styles.key} onPress={()=>this._onTapOfNumber("2")}>
                            <Text style={styles.keyText}>2</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.keyHolder}>
                        <TouchableOpacity style={styles.key} onPress={()=>this._onTapOfNumber("3")}>
                            <Text style={styles.keyText}>3</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.keyBoardHolder}>
                    <View style={styles.keyHolder}>
                        <TouchableOpacity style={styles.key} onPress={()=>this._onTapOfNumber("4")}>
                            <Text style={styles.keyText}>4</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.keyHolder}>
                        <TouchableOpacity style={styles.key} onPress={()=>this._onTapOfNumber("5")}>
                            <Text style={styles.keyText}>5</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.keyHolder}>
                        <TouchableOpacity style={styles.key} onPress={()=>this._onTapOfNumber("6")}>
                            <Text style={styles.keyText}>6</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.keyBoardHolder}>
                    <View style={styles.keyHolder}>
                        <TouchableOpacity style={styles.key} onPress={()=>this._onTapOfNumber("7")}>
                            <Text style={styles.keyText}>7</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.keyHolder}>
                        <TouchableOpacity style={styles.key} onPress={()=>this._onTapOfNumber("8")}>
                            <Text style={styles.keyText}>8</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.keyHolder}>
                        <TouchableOpacity style={styles.key} onPress={()=>this._onTapOfNumber("9")}>
                            <Text style={styles.keyText}>9</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.keyBoardHolder}>
                    <View style={styles.keyHolder}>
                        <View style={styles.key}>
                            <Text style={styles.keyText}></Text>
                        </View>
                    </View>
                    <View style={styles.keyHolder}>
                        <TouchableOpacity style={styles.key} onPress={()=>this._onTapOfNumber("0")}>
                            <Text style={styles.keyText}>0</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.keyHolder}>
                        <TouchableOpacity style={styles.key} onPress={()=>this._onDeletePressed()}>
                            <Text style={[styles.keyText , {fontSize: 30, paddingTop: 9}]}>
                                <FontAwesome>{Icons.chevronLeft}</FontAwesome>
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    pinHolder: {
        width: "100%"
    },
    renderingHolder: {
        paddingTop: 20,
        paddingRight: 70,
        paddingLeft: 70,
        width: "100%",
        flexDirection: 'row',
        height: 40,
        marginBottom: 20
    },
    pinEle:  {
        flex: 25,
        alignItems: 'center',
        justifyContent: 'center'
    },
    pinStyle : {
        height: 26,
        width: 26,
        borderRadius :13,
        borderWidth: 2,
        borderColor: '#fff'
    },
    pinActive : {
        backgroundColor: '#fff'
    },
    keyBoardHolder: {
        marginTop: 10,
        width: "100%",
        flexDirection: 'row',
        paddingRight: 40,
        paddingLeft: 40,
    },
    keyHolder: {
        flex: 33.33,
        alignItems: 'center',
        justifyContent: 'center',
    },
    key: {
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    keyText: {
        fontSize: 40,
        color: "#fff",
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default EnterPin;