const radius = {
  global_4: 4,
  global_8: 8,
  global_12: 12,
  global_16: 16,
  global_32: 32,
  round: 1000,
};

export type Radius = keyof typeof radius;

export { radius };
