export function getEnv(
	key: string,
	defaultValue?: string,
	env = process.env
): string {
	const value: string | undefined = env[key]
	if (value !== undefined) {
		return value
	}


	if (defaultValue !== undefined) {
		return defaultValue
	}

	throw new Error(`Config error: missing required env variable "${key}"`)
}