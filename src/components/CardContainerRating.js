import React from "react";
import { Image, View, Text } from "react-native";
import color from "color";
import Card from "./Card";
import Elevation from "./Elevation";
import Icon from "./Icon";
import StarRating from "./StarRating";
import { withTheme } from "../core/theming";
import { FORM_TYPES, COMPONENT_TYPES } from "../core/component-types";
import Config from "./Config";
import type { Theme } from "../types";

const ICON_CONTAINER_SIZE = Config.cardIconSize * 2;
const ICON_CONTAINER_PADDING = Config.cardIconSize / 2 - 1;

export type CardContainerRatingProps = {
  image: string | { uri: string },
  title?: string,
  leftDescription?: string,
  rightDescription?: string,
  icon?: string,
  rating: number,
  aspectRatio?: number,
  elevation: number,
  numColumns: 2 | 3,
  theme: Theme,
  style: any,
  onPress: () => void
};

class CardContainerRating extends React.PureComponent<CardContainerRatingProps> {
  static defaultProps = {
    aspectRatio: 1.5,
    elevation: 2,
    numColumns: 3
  };

  render() {
    const {
      image,
      title,
      leftDescription,
      rightDescription,
      icon,
      rating,
      aspectRatio,
      elevation,
      numColumns,
      theme: { colors, borderRadius, typography, spacing },
      style,
      onPress
    } = this.props;

    let titleStyle, rightDescriptionStyle;
    switch (numColumns) {
      case 2:
        titleStyle = typography.headline6;
        rightDescriptionStyle = typography.body2;
        break;
      case 3:
        titleStyle = typography.headline5;
        rightDescriptionStyle = typography.caption;
        break;
    }

    return (
      <Card style={style} onPress={onPress} numColumns={numColumns}>
        <Elevation style={{ elevation, borderRadius: borderRadius.global }}>
          <View
            style={{
              borderRadius: borderRadius.global,
              overflow: "hidden"
            }}
          >
            <Image
              style={{ aspectRatio }}
              source={typeof image === "string" ? { uri: image } : image}
              resizeMode="cover"
            />
            <View style={{ padding: spacing.large }}>
              {title ? (
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between"
                  }}
                >
                  <Text
                    numberOfLines={1}
                    style={[titleStyle, { color: colors.strong }]}
                  >
                    {title}
                  </Text>
                </View>
              ) : null}
              {leftDescription ? (
                <Text
                  numberOfLines={1}
                  style={[
                    typography.body2,
                    {
                      color: colors.medium,
                      marginTop:
                        numColumns === 3 ? spacing.text : spacing.text / 2
                    }
                  ]}
                >
                  {leftDescription}
                </Text>
              ) : null}
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: numColumns === 3 ? spacing.large : spacing.medium
                }}
              >
                <StarRating rating={rating} />
                <Text
                  style={[
                    rightDescriptionStyle,
                    {
                      color: colors.medium,
                      marginLeft: spacing.small
                    }
                  ]}
                  numberOfLines={1}
                >
                  {rightDescription}
                </Text>
              </View>
            </View>
            {icon && (
              <Elevation
                style={{
                  elevation: Config.cardIconElevation,
                  position: "absolute",
                  top: spacing.medium,
                  right: spacing.medium,
                  width: ICON_CONTAINER_SIZE,
                  height: ICON_CONTAINER_SIZE,
                  padding: ICON_CONTAINER_PADDING,
                  borderRadius: ICON_CONTAINER_SIZE,
                  backgroundColor: color(colors.strong)
                    .alpha(Config.cardIconBackgroundOpacity)
                    .rgb()
                    .string()
                }}
              >
                <Icon
                  name={icon}
                  size={Config.cardIconSize}
                  color={colors.surface}
                />
              </Elevation>
            )}
          </View>
        </Elevation>
      </Card>
    );
  }
}

export default withTheme(CardContainerRating);

