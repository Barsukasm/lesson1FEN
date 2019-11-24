const FN = 'First Name*',
    LN = 'Last Name*',
    CN = 'Company Name',
    COUNTRY = 'Country*',
    TC = 'Town / City*',
    POST = 'Postcode*',
    ADDRESS = 'Address*',
    EMAIL = 'Email Address*',
    PHONE = 'Phone';


export class ShippingInfo {
    constructor(){
        this._firstName=null;
        this._lastName=null;
        this._companyName=null;
        this._country=null;
        this._townCity=null;
        this._postcode=null;
        this._address=null;
        this._email=null;
        this._phone=null;
    };
}

ShippingInfo.prototype.setField = function (id, value) {
    switch (id) {
        case FN:{
            this._firstName = value;
            break;
        }
        case LN:{
            this._lastName = value;
            break;
        }
        case CN:{
            this._companyName = value;
            break;
        }
        case COUNTRY:{
            this._country = value;
            break;
        }
        case TC:{
            this._townCity = value;
            break;
        }
        case POST:{
            this._postcode = value;
            break;
        }
        case ADDRESS:{
            this._address = value;
            break;
        }
        case EMAIL:{
            this._email = value;
            break;
        }
        case PHONE:{
            this._phone = value;
            break;
        }
        default:{
            break;
        }
    }
};

ShippingInfo.prototype.getField = function(id) {
    switch (id) {
        case FN:{
            return this._firstName;
        }
        case LN:{
            return this._lastName;
        }
        case CN:{
            return this._companyName;
        }
        case COUNTRY:{
            return this._country;
        }
        case TC:{
            return this._townCity;
        }
        case POST:{
            return this._postcode;
        }
        case ADDRESS:{
            return this._address;
        }
        case EMAIL:{
            return this._email;
        }
        case PHONE:{
            return this._phone;
        }
        default:{
            break;
        }
    }
};