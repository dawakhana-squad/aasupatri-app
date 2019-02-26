import React, { Component } from 'react';
import { View, StyleSheet, TextInput, Text, TouchableOpacity, AppRegistry } from 'react-native';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import { Toolbar, ActionButton } from 'react-native-material-ui';
import { NavigationActions } from 'react-navigation';
import * as firebase from 'firebase';

export default class FeedbackPage extends Component {
    state = {
        feedbackText: "",
        feedbackExpression: ""
    }
    _goBack = () => {
        const backAction = NavigationActions.back({});
        this.props.navigation.dispatch(backAction);
    }
    _submitFeedback = () => {
        const ref = firebase.database().ref('feedback');
        if (ref) {
            ref.push({
                time: firebase.database.ServerValue.TIMESTAMP,
                expression: this.state.feedbackExpression,
                comment: this.state.feedbackText
            });
            this.setState({ feedbackRecorded: true });
        };

    }

    _getLabelHeight = (info) => {
        return ({ height: (info.length) ? 20 : 0 });
    }

    _getInputHeight = (info) => {
        return ({ height: (info.length) ? 230 : 250 });
    }
    render() {
        return (
            <View>
                <Toolbar
                    centerElement="Feedback"
                    leftElement="arrow-back"
                    onLeftElementPress={this._goBack}
                    ref="toolbar"
                />
                {!this.state.feedbackRecorded ? <View>
                    <View style={[styles.actionContainer, styles.rowStyle]}>
                        <View style={styles.halfView}>
                            <TouchableOpacity onPress={() => { this.setState({ feedbackExpression: "Happy" }) }} style={styles.btContainer}>
                                <Text style={[styles.iconStyle, styles.highlightGreen, ((this.state.feedbackExpression === "Happy") ? styles.selectedIcon : {})]}>
                                    <FontAwesome>{(this.state.feedbackExpression === "Happy") ? Icons.thumbsUp : Icons.thumbsOUp}</FontAwesome>
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.halfView}>
                            <TouchableOpacity onPress={() => { this.setState({ feedbackExpression: "UnHappy" }) }} style={styles.btContainer}>
                                <Text style={[styles.iconStyle, styles.highlightRed, ((this.state.feedbackExpression === "UnHappy") ? styles.selectedIcon : {})]}>
                                    <FontAwesome>{(this.state.feedbackExpression === "UnHappy") ? Icons.thumbsDown : Icons.thumbsODown}</FontAwesome>
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.actionContainer}>
                        <Text style={[styles.fieldLabel, this._getLabelHeight(this.state.feedbackText)]}>Comments</Text>
                        <TextInput
                            style={[styles.textArea, this._getInputHeight(this.state.feedbackText)]}
                            multiline={true}
                            editable={true}
                            underlineColorAndroid={'transparent'}
                            placeholder="Comments"
                            placeholderTextColor={"#000"}
                            onChangeText={(feedbackText) => this.setState({ feedbackText: feedbackText })}
                            value={this.state.feedbackText}
                        />
                    </View>
                    <View style={styles.actionContainer}>
                        <TouchableOpacity
                            disabled={!this.state.feedbackText || !this.state.feedbackExpression}
                            style={[styles.submit]}
                            onPress={this._submitFeedback}
                            underlayColor='#fff'>
                            <Text style={[styles.submitText]}>Submit</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                    : <View>
                        <Text style={styles.conformationMessageHead}>Thank you for your feedback.</Text>
                        <Text style={styles.conformationMessage}>Your feedback is important to us and we will endeavour to respond to your feedback.</Text>
                    </View>}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    rowStyle: {
        flexDirection: 'row'
    },
    iconStyle: {
        fontSize: 40
    },
    selectedIcon: {
        fontSize: 60
    },
    textArea: {
        fontSize: 13,
        height: 250,
        textAlignVertical: 'top',
        borderWidth: 2,
        borderColor: '#f5a623',
        borderRadius: 10,
        padding: 10
    },
    actionContainer: {
        marginTop: 20,
        paddingLeft: 20,
        paddingRight: 20,
        width: "100%"
    },
    halfView: {
        flex: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    btContainer: {
        height: 100,
        width: 100,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: "#f5a623"
    },
    highlightGreen: {
        color: "#0d730d"
    },
    highlightRed: {
        color: "#c23d3d"
    },
    submit: {
        backgroundColor: '#e84925',
        borderRadius: 10,
        borderWidth: 0,
        width: "100%",
        height: 50,
        paddingTop: 14
    },
    submitText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 16
    },
    fieldLabel: {
        fontSize: 13,
        paddingLeft: 10
    },
    conformationMessageHead: {
        fontSize: 20,
        padding: 20,
        textAlign: 'center',
        marginTop: 40
    },
    conformationMessage: {
        fontSize: 15,
        padding: 20,
        textAlign: 'center',
        marginTop: 10
    }
});


const FeedbackPageRoute = NavigationActions.navigate({ routeName: 'FeedbackPage' });
export class FeedbackElement extends Component {
    constructor(props) {
        super(props)
        this.navigate = this.props.navigation.navigate;
    }
    _giveFeedback = () => {
        this.navigate('FeedbackPage');
    }
    render() {
        return (
            <ActionButton icon="feedback" onPress={this._giveFeedback} />
        )
    };
}
