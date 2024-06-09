export function getEnv<T>(
	key: string,
	defaultValue?: T,
	env = process.env
): string | T {
	const value: string | undefined = env[key]
	if (value !== undefined) {
		return value
	}


	if (defaultValue !== undefined) {
		return defaultValue
	}

	throw new Error(`Config error: missing required env variable "${key}"`)
}