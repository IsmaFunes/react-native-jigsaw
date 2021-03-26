import * as React from "react";
import { withTheme } from "../core/theming";
import {
  View,
  Text,
  StyleSheet,
  StyleProp,
  TextStyle,
  ViewStyle,
} from "react-native";
import Icon from "./Icon";
import Touchable from "./Touchable";
import {
  GROUPS,
  COMPONENT_TYPES,
  FORM_TYPES,
  PROP_TYPES,
  FIELD_NAME,
} from "../core/component-types";
import themeT from "../styles/DefaultTheme";
import { colorTypes } from "../types";

interface RadioButtonOption {
  label: string;
  icon?: string;
}

type Props = {
  direction?: "horizontal" | "vertical";
  options?: RadioButtonOption[];
  activeColor?: colorTypes;
  inactiveColor?: colorTypes;
  labelStyle?: StyleProp<TextStyle>;
  iconSize: number;
  contentColor?: colorTypes;
  unselectedContentColor?: colorTypes;
  borderRadius?: number;
  optionSpacing?: number;
  borderColor?: colorTypes;
  style?: StyleProp<ViewStyle>;
  value: string;
  onSelect?: (label: string) => void;
  theme: typeof themeT;
};
const RadioButtonGroup: React.FC<Props> = ({
  direction = "horizontal",
  options = [],
  activeColor,
  inactiveColor,
  labelStyle,
  iconSize,
  contentColor,
  unselectedContentColor,
  borderRadius,
  optionSpacing,
  borderColor,
  style,
  value,
  theme: { colors },
  onSelect = () => {},
}) => {
  const marginHorizontal =
    direction === "horizontal" && optionSpacing ? optionSpacing / 2 : 0;
  const marginVertical =
    direction === "vertical" && optionSpacing ? optionSpacing / 2 : 0;

  const containerStyle: StyleProp<ViewStyle> = {
    flexDirection: direction === "vertical" ? "column" : "row",
    borderRadius: optionSpacing ? 0 : borderRadius,
    overflow: "hidden",
  };

  if (direction !== "vertical") {
    containerStyle.alignItems = "center";
  }

  return (
    <View style={[containerStyle, style]}>
      {options.map((option, index) => {
        const selected = option.label === value;
        const textColor = selected ? contentColor : unselectedContentColor;
        return (
          <Touchable
            key={index}
            onPress={() => onSelect(option.label)}
            style={{ flex: 1 }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: selected ? activeColor : inactiveColor,
                height: style
                  ? (style as ViewStyle).height
                    ? (style as ViewStyle).height
                    : 50
                  : 50,
                borderLeftWidth:
                  borderColor && index !== 0 ? StyleSheet.hairlineWidth : 0,
                borderRightWidth:
                  borderColor && index !== options.length - 1
                    ? StyleSheet.hairlineWidth
                    : 0,
                borderColor: borderColor || colors.divider,
                borderRadius: optionSpacing ? borderRadius : 0,
                marginLeft: marginHorizontal,
                marginRight: marginHorizontal,
                marginTop: marginVertical,
                marginBottom: marginVertical,
              }}
            >
              {option.icon ? (
                <Icon
                  style={{ paddingEnd: 5 }}
                  name={option.icon}
                  size={iconSize}
                  color={textColor}
                />
              ) : null}
              {option.label ? (
                <Text
                  style={[
                    labelStyle,
                    {
                      color: textColor,
                    },
                  ]}
                >
                  {option.label}
                </Text>
              ) : null}
            </View>
          </Touchable>
        );
      })}
    </View>
  );
};

export default withTheme(RadioButtonGroup);

export const SEED_DATA = {
  name: "Radio Button Group",
  tag: "RadioButtonGroup",
  category: COMPONENT_TYPES.button,
  preview_image_url: "{CLOUDINARY_URL}/Control_Radio.png",
  props: {
    options: {
      group: GROUPS.data,
      label: "Options",
      description: "Options for the button group.",
      formType: FORM_TYPES.array,
      propType: PROP_TYPES.OBJECT,
      options: [
        { icon: "", label: "One" },
        { icon: "", label: "Two" },
        { icon: "", label: "Three" },
      ],
      defaultValue: [
        { icon: "", label: "One" },
        { icon: "", label: "Two" },
        { icon: "", label: "Three" },
      ],
      editable: true,
      required: true,
    },
    direction: {
      group: GROUPS.basic,
      label: "Horizontal/Vertical",
      description: "Whether the buttons should be Horizontal or Vertical",
      formType: FORM_TYPES.flatArray,
      propType: PROP_TYPES.STRING,
      defaultValue: "horizontal",
      options: ["horizontal", "vertical"],
      editable: true,
      required: true,
    },
    activeColor: {
      group: GROUPS.basic,
      label: "Active Color",
      description: "Color of the button when it's selected",
      defaultValue: "primary",
      formType: FORM_TYPES.color,
      propType: PROP_TYPES.THEME,
      editable: true,
      required: true,
    },
    inactiveColor: {
      group: GROUPS.basic,
      label: "Inactive Color",
      description: "Color of the button when it's selected not selected",
      defaultValue: "divider",
      formType: FORM_TYPES.color,
      propType: PROP_TYPES.THEME,
      editable: true,
      required: true,
    },
    contentColor: {
      group: GROUPS.basic,
      label: "Selected Content Color",
      description: "Color of the content(Icon and Label)",
      defaultValue: "surface",
      formType: FORM_TYPES.color,
      propType: PROP_TYPES.THEME,
      editable: true,
      required: true,
    },
    unselectedContentColor: {
      group: GROUPS.basic,
      label: "Unselected Content Color",
      description: "Unfinished Color of the content(Icon and Label)",
      defaultValue: "strong",
      formType: FORM_TYPES.color,
      propType: PROP_TYPES.THEME,
      editable: true,
      required: true,
    },
    borderColor: {
      group: GROUPS.basic,
      label: "Border Color",
      description: "Border color of the option",
      defaultValue: "light",
      formType: FORM_TYPES.color,
      propType: PROP_TYPES.THEME,
      editable: true,
      required: true,
    },
    labelStyle: {
      group: GROUPS.basic,
      label: "Label Style",
      description: "Font and weight of the Label",
      formType: FORM_TYPES.typeStyle,
      propType: PROP_TYPES.THEME,
      defaultValue: "Button",
      editable: true,
      required: true,
    },
    optionSpacing: {
      group: GROUPS.basic,
      label: "Option Spacing",
      description: "The spacing between each option",
      formType: FORM_TYPES.number,
      propType: PROP_TYPES.NUMBER,
      defaultValue: 1,
      min: 0,
      max: 20,
      step: 1,
      precision: 1,
      editable: true,
      required: false,
    },
    borderRadius: {
      group: GROUPS.basic,
      label: "Border Radius",
      description: "The border radius for the container or options",
      formType: FORM_TYPES.number,
      propType: PROP_TYPES.NUMBER,
      defaultValue: 10,
      min: 0,
      max: 100,
      step: 1,
      precision: 1,
      editable: true,
      required: false,
    },
    iconSize: {
      group: GROUPS.basic,
      label: "Icon Size",
      description: "The size of the icon if enabled",
      formType: FORM_TYPES.number,
      propType: PROP_TYPES.NUMBER,
      defaultValue: 16,
      min: 0,
      max: 24,
      step: 1,
      precision: 1,
      editable: true,
      required: false,
    },
    fieldName: {
      ...FIELD_NAME,
      defaultValue: "radioButtonValue",
      handlerPropName: "onSelect",
    },
  },
  layout: {},
};
