export interface ReqresUser {
	id: number;
	email: string;
	first_name: string;
	last_name: string;
	avatar: string;
}

export interface ReqresUsersList {
	page: number;
	per_page: number;
	total: number;
	total_pages: number;
	data: ReqresUser[];
}

export interface ReqresError {
	error: string;
}

export interface CreateReqresUser {
	name: string;
	job: string;
}

export interface CreatedReqresUser extends CreateReqresUser {
	id: string;
	createdAt: string;
}

export interface ReqresLoginCredentials {
	email?: string;
	username?: string;
	password?: string;
}
