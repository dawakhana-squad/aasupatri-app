import { ToastAndroid } from "react-native";

var SQLite = require("react-native-sqlite-storage");
_mySqlErrorCB = (_mySqlErrorCB, locId) => {
    console.log(locId);
    ToastAndroid.show("Sql Error" + err, ToastAndroid.SHORT);
}

_buildInsertRows = (data) => {
    let returnString = "INSERT INTO employee (id, name, practice, designation, personalNumber, companyNumber, altNumber, personalEmail, companyEmail, skypeId, workLocation, workStationId) VALUES ";
    let order = [   "emp_code",
                    "employee_name",
                    "practice",
                    "designation",
                    "personal_number",
                    "work_phone_no",
                    "alternate_mobile",
                    "personal_email",
                    "company_email",
                    "skype_id",
                    "working_location",
                    "work_station_num"
                ];
    for (let i = 275, iLen = data.length - 1; i <= iLen; i++) {
        returnString = returnString + "("
        for (var j = 0, jLen = order.length - 1; j <= jLen; j++) {
            returnString = returnString + (data[i][order[j]] ? ("'" + (data[i][order[j]]) + "'") : "null") + (j !== jLen ? "," : "")
        }
        returnString = returnString + ")"
        if (i !== iLen) {
            returnString = returnString + ","
        }
    }
    return returnString;
}

_buildResults = (rows) => {
    let results = [];
    for (let i = 0, iLen = rows.length; i < iLen; i++) {
        results.push(rows.item(i));
    }
    return results;
}

_openDataBase = () => {
    /**
     * Opening table or create if not present
     */
    let db = SQLite.openDatabase({ name: "hospital.db", location: "default" }, () => { }, (err) => { _mySqlErrorCB(err, 0)});
    return db;
}

_closeDataBase = (dbConnection) => {
    //dbConnection.close(() => { }, (err) => { _mySqlErrorCB(err, 1)})
}

export function initDataBase(sCallBack) {
    let dbConnection = this._openDataBase();
    if (dbConnection) {
        dbConnection.transaction((tx) => {
            /**
             * Create table for pin
             */
            tx.executeSql("CREATE TABLE IF NOT EXISTS appAuth (pin)", [],
            () => { }, (err) => { _mySqlErrorCB(err, 5)});

             /**
             * Creating recent table if not present
             */
            tx.executeSql("CREATE TABLE IF NOT EXISTS recentSearch (searchString)", [],
                () => { }, (err) => { _mySqlErrorCB(err, 3) });

            /**
             * Create table for pin
             */
            tx.executeSql("CREATE TABLE IF NOT EXISTS loginInfo (userName, password)", [],
            () => { }, (err) => { _mySqlErrorCB(err, 6)});
        }, () => {
            this._closeDataBase(dbConnection);
        },
            () => {
                this._closeDataBase(dbConnection);
                sCallBack();
            });
    }
}

export function getSavedPin(sCallBack) {
    let dbConnection = this._openDataBase(), result = true;
    if (dbConnection) {
        dbConnection.transaction((tx) => {
            /**
             * getting emp list
             */
            tx.executeSql("SELECT * from appAuth", [],
                (tx, results) => {
                    data = this._buildResults(results.rows);
                    result = (data.length)? data[0].pin : 0;
                }, (err) => { _mySqlErrorCB(err, 7)});
        }, () => {
            this._closeDataBase(dbConnection);
        },
        () => {
            this._closeDataBase(dbConnection);
            sCallBack(result);
        });
    }
}

export function saveAppPin(pin, sCallBack){
    let dbConnection = this._openDataBase();
    if (dbConnection) {
        dbConnection.transaction((tx) => {
            /**
             * Updating last updates
             */
            tx.executeSql("INSERT INTO appAuth(pin) VALUES (?)", [pin],
            () => { }, (err) => { _mySqlErrorCB(err, 8)});
        }, () => {
            this._closeDataBase(dbConnection);
        },
        () => {
            this._closeDataBase(dbConnection);
            sCallBack();
        });
    }
}

export function getSavedLoginInfo(sCallBack) {
    let dbConnection = this._openDataBase(), result = true;
    if (dbConnection) {
        dbConnection.transaction((tx) => {
            /**
             * getting emp list
             */
            tx.executeSql("SELECT * from loginInfo", [],
                (tx, results) => {
                    data = this._buildResults(results.rows);
                    result = (data.length)? data[0] : {};
                }, (err) => { _mySqlErrorCB(err, 9)});
        }, () => {
            this._closeDataBase(dbConnection);
        },
        () => {
            this._closeDataBase(dbConnection);
            sCallBack(result);
        });
    }
}

