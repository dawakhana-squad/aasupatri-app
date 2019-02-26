import { ToastAndroid } from "react-native";

_myBackendErrorCB = (err) => {
    ToastAndroid.show("Backend Error" + err, ToastAndroid.SHORT);
}

export function getEmployeesList(callBack){
    fetch('https://myspace.innominds.com/apiemployee/getallempdetails', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    })
    .then((response) => response.json())
    .then((responseJson) => {
        //Todo, need to validate the response
        console.log(responseJson);
        callBack(responseJson);
    })
    .catch(_myBackendErrorCB);
}

///loginapi/login?username=username&password=password&grant_type=password

export function makeLogin(userName, password, callBack){
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