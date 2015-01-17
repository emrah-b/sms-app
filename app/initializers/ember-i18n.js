export function initialize( /* container, application */ ) {
    Ember.I18n.locale = 'tr';

    Ember.I18n.translations = {
        errors: {
            inclusion: "Listede bulunamadı",
            exclusion: "is reserved",
            invalid: "Geçersiz {{attribute}}",
            confirmation: "doesn't match {{attribute}}",
            accepted: "must be accepted",
            empty: "can't be empty",
            blank: "Bu alan boş bırakılamaz",
            present: "Bu alan boş bırakılmalı",
            tooLong: "Girilen metin {{count}} karakteri geçemez",
            tooShort: "Girilen metin {{count}} karakterden uzun olmalıdır",
            wrongLength: "{{count}} karakter olmalıdır",
            notANumber: "Numara girilmelidir",
            notAnInteger: "Girilen numara tamsayı olmalıdır",
            greaterThan: "Girilen numara > {{count}} olmalıdır",
            greaterThanOrEqualTo: "Girilen numara en az {{count}} ya da daha büyük olmalıdır",
            equalTo: "Girilen numara {{count}} ile eşit olmalıdır",
            lessThan: "Girilen numara < {{count}} olmalıdır",
            lessThanOrEqualTo: "Girilen numara en fazla {{count}} ya da daha küçük olmalıdır",
            otherThan: "Girilen numara {{count}} olamaz",
            odd: "must be odd",
            even: "must be even",
            url: "Girilen URL geçersiz",
            email: "Girilen email adresi geçersiz"
        }
    };

}

export default {
    name: 'ember-i18n',
    initialize: initialize
};
