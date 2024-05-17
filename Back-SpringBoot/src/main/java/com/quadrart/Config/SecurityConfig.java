package com.quadrart.Config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import com.quadrart.Handlers.CustomAuthenticationHandler.CustomAuthenticationProvider;


import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        /*
         * Através do encadeamento de funções no parametro http, é possível definitir as
         * configurações de segurança do @Bean, como quais requisições serão permitidas,
         * métodos permitidos por caminho, csrf, e etc.
         */
        http
                .cors(Customizer.withDefaults())
                .csrf(AbstractHttpConfigurer::disable)
                .sessionManagement(manager -> manager.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(request -> request.requestMatchers("/auth/login", "/auth/register", "/auth/logout", "/auth/existcheck", "/auth/checkTokenExp")
                        .permitAll()
                        .requestMatchers(HttpMethod.GET, "/quadro", "/quadro/*", "quadro/image/*")
                        .permitAll()
                        .anyRequest()
                        .authenticated())
                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    /*
     * Cria um @Bean que retorna um objeto PasswordEncoder, que permite a utilização
     * do mesmo em locais que o encoding é nessário.
     */

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    /*
     * Cria um @Bean que retorna um objeto CustomAuthenticationProvider, que permite 
     * a verificação customizada de login. No caso, o login pode ser feito com username ou email;
     */

    @Bean
    public CustomAuthenticationProvider authenticationManager() throws Exception {
        return new CustomAuthenticationProvider();
    }

}
