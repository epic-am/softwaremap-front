/******************************************
          PUBLIC CONSTANTS
******************************************/

export var OK_STATUS = "OK";
export var KO_STATUS = "KO";
export var WARNING_STATUS = "WARNING";
export var NO_STATUS = "NONE";

export var OK_VALUE = "OK";
export var KO_VALUE = "ERROR";
export var WARNING_VALUE = "Warning";
export var NO_VALUE = " - ";
export var MULTIPLE_VALUE = "Multiple";

export var statusClassMap = {};
statusClassMap[OK_STATUS] = "success";
statusClassMap[KO_STATUS] = "danger";
statusClassMap[WARNING_STATUS] = "warning";
statusClassMap[NO_STATUS] = "info";

/******************************************
        STATIC FUNCTION FOR STYLE
******************************************/
