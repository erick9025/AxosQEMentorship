export interface CreateRestfulObject {
	name: string;
	data: {
		email: string;
		job: string;
	};
}

export interface RestfulObject extends CreateRestfulObject {
	id: string;
	createdAt?: number | string;
}
