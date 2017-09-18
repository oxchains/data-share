package com.oxchains.mdsc;

import com.oxchains.mdsc.auth.AuthError;
import com.oxchains.mdsc.auth.JwtAuthenticationProvider;
import com.oxchains.mdsc.auth.JwtTokenFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

@EnableWebSecurity
@Configuration
public class AppConfiguration extends WebSecurityConfigurerAdapter {

//    private final JwtTokenFilter jwtTokenFilter;
//    private final AuthError authError;
    private final JwtAuthenticationProvider jwtAuthenticationProvider;

    public AppConfiguration(@Autowired JwtAuthenticationProvider jwtAuthenticationProvider) {
//        this.jwtTokenFilter = jwtTokenFilter;
//        this.authError = authError;
        this.jwtAuthenticationProvider = jwtAuthenticationProvider;
    }

    @Override
    public void configure(HttpSecurity http) throws Exception {
        http.csrf().disable().authorizeRequests().antMatchers("/", "/chaincode").permitAll();
    }

    @Override
    protected void configure(final AuthenticationManagerBuilder auth) throws Exception {
        auth.authenticationProvider(jwtAuthenticationProvider);
    }

    /**
     * allow cross origin requests
     */
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurerAdapter() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry
                        .addMapping("/**")
                        .allowedOrigins("*")
                        .allowedMethods("GET", "POST", "PUT", "OPTIONS", "DELETE")
                        .allowedHeaders("*");
            }
        };
    }
}
