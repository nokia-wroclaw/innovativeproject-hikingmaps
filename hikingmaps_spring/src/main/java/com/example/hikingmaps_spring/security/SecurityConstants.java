package com.example.hikingmaps_spring.security;

public class SecurityConstants {
	public static final String SECRET = "HikingMapsJWTGenerationSecretKey";
	public static final String TOKEN_PREFIX = "Bearer ";
	public static final long TOKEN_EXPIRATION_TIME = 86_400_000; // 1 day
	public static final String AUTHORIZATION_HEADER = "Authorization";
	public static final String SIGN_IN_URL = "/user/login";
}
