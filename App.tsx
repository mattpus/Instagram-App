import {SafeAreaProvider} from 'react-native-safe-area-context';
import Navigation from './src/navigation';
import Amplify from 'aws-amplify';
import config from './src/aws-exports';
// import {withAuthenticator, AmplifyTheme} from 'aws-amplify-react-native';
// import colors from './src/theme/colors';
import AuthContextProvider from './src/contexts/AuthContext';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import {Linking} from 'react-native';
import Client from './src/apollo/Client';
import {MenuProvider} from 'react-native-popup-menu';
Amplify.configure(config);

const urlOpener = async (url: string, redirectUrl: string) => {
  await InAppBrowser.isAvailable();
  const response = await InAppBrowser.openAuth(url, redirectUrl, {
    showTitle: false,
    enableUrlBarHiding: true,
    enableDefaultShare: false,
    ephemeralWebSession: false,
  });

  if (response.type === 'success') {
    return Linking.openURL(response.url);
  }
};

Amplify.configure({
  ...config,
  oauth: {
    ...config.oauth,
    urlOpener,
  },
});

const App = () => {
  return (
    <SafeAreaProvider>
      <MenuProvider>
        <AuthContextProvider>
          <Client>
            <Navigation />
          </Client>
        </AuthContextProvider>
      </MenuProvider>
    </SafeAreaProvider>
  );
};

// const signUpConfig = {
//   hideAllDefaults: true,
//   signUpFields: [
//     {
//       label: 'Full name',
//       key: 'name',
//       required: true,
//       displayOrder: 1,
//       type: 'string',
//       placeholder: 'Full name',
//     },
//     {
//       label: 'Email',
//       key: 'email',
//       required: true,
//       displayOrder: 2,
//       type: 'string',
//       placeholder: 'Email',
//     },
//     {
//       label: 'Username',
//       key: 'username',
//       required: true,
//       displayOrder: 3,
//       type: 'string',
//       placeholder: 'Username/handle',
//     },
//     {
//       label: 'Password',
//       key: 'password',
//       required: true,
//       displayOrder: 4,
//       type: 'password',
//       placeholder: 'Password',
//     },
//   ],
// };

// const customTheme = {
//   ...AmplifyTheme,
//   button: {
//     ...AmplifyTheme.button,
//     backgroundColor: colors.primary,
//     borderRadius: 100,
//   },
//   buttonDisabled: {
//     ...AmplifyTheme.buttonDisabled,
//     backgroundColor: '#5c78ff',
//     borderRadius: 100,
//   },
//   sectionFooterLink: {
//     ...AmplifyTheme.sectionFooterLink,
//     color: colors.primary,
//   },
//   input: {
//     ...AmplifyTheme.input,
//     borderRadius: 20,
//   },
// };

export default App;
