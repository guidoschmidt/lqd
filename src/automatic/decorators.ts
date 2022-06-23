export function Label(text: string) {
  return (target: any, propertyKey: string) => {
    Reflect.set(target, `__lqd__${propertyKey}__Label`, text);
  };
}

export enum Component {
  // boolean = "boolean",
  // number = "number",
  // string = "string",
  // function = "function",
  // object = "object",
  Slider = "Slider",
  Color = "Color",
  Numerical = "Numerical",
  Radio = "Radio",
  // Selection = "Selection",
  // File = "File",
  // Image = "Image",
}

export function Use(component: Component) {
  return (target: any, propertyKey: string) => {
    Reflect.set(target, `__lqd__${propertyKey}__Component`, component);
  };
}

export function MinMax(min: number = 0, max: number = 100) {
  return (target: any, propertyKey: string) => {
    Reflect.set(target, `__lqd__${propertyKey}__MinMax`, { min, max });
  };
}

export function Step(step: number) {
  return (target: any, propertyKey: string) => {
    Reflect.set(target, `__lqd__${propertyKey}__Step`, step);
  };
}
