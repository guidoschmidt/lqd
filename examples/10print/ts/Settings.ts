// import { type, label, step, range, InputTypes, Color } from "doug.ui";

export class Settings {
  // @type(InputTypes.Color)
  // @label("Background Color")
  backgroundColor = { h: 0, s: 0, v: 0 };

  // @type(InputTypes.Color)
  // @label("Foreground Color")
  foregroundColor = { h: 0, s: 0, v: 100 };

  // @label("Tile Count")
  // @range(1, 300)
  tileCount: number = 20;

  // @label("Line Width")
  // @range(1, 10)
  lineWidth: number = 5;

  // @label("Balance")
  // @range(0, 1)
  // @step(0.01)
  balance: number = 0.6;

  // @label("Invert")
  invert: boolean = false;
}
