"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateContactDto = void 0;
class CreateContactDto {
    constructor(fullName, email, phone, description) {
        this.fullName = fullName;
        this.email = email;
        this.phone = phone;
        this.description = description;
    }
    get values() {
        const returnObj = {};
        if (this.fullName)
            returnObj.fullName = this.fullName;
        if (this.email)
            returnObj.email = this.email;
        if (this.phone)
            returnObj.phone = this.phone;
        return returnObj;
    }
    static create(props) {
        const { fullName, email, phone, description } = props;
        if (!fullName)
            return ['Debe ingresar el nombre completo', undefined];
        if (!email)
            return ['Debe ingresar el correo electronico', undefined];
        if (!phone)
            return ['Debe ingresar el numero de telefono', undefined];
        return [undefined, new CreateContactDto(fullName, email, phone, description)];
    }
}
exports.CreateContactDto = CreateContactDto;
