'use strict'

function formatearRespuesta(ok, res) {
    let ret = new Object();
    ret.status = ok;
    if (ok) {
        ret.data = res;
    } else {
        ret.error = res;
    }
    return ret;
}

module.exports = formatearRespuesta;