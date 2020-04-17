module.exports = class UserSql {
    constructor(userId, name, password, role, email, active, resetPasswordCode) {
        this._id = userId;
        this.name = name;
        this.password = password;
        this.role = role;
        this.email = email;
        this.active = active;
        this.resetPasswordCode = resetPasswordCode;
    }
}