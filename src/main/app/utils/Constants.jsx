/******************************************
          PUBLIC CONSTANTS
******************************************/
export var OK_STATUS      = "OK";
export var KO_STATUS      = "KO";
export var WARNING_STATUS = "WARNING";
export var NO_STATUS      = "NONE";

export var FONT_AWESOME = "FONT_AWESOME";
export var MATERIAL_KIT = "MATERIAL_KIT";

export var DEFAULT_PILL_ICON_TYPE = "MATERIAL_KIT";
export var DEFAULT_PILL_ICON_NAME = "schedule";

export var statusClassMap      = {};
statusClassMap[OK_STATUS]      = "success";
statusClassMap[KO_STATUS]      = "danger";
statusClassMap[WARNING_STATUS] = "warning";
statusClassMap[NO_STATUS]      = "info";

export var HEALTH_SERVICE_TAB    = "HEALTH_SERVICE_TAB";
export var EXECUTORS_SERVICE_TAB = "EXECUTORS_SERVICE_TAB";
export var DETAILS_SERVICE_TAB   = "DETAILS_SERVICE_TAB";
export var OTHERENV_SERVICE_TAB   = "OTHERENV_SERVICE_TAB";
export var DEFAULT_SERVICE_TAB   = HEALTH_SERVICE_TAB

export var DEFAULT_ENV       = "none"
export var ENV_ORDER         = {"PROD" : 1, "PREPROD" : 2, "QUALIF" : 3};
export var ENV_OTHER_ORDER   = 99;

/******************************************
              STATIC FOR STYLE
******************************************/

export var OK_VALUE       = "OK";
export var KO_VALUE       = "ERROR";
export var WARNING_VALUE  = "Warning";
export var NO_VALUE       = " - ";
export var MULTIPLE_VALUE = "Multiple";

export var SERVICE_DETAILS_ATTRIBUTES = ["type"]