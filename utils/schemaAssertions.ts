import Ajv from "ajv";
import addFormats from "ajv-formats";

const schemaValidator = new Ajv({ allErrors: true });
addFormats(schemaValidator);

export function expectSchema<T>(schema: object, value: unknown): asserts value is T {
	const validate = schemaValidator.compile<T>(schema);

	if (!validate(value)) {
		const details = schemaValidator.errorsText(validate.errors, { separator: "; " });
		throw new Error(`Response does not match JSON schema: ${details}`);
	}
}
