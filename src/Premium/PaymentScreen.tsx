// import { initStripe } from '@stripe/stripe-react-native';
// import React, { useEffect, useState } from 'react';
// import { ActivityIndicator, ScrollView, StyleSheet } from 'react-native';
// import { colors } from './colors';
 

// interface Props {
//   paymentMethod?: string;
//   onInit?(): void;
// }

// const PaymentScreen: React.FC<Props> = ({
//   paymentMethod,
//   children,
//   onInit,
// }) => {
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function initialize() {
//        const publishableKey = "pk_test_51JLIgJIye5yUOXF9iEurweNwsBKsfII44F94iorJ1P77jCdS8zZzv0NcUV4oMEE6QFPa5Wn78SeUylAuQuBlfdwe00q6GFqm7W"
//       if (publishableKey) {
//         await initStripe({
//           publishableKey,
//           merchantIdentifier: 'merchant.com.stripe.react.native',
//           urlScheme: 'stripe-example',
//           setReturnUrlSchemeOnAndroid: true,
//         });
//         setLoading(false);
//         onInit?.();
//       }
//     }
//     initialize();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   return loading ? (
//     <ActivityIndicator size="large" style={StyleSheet.absoluteFill} />
//   ) : (
//     <ScrollView
//       accessibilityLabel="payment-screen"
//       style={styles.container}
//       keyboardShouldPersistTaps="always"
//     >
//       {children}
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: colors.white,
//     paddingTop: 20,
//     paddingHorizontal: 16,
//   },
// });

// export default PaymentScreen;