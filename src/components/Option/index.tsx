import React from "react";
import {
  View,
  TouchableOpacity,
  TouchableHighlightProps,
  Image,
  ImageProps,
  Text
} from "react-native";

import { styles } from "./styles";

interface Props extends TouchableHighlightProps {
  title: string;
  image: ImageProps;
}

export function Option({title, image, ...rest}: Props) {
  return (
  <TouchableOpacity 
    style={styles.container}
    {...rest}
  >
    <Image 
    source={image}
    style={styles.image}
    />

    <Text style={styles.title}>
      {title}
    </Text>
  </TouchableOpacity>
  )
}
