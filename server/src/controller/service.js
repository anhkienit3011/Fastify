function SUCCESS(payload = null, message = '', code = 0) {
    return { payload, message, code };
}

function WARN(payload = null, message, code = 400) {
    return { payload, message, code };
}

function ERROR(payload = null, message, code = 999) {
    return { payload, message, code };
}


module.exports = {
    SUCCESS,
    WARN,
    ERROR,
}