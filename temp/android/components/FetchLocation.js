import React, { Component } from 'react';
import { Button} from 'react-native';

const fetchLocation = props =>{ 
    return (
            <Button title="Current Location" onPress={props.onGetLocation}/>
    );
};
export {fetchLocation};