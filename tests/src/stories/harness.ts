export type Harness = {
  open(): Promise<Scene>;
};

type Scene = {
  assert: {
    shows(text: string): void;
  };
  dispose(): void;
};
