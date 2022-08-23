export default class Regex {
    static nameRegex = /^\w+$/;
    static emailRegex = /^\w.*@\w+\.\w{2,3}$/;
    static phoneRegex = /^\+?\d{3,3} ?\d{3,3} ?\d{4,6}$/;
    static ageRegex = /^(1\d{1,2}|[1-9]\d?)$/;
    static passwordRegex = [/^\w{8,}$/, /\d/, /[a-zA-Z]/];
}