type BridgedWindow = Window &
	typeof globalThis & {
		electron: {
			glob: (pattern: string) => Promise<string[]>;
		};
	};
