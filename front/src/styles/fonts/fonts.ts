import {
  Big_Shoulders_Stencil_Text as BigShouldersFont,
  Roboto as RobotoFont,
} from "next/font/google";

export const roboto = RobotoFont({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-roboto",
});

export const bigShoulders = BigShouldersFont({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-big-shoulders",
});
