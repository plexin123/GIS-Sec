package com.example.backendGIS.configuration;


import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain defaultSecurityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf ->
                        csrf.disable()) //CSRF Cross-Site Request Forgery security measure for POST request
                .authorizeHttpRequests(authRequest ->authRequest
                                .requestMatchers("/**").permitAll() //HttpMethod.OPTIONS, -> important for authentication
                        //                            .requestMatchers("/usuario","/saludo","/").hasRole("ADMIN").anyRequest().authenticated()
                ) // give permission to specific routes
                //                    .logout(log -> log.logoutSuccessUrl("/").permitAll())
                .formLogin(withDefaults());
        return http.build();
    }
    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