export const SEED_DATA = [
  {
    name: "Medium rating card",
    tag: "CardContainerRating",
    description:
      "An elevated card with a title and description, that takes up half of its container.",
    category: COMPONENT_TYPES.card,
    preview_image_url:
      "https://res.cloudinary.com/altos/image/upload/v1541096709/draftbit/library/jigsaw-1.0/reps/Card_ContainerRating_2col.png",
    supports_list_render: true,
    props: {
      image: {
        label: "Image",
        description: "Image",
        type: FORM_TYPES.remoteImage,
        value: null,
        editable: true
      },
      title: {
        label: "Title",
        description: "Text to display",
        type: FORM_TYPES.string,
        value: "Beautiful West Coast Villa",
        editable: true
      },
      leftDescription: {
        label: "Left description",
        description: "Text to display on the left",
        type: FORM_TYPES.string,
        value: "San Diego",
        editable: true
      },
      rightDescription: {
        label: "Right description",
        description: "Text to display on the right",
        type: FORM_TYPES.string,
        value: "$100",
        editable: true
      },
      icon: {
        label: "Icon",
        description: "Icon to display on the top right",
        type: FORM_TYPES.icon,
        value: "cloud",
        editable: true
      },
      aspectRatio: {
        label: "Aspect ratio",
        description: "Aspect ratio of the image",
        type: FORM_TYPES.aspectRatio,
        value: 1.5,
        editable: true
      },
      rating: {
        label: "Rating",
        description: "Number of stars to show. A number 0-5.",
        type: FORM_TYPES.number,
        min: 0,
        max: 5,
        step: 1,
        precision: 0,
        editable: true
      },
      elevation: {
        label: "Elevation",
        description: "Elevation of the card. A number 0-3.",
        type: FORM_TYPES.number,
        value: 2,
        min: 0,
        max: 3,
        step: 1,
        precision: 0,
        editable: true
      },
      numColumns: {
        type: FORM_TYPES.number,
        value: 2,
        editable: false
      }
    },
    layout: {
      width: 169,
      height: 215
    }
  },
  {
    name: "Large rating card",
    tag: "CardContainerRating",
    description:
      "An elevated card with a title and description, that takes up its full container.",
    category: COMPONENT_TYPES.card,
    preview_image_url:
      "https://res.cloudinary.com/altos/image/upload/v1541096711/draftbit/library/jigsaw-1.0/reps/Card_ContainerRating_3col.png",
    supports_list_render: true,
    props: {
      image: {
        label: "Image",
        description: "Image",
        type: FORM_TYPES.remoteImage,
        value: null,
        editable: true
      },
      title: {
        label: "Title",
        description: "Text to display",
        type: FORM_TYPES.string,
        value: "Beautiful West Coast Villa",
        editable: true
      },
      leftDescription: {
        label: "Left description",
        description: "Text to display on the left",
        type: FORM_TYPES.string,
        value: "San Diego",
        editable: true
      },
      rightDescription: {
        label: "Right description",
        description: "Text to display on the right",
        type: FORM_TYPES.string,
        value: "$100",
        editable: true
      },
      icon: {
        label: "Icon",
        description: "Icon to display on the top right",
        type: FORM_TYPES.icon,
        value: "cloud",
        editable: true
      },
      aspectRatio: {
        label: "Aspect ratio",
        description: "Aspect ratio of the image",
        type: FORM_TYPES.aspectRatio,
        value: 1.5,
        editable: true
      },
      rating: {
        label: "Rating",
        description: "Number of stars to show. A number 0-5.",
        type: FORM_TYPES.number,
        min: 0,
        max: 5,
        step: 1,
        precision: 0,
        editable: true
      },
      elevation: {
        label: "Elevation",
        description: "Elevation of the card. A number 0-3.",
        type: FORM_TYPES.number,
        value: 2,
        min: 0,
        max: 3,
        step: 1,
        precision: 0,
        editable: true
      },
      numColumns: {
        type: FORM_TYPES.number,
        value: 3,
        editable: false
      }
    },
    layout: {
      width: 345,
      height: 348
    }
  }
];