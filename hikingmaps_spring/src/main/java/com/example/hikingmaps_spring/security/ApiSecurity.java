package com.example.hikingmaps_spring.security;

import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.example.hikingmaps_spring.user.UserRepository;

import org.springframework.context.annotation.Bean;

@EnableWebSecurity
public class ApiSecurity extends WebSecurityConfigurerAdapter {
	private UserDetailsServiceImplementation userDetailsService;
	private BCryptPasswordEncoder bCryptPasswordEncoder;
	private UserRepository repository;

	public ApiSecurity(UserRepository repository, UserDetailsServiceImplementation userDetailsService,
			BCryptPasswordEncoder bCryptPasswordEncoder) {
		this.repository = repository;
		this.userDetailsService = userDetailsService;
		this.bCryptPasswordEncoder = bCryptPasswordEncoder;
	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.cors().and().csrf().disable().sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
				.and().authorizeRequests().antMatchers("/sec/**").hasAuthority("user").and().authorizeRequests()
				.antMatchers("/admin/**").hasAuthority("admin").and()
				.addFilter(new JWTAuthenticationFilter(repository, authenticationManager()))
				.addFilter(new JWTAuthorizationFilter(authenticationManager())).headers().frameOptions().disable();
	}

	@Override
	public void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.userDetailsService(userDetailsService).passwordEncoder(bCryptPasswordEncoder);
	}

	@Bean
	CorsConfigurationSource corsConfigurationSource() {
		final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", new CorsConfiguration().applyPermitDefaultValues());
		return source;
	}
}
