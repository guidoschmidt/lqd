import { Label, Use, Component, MinMax, Step } from "lqd";

export class Settings {
  @Use(Component.Color)
  @Label("Background Color")
  backgroundColor = "#ffffff";

  @Use(Component.Color)
  @Label("Foreground Color")
  foregroundColor = "#000000";

  @Label("Tile Count")
  @MinMax(1, 300)
  tileCount: number = 20;

  @Label("Line Width")
  @MinMax(1, 10)
  lineWidth: number = 5;

  @Label("Balance")
  @MinMax(0, 1)
  @Step(0.01)
  balance: number = 0.6;

  @Label("Invert")
  invert: boolean = false;
}
