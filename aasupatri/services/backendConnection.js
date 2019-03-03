import { ToastAndroid } from "react-native";

_myBackendErrorCB = (err) => {
    ToastAndroid.show("Backend Error" + err, ToastAndroid.SHORT);
}

export function getHospitalsList(callBack){
    fetch('http://192.168.0.7:3002/hospital_directory', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    })
    .then((response) => response.json())
    .then((responseJson) => {
        //Todo, need to validate the response
        if (responseJson.length === 0) {
            console.log('data not available');
        } else {
            console.log('hospital', responseJson);
            callBack(responseJson);
        }
        // callBack(responseJson.data);
    })
    .catch(_myBackendErrorCB);
}

export function getDoctorList(callBack){
    fetch('http://192.168.0.7:3002/doctor_info', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    })
    .then((response) => response.json())
    .then((responseJson) => {
        //Todo, need to validate the response
        if (responseJson.length === 0) {
            console.log('data not available');
        } else {
            console.log('doctor', responseJson);
            callBack(responseJson);
        }
        // callBack(responseJson.data);
    })
    .catch(_myBackendErrorCB);
}

export function getBloodBank(callBack){
    fetch('http://192.168.0.7:3002/blood_info', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    })
    .then((response) => response.json())
    .then((responseJson) => {
        //Todo, need to validate the response
        if (responseJson.length === 0) {
            console.log('data not available');
        } else {
            console.log('doctor', responseJson);
            callBack(responseJson);
        }
        // callBack(responseJson.data);
    })
    .catch(_myBackendErrorCB);
}

///loginapi/login?username=username&password=password&grant_type=password

export function makeLogin(userName, password, callBack){
    callBack(true);
    // 
    const data={
        Ph_No:userName,
        Pwd:password
    }
    fetch('http://192.168.0.7:3002/users_table', {
        method: 'POST',
        body: JSON.stringify(data),

        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    })
    .then((response) => response.json())
    .then((responseJson) => {
        //Todo, need to validate the response
        console.log(responseJson);
        callBack(responseJson.data);
    })
    .catch((error) => {
        console.error(error);
    })
}
export function makeRegister(fname, lname,mobilenumber,password,date,bloodgroup,gender, callBack){
    callBack(true);
    console.log(fname);
    const data={
        FName:fname,
        LName:lname,
        DOB:date,
        Sex:gender,
        Pwd:password,
        Ph_No:mobilenumber,
        Bloodtype:bloodgroup
    }

    fetch('http://192.168.0.7:3002/users_table', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    })
    .then((response) => response.json())
    .then((responseJson) => {
        //Todo, need to validate the response
        console.log(responseJson);
        callBack(responseJson.data);
    })
    .catch((error) => {
        console.error(error);
    })
}