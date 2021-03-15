import * as React from "react";
import {
  StyleProp,
  ViewStyle,
  TextStyle,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { withTheme } from "../core/theming";
import RadioButton from "./RadioButton";
import themeT from "../styles/DefaultTheme";
import { View } from "react-native";
import Text from "./Text";
import { colorTypes } from "../types";

type Props = {
  label: string;
  backgroundColor?: colorTypes;
  labelColor?: colorTypes;
  radioButtonColor?: colorTypes;
  style?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  onPress?: () => void;
  selected: boolean;
  theme: typeof themeT;
};

const RadioButtonFieldRow: React.FC<Props> = ({
  label,
  backgroundColor = "background",
  labelColor = "strong",
  radioButtonColor = "primary",
  onPress,
  selected,
  style,
  labelStyle,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.mainParent, style, { backgroundColor }]}
    >
      <Text style={[styles.label, labelStyle, { color: labelColor }]}>
        {label}
      </Text>
      <View style={styles.radioButton}>
        <RadioButton
          color={radioButtonColor}
          unselectedColor={radioButtonColor}
          selected={selected}
          onPress={onPress}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mainParent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingStart: 20,
    minHeight: 50,
    paddingEnd: 20,
  },
  label: {
    flex: 3,
    fontSize: 14,
  },
  radioButton: {
    flex: 1,
    alignItems: "flex-end",
  },
});

export default withTheme(RadioButtonFieldRow);
