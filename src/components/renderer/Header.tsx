import React from "react";
import { Image, Link, StyleSheet, Text, View } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderBottomWidth: 2,
    borderBottomColor: "#112131",
    borderBottomStyle: "solid",
    alignItems: "stretch",
  },
  detailColumn: {
    flexDirection: "column",
    flexGrow: 9,
    textTransform: "uppercase",
  },
  linkColumn: {
    flexDirection: "column",
    flexGrow: 2,
    alignSelf: "flex-end",
    justifySelf: "flex-end",
  },
  name: {
    fontSize: 24,
    fontFamily: "Lato Bold",
  },
  subtitle: {
    fontSize: 10,
    justifySelf: "flex-end",
    fontFamily: "Lato",
  },
  mobile: {
    fontSize: 10,
    justifySelf: "flex-end",
    fontFamily: "Lato",
    alignSelf: "flex-end",
  },
  link: {
    fontFamily: "Lato",
    fontSize: 10,
    color: "black",
    textDecoration: "none",
    alignSelf: "flex-end",
    justifySelf: "flex-end",
  },
});

const Header = ({
  uname,
  jobTitle,
  email,
  phoneNo,
  linkedIn,
  github,
}: {
  uname: string;
  jobTitle: string;
  email: string;
  phoneNo: string;
  linkedIn: string;
  github: string;
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.detailColumn}>
        <Text style={styles.name}>{uname}</Text>
        <Text style={styles.subtitle}>{jobTitle}</Text>
      </View>
      <View style={styles.linkColumn}>
        <Text style={styles.mobile}>
          <Image
            src={{
              uri: "/img/Icons/envelope.png",
              method: "GET",
              headers: { "Cache-Control": "no-cache" },
              body: "",
            }}
          />
          {email}
        </Text>

        <Text style={styles.mobile}>
          <Image
            src={{
              uri: "/img/Icons/phone.png",
              method: "GET",
              headers: { "Cache-Control": "no-cache" },
              body: "",
            }}
          />
          {phoneNo}
        </Text>

        <Text style={styles.mobile}>
          <Image
            src={{
              uri: "/img/Icons/linkedin-logo.png",
              method: "GET",
              headers: { "Cache-Control": "no-cache" },
              body: "",
            }}
          />
          {linkedIn}
        </Text>
        {github && (
          <Text style={styles.mobile}>
            <Image
              src={{
                uri: "/img/Icons/github-logo.png",
                method: "GET",
                headers: { "Cache-Control": "no-cache" },
                body: "",
              }}
            />
            {github}
          </Text>
        )}
      </View>
    </View>
  );
};

export default Header;
