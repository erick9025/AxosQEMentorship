import Ajv from "ajv";
import addFormats from "ajv-formats";

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

export function assertMatchesSchema<T>(schema: object, value: unknown): asserts value is T {
	const validate = ajv.compile<T>(schema);

	if (!validate(value)) {
		const details = ajv.errorsText(validate.errors, { separator: "; " });
		throw new Error(`Response does not match JSON schema: ${details}`);
	}
}