export function saveLoginInfo(userName, password, sCallBack){
    let dbConnection = this._openDataBase();
    if (dbConnection) {
        dbConnection.transaction((tx) => {
            /**
             * deleting current info
             */
            tx.executeSql("DELETE from loginInfo", [],
            () => { }, (err) => { _mySqlErrorCB(err, 10)});
            /**
             * Updating last updates
             */
            tx.executeSql("INSERT INTO loginInfo(userName, password) VALUES (?, ?)", [userName, password],
            () => { }, (err) => { _mySqlErrorCB(err, 11)});
        }, () => {
            this._closeDataBase(dbConnection);
        },
        () => {
            this._closeDataBase(dbConnection);
            sCallBack();
        });
    }
}


export function isDataNeedToSync(sCallBack){
    let dbConnection = this._openDataBase(), result = true;
    if (dbConnection) {
        dbConnection.transaction((tx) => {
            /**
             * getting emp list
             */
            tx.executeSql("SELECT * from lastUpdated", [],
                (tx, results) => {
                    data = this._buildResults(results.rows);
                    var x = new Date().getTime();
                    console.log((x - data[0].dateString) > (60000 * 24 * 7))
                    if(data.length && ((x - data[0].dateString) < (60000 * 24 * 7))){
                        result = false
                    }
                }, (err) => { _mySqlErrorCB(err, 6)});
        }, () => {
            this._closeDataBase(dbConnection);
        },
        () => {
            this._closeDataBase(dbConnection);
            sCallBack(result);
        });
    }
}

export function retrieveEmployeeList(sCallBack) {
    let dbConnection = this._openDataBase(), result;
    if (dbConnection) {
        dbConnection.transaction((tx) => {
            /**
             * getting emp list
             */
            tx.executeSql("SELECT * from employee", [],
                (tx, results) => {
                    result = this._buildResults(results.rows);
                }, (err) => { _mySqlErrorCB(err, 17)});
        }, () => {
            this._closeDataBase(dbConnection);
        },
        () => {
            this._closeDataBase(dbConnection);
            sCallBack(result);
        });
    }
}
export function isDataAvabile(sCallBack){
    let dbConnection = this._openDataBase(), result;
    if (dbConnection) {
        dbConnection.transaction((tx) => {
            /**
             * getting emp list
             */
            tx.executeSql("SELECT COUNT(*) from employee", [],
                (tx, results) => {
                    result = results.rows.item(0)["COUNT(*)"] > 0 ? true: false;
                }, (err) => { _mySqlErrorCB(err, 18)});
        }, () => {
            this._closeDataBase(dbConnection);
        },
        () => {
            this._closeDataBase(dbConnection);
            sCallBack(result);
        });
    }
}
export function updateSearchInfo(insertString, deleteString) {
    let dbConnection = this._openDataBase();
    if (dbConnection) {
        dbConnection.transaction((tx) => {
            if (deleteString) {
                /**
                 * getting emp list
                 */
                tx.executeSql("DELETE from recentSearch WHERE searchString='" + deleteString + "'", [],
                    () => { }, (err) => { _mySqlErrorCB(err, 19) });
            }
            if (insertString) {
                /**
                 * getting emp list
                 */
                tx.executeSql("INSERT INTO recentSearch (searchString) VALUES ('" + insertString + "')", [],
                    () => { }, (err) => { _mySqlErrorCB(err, 20) });
            }
        }, () => {
            this._closeDataBase(dbConnection);
        },
            () => {
                this._closeDataBase(dbConnection);
            });
    }
}

export function retrieveSearchList(sCallBack) {
    let dbConnection = this._openDataBase(), result;
    if (dbConnection) {
        dbConnection.transaction((tx) => {
            /**
             * getting emp list
             */
            tx.executeSql("SELECT * from recentSearch", [],
                (tx, results) => {
                    result = this._buildResults(results.rows);
                }, (err) => { _mySqlErrorCB(err, 21) });
        }, () => {
            this._closeDataBase(dbConnection);
        },
            () => {
                this._closeDataBase(dbConnection);
                sCallBack(result);
            });
    }
}