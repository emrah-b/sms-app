export function initialize( /* container, application */ ) {
    bootbox.setDefaults({
        locale: "tr"
    });
}

export default {
    name: 'bootbox',
    initialize: initialize
};
