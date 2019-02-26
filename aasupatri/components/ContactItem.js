import React, { Component } from 'react';
import { StyleSheet, Text, Image, View, TouchableOpacity } from 'react-native';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import Communications from 'react-native-communications';
class ContactItem extends Component {

    constructor(props) {
        super(props)
        this.navigate = this.props.navigation.navigate;
        this.empDetails = this.props.data;
        this.state ={
            status:false
        }
    }
    _clearSelection = () => {
        if(this.state.status){
            this.setState({
                status:false
            });
        }
    }
    _onSelectOfItem = () => {
        if(!this.state.status) {
            const { onItemSelect } = this.props;
            onItemSelect(this.empDetails);
        }
        this.setState({
            status:!this.state.status
        });
    }
    _makeCall= () => {
        if(this.empDetails.personalNumber){
            var SendIntentAndroid = require('react-native-send-intent');
            SendIntentAndroid.sendPhoneCall(this.empDetails.personalNumber);
        }
        this._onSelectOfItem();
    }
    _makeMessage= () => {
        if(this.empDetails.personalNumber){
            Communications.text(this.empDetails.personalNumber);
        }
        this._onSelectOfItem();
    }
    _makeEmail= () => {
        if(this.empDetails.companyEmail){
            Communications.email([this.empDetails.companyEmail],null,null,null,null);
        }
        this._onSelectOfItem();
    }
    _displayDetails = () => {
        this.navigate('DetailsPage', this.empDetails);
        this._onSelectOfItem();
    }
    render() {
        return (
            <View style={styles.itemContainer}>
                <TouchableOpacity style={styles.itemStyle} activeOpacity={1} onPress={this._onSelectOfItem}>
                    <View style={styles.imageCard}>
                        <Image
                        style={styles.imageStyle}
                        source={{uri: "https://myspace.innominds.com/public/Myspace_data/Photos/Photo_"+this.empDetails.id+".jpg"}}
                        />
                    </View>
                    <View style={styles.nameCard}>
                        <Text style={styles.mainName}>{this.empDetails.name}</Text>
                        <Text style={styles.designation}>{this.empDetails.designation}</Text>
                    </View>
                </TouchableOpacity>
                {this.state.status &&
                    <View style={styles.itemStyle}>
                        <TouchableOpacity style={styles.optionTile} onPress={this._makeCall}>
                            <Text style={[styles.iconStyle, styles.callIcon]}>
                                <FontAwesome>{Icons.phone}</FontAwesome>
                            </Text>
                            <Text style={styles.textUnderIcon}>
                                Call
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.optionTile} onPress={this._makeMessage}>
                            <Text style={[styles.iconStyle, styles.messageIcon]}>
                                <FontAwesome>{Icons.commentO}</FontAwesome>
                            </Text>
                            <Text style={styles.textUnderIcon}>
                                Message
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.optionTile} onPress={this._makeEmail}>
                            <Text style={[styles.iconStyle, styles.emailIcon]}>
                                <FontAwesome>{Icons.envelopeO}</FontAwesome>
                            </Text>
                            <Text style={styles.textUnderIcon}>
                                Email
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.optionTile} onPress={this._displayDetails}>
                            <Text style={[styles.iconStyle, styles.infoIcon]}>
                                <FontAwesome>{Icons.info}</FontAwesome>
                            </Text>
                            <Text style={styles.textUnderIcon}>
                                Details
                            </Text>
                        </TouchableOpacity>
                    </View>
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    itemContainer: {
        marginTop:15
    },
    itemStyle: {
        flexDirection: 'row'
    },
    imageCard: {
        flex: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    imageStyle: {
        width: 50, 
        height: 50,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: '#999999'
    },
    nameCard: {
        flex: 60,
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    mainName: {
        fontSize: 15
    },
    designation: {
        fontSize: 12        
    },
    optionTile: {
        flex: 25,
        alignItems: 'center',
        justifyContent: 'center',
        height: 52,
        backgroundColor: '#fafafa',
    },
    iconStyle: {
        fontSize: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop:5
    },
    textUnderIcon: {
        fontSize: 11,
        color: '#666666'
    },
    callIcon: {
        color: '#00bb00'
    },
    messageIcon:{
        color: '#ffac14'
    },
    emailIcon:{
        color: '#7575ff'
    },
    infoIcon:{
        color: '#8f8f8f'
    }
    
});

export default ContactItem;