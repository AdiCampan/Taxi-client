
import { View, Text } from 'react-native';
import LoginScreen, { SocialButton } from "react-native-login-screen";

export default function Login() {
  return (
    <LoginScreen
      logoImageSource={require("./assets/TaxiMaroviDej.png")}
      onLoginPress={() => { }}
      onSignupPress={() => { }}
      onEmailChange={() => { }}
      onPasswordChange={() => { }}
    >
      <SocialButton
        text="Continue with Facebook"
        imageSource={require("./assets/TaxiMaroviDej.png")}
        onPress={() => { }}
      />
      <SocialButton
        text="Continue with Twitter"
        imageSource={require("./assets/TaxiMaroviDej.png")}
        onPress={() => { }}
      />
    </LoginScreen>
  );
}
