import { StripeProvider, usePaymentSheet } from "@stripe/stripe-react-native";
import React, { useEffect, useState } from "react";
import { Button, Image, Text, View, Alert, StyleSheet } from "react-native";
// import {MERCHANT_ID, API_URL} from './Constants';

const CheckOut = ({ goBack }) => {
  const [ready, setReady] = useState(false);
  const {
    initPaymentSheet,
    presentPaymentSheet,
    loading,
    resetPaymentSheetCustomer,
  } = usePaymentSheet();

  useEffect(() => {
 
    initialisePaymentSheet();
 
  }, []);

const initialisePaymentSheet = async () => {
    const { setupIntent, ephemeralKey, customer } = await fetchPaymentSheetParams();
    console.log("asdad", setupIntent);
    const { error } = await initPaymentSheet({
      appearance: {
        colors: {
          primary: "#e06c75",
          background: "#282c34",
          componentBackground: "#FFFFFF", //#abb2bf
          componentDivider: "#e5c07b",
          primaryText: "#61afef",  //#61afef
          secondaryText: "#c678dd",
          componentText: "#282c34",
          icon: "#e06c75",
          placeholderText: "#ffffff",
        },
        shapes: {
          borderRadius: 25,
        },
      },
      paymentIntentClientSecret: setupIntent,

      merchantDisplayName: "Example Inc.",
      applePay: {
        merchantCountryCode: "US",
      },
      googlePay: {
        merchantCountryCode: "US",
        testEnv: true,
        currencyCode: "usd",
      },
      allowsDelayedPaymentMethods: true,
      returnURL: "stripe-example://stripe-redirect",
    });
    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
    } else {
      setReady(true);
    }
  };
  
  const fetchPaymentSheetParams = async () => {
    try {
      const response = await fetch(
        `https://khushiikids.herokuapp.com/paymentSheet/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      const { setupIntent, ephemeralKey, customer } = await response.json();
 
      return {
        setupIntent,
        ephemeralKey,
        customer,
      };
    } catch (error) {
      console.log(error); 
    }
  };

  async function buy() {
    const { error } = await presentPaymentSheet();

    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
    } else {
      Alert.alert("Success", "The payment was confirmed successfully");
      setReady(false);
    }
  }

  return (
    <View style={styles.container}>
      <StripeProvider
        publishableKey={
          "pk_test_51JLIgJIye5yUOXF9iEurweNwsBKsfII44F94iorJ1P77jCdS8zZzv0NcUV4oMEE6QFPa5Wn78SeUylAuQuBlfdwe00q6GFqm7W"
        }
        merchantIdentifier={"merchant.com.stripe.react.native"}
      >
        <Text>1 kg of Sweet Potatoes</Text>

        <View style={styles.buttons}>
          <Button title={"Go back"} onPress={goBack} />
          <Button title={"Buy"} onPress={buy} disabled={loading || !ready} />
        </View>
        <Button
          title={"Logout"}
          onPress={async () => {
            await resetPaymentSheetCustomer();
          }}
        />
      </StripeProvider>
    </View>
  );
};

export default CheckOut;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 100,
  },
  image: {
    height: 250,
    width: 250,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "50%",
  },
});
