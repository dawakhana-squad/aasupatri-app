import React from "react";
import { createStackNavigator, createAppContainer} from "react-navigation";
import { ThemeContext,getTheme, COLOR} from "react-native-material-ui";

// import ListingPage from "./pages/listing";
// import DetailsPage from "./pages/details";
import SplashPage from "./pages/Splash";
import Register from './pages/Register';
import Landing from './pages/Landing';
import DoctorsList from './pages/DoctorsList';
import HospitalMap from './pages/HospitalMap';
import BloodBank from './pages/BloodBank';
import Diagnosis from './pages/Diagnosis';
import HospitalsList from './pages/HospitalsList';

const Asupathri = createStackNavigator({
  Home: {screen: SplashPage, navigationOptions: { header: null }},
  Register: {screen: Register, navigationOptions: { header: null }},
  Landing: {screen: Landing, navigationOptions: { header: null }},
  DoctorsList: {screen: DoctorsList, navigationOptions: { header: null }},
  HospitalMap: {screen: HospitalMap, navigationOptions: { header: null }},
  HospitalsList: {screen: HospitalsList, navigationOptions: { header: null }},
  BloodBank: {screen: BloodBank, navigationOptions: { header: null }},
  Diagnosis: {screen: Diagnosis, navigationOptions: { header: null }}
  // DetailsPage: {screen: DetailsPage, navigationOptions: { header: null }},
//  FeedbackPage: {screen: FeedbackPage, navigationOptions: { header: null }}
},{
  header:{ visible:false }
});

// const uiTheme = {
//   palette: {
//       primaryColor: "#f5a623"
//   },
//   toolbar: {
//       container: {
//           height: 50,
//       },
//   },
// };
const uiTheme = {
  palette: {
    primaryColor: "#0080d1",
  },
  toolbar: {
    container: {
      height: 50,
    },
  },
};

const AppContainer=createAppContainer(Asupathri);


export default class App extends React.Component {
  render() {
    return (
      <ThemeContext.Provider value={getTheme(uiTheme)}>
        <AppContainer/>
      </ThemeContext.Provider>
    );
  }
}

// export default createAppContainer(Asupathri);
