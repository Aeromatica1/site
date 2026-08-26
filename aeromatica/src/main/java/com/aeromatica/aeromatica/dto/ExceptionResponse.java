package com.aeromatica.aeromatica.dto;

import java.util.Map;

public record ExceptionResponse(int status, String message, Map<String, String> details) {}