import { ToastAndroid } from "react-native";

_myBackendErrorCB = (err) => {
    ToastAndroid.show("Backend Error" + err, ToastAndroid.SHORT);
}

export function getDoctorList(callBack){
    fetch('http://192.168.231.37:3002/doctor_info', {
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
        Mob_number:9876865678,
        Pwd:"infinityfault"
    }
    fetch('http://192.168.231.37:3002/login_details', {
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
export function makeRegister(userName, password, callBack){
    callBack(true);
    // console.log('https://myspace.innominds.com/loginapi/login?username='+ userName +'&password=' + password + '&grant_type=password');
    // fetch('https://myspace.innominds.com/loginapi/login?username='+ userName +'&password=' + password + '&grant_type=password', {
    //     method: 'GET',
    //     headers: {
    //         'Accept': 'application/json',
    //         'Content-Type': 'application/json',
    //     }
    // })
    // .then((response) => response.json())
    // .then((responseJson) => {
    //     //Todo, need to validate the response
    //     console.log(responseJson);
    //     callBack(responseJson);
    // })
    // .catch((error) => {
    //     console.error(error);
    // })
}