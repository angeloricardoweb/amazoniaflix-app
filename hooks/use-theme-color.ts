/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { Colors } from '@/constants/theme';

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors
) {
  const colorFromProps = props.dark; // Always use dark theme

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[colorName];
  }
}
