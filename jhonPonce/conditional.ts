function classifyAge(age: number): string {
	if (age < 0) {
		return "Error: age cannot be less than 0";
	}

	if (age < 3) {
		return "Baby";
	}

	if (age < 11) {
		return "Child";
	}

	if (age < 18) {
		return "Teenager";
	}

	if (age < 60) {
		return "Adult";
	}

	return "Elderly";
}

const ages: number[] = [-1, 0, 3, 11, 18, 60];

function printAgeClassification(ages: number[]): void {
	ages.forEach((age) => {
		console.log(`Age: ${age}`);
		console.log(classifyAge(age));
	});
}

printAgeClassification(ages);