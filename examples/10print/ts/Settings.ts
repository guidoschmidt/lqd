import { Labeled, Use, Component, MinMax, Step } from "lqd";

export class Settings {
  @Use(Component.Color)
  @Labeled("BKGRND")
  backgroundColor = "#ffffff";

  @Use(Component.Color)
  @Labeled("FRGRND")
  foregroundColor = "#000000";

  @Use(Component.Slider)
  @Labeled("Tile Count")
  @MinMax(1, 300)
  tileCount: number = 20;

  @Labeled("Line Width")
  @MinMax(1, 10)
  lineWidth: number = 5;

  @Use(Component.Slider)
  @Labeled("Balance")
  @MinMax(0, 1)
  @Step(0.01)
  balance: number = 0.6;

  @Labeled("Invert")
  invert: boolean = false;
}
