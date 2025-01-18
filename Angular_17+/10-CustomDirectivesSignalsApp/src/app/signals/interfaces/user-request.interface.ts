export interface UserRequestType {
    data:        UserType;
    support:     Support;
}

export interface UserType {
    id:         number;
    email:      string;
    first_name: string;
    last_name:  string;
    avatar:     string;
}

export interface Support {
    url:  string;
    text: string;
}
