package com.quadrart.Controllers.AuthController;

import org.springframework.web.bind.annotation.RestController;

import com.quadrart.Handlers.CustomAuthenticationHandler.CustomAuthenticationProvider;
import com.quadrart.Models.Usuario.RequestUsuarioLogin;
import com.quadrart.Models.Usuario.RequestUsuarioRegistro;
import com.quadrart.Models.Usuario.Usuario;
import com.quadrart.Services.JwtService.JwtService;
import com.quadrart.Services.UsuarioService.UsuarioService;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

/*
 * Abaixo está o controlador que se responsibiliza pelo login,
 * registro e logout.
 */


@CrossOrigin(origins="http://localhost:3000", allowCredentials = "true")
@RestController
@RequestMapping("/auth")
public class AuthController {

        /* 
         * Abaixo seguem os objetos que serão utilizados na lógica dos controladores, como
         * por exemplo: 
         * - PasswordEncoder (Encoding de senha)
         * - UsuarioService (Referente a dados do usuário)
         * - JwtService (Funções para gerar e autenticar tokens JWT)
         * - CustomAuthenticationProvider (Autenticação de usuário após o login)
         */

        @Autowired
        private PasswordEncoder passwordEncoder;

        @Autowired
        private UsuarioService usuarioService;

        @Autowired
        private JwtService jwtService;

        @Autowired
        private CustomAuthenticationProvider authenticationManager;

        /*
         * Abaixo segue o endpoint de Login. Há a validação dos dados sendos enviados
         * através da Tag @Valid e outras anotações incluidas no RequestUsuarioLogin.
         * 
         * A Autenticação é executada. Se houver suceso, dados adicionais são carregados.
         * Como os dados recebidos podem ser e-mail ou usuário é necessário aplicar
         * uma lógica para impedir que o usuario seja null na hora da criação do token.
         * 
         * Após isso, o token é gerado, com 72 horas de duração, um cookie chamado
         * accessToken é adicionado no header Set-Cookie, e a resposta é retornada
         * como um ResponseEntity.ok 200.
         */

        @PostMapping("/login")
        @ResponseBody
        public ResponseEntity<?> loginUser(@Valid @RequestBody RequestUsuarioLogin requestUsuarioLogin,
                        HttpServletResponse response) {

                authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                                requestUsuarioLogin.login(), passwordEncoder.encode(requestUsuarioLogin.senha())));

                Usuario usuario = usuarioService.loadUserByUsername(requestUsuarioLogin.login());

                if(usuario == null){
                        usuario = usuarioService.loadUserByEmail(requestUsuarioLogin.login());
                }

                String jwt = jwtService.generateToken(usuario, 72);

                ResponseCookie cookie = ResponseCookie.from("accessToken", jwt)
                                .httpOnly(true)
                                .secure(true)
                                .path("/")
                                .build();

                response.addHeader("Set-Cookie", cookie.toString());

                return ResponseEntity.ok(requestUsuarioLogin);
        }

        /*
         * Abaixo, segue o endpoint de registro. Primeiro, um usuário é recebido no endpoint
         * e validado através da anotação @Valid, que verifica o record RequestUsuarioRegistro
         * através de anotações de verificação no modelo.
         * 
         * Após isso, um objeto Usuario é criado e tem sua senha codificada. Agora, um token jwt
         * é criado com o jwtService, e o usuário é criado na base de dados.
         * 
         * Agora, o token é adicionado em um Cookie com o nome de accessToken, e é adicionado no
         * header Set-Cookie da resposta. Após isso, uma resposta 200 é retornada.
         */

        @PostMapping("/register")
        @ResponseBody
        public ResponseEntity<Usuario> registerUser(@Valid @RequestBody RequestUsuarioRegistro requestUsuarioRegistro,
                        HttpServletResponse response) {

                Usuario registro = new Usuario(requestUsuarioRegistro);

                registro.setSenha(passwordEncoder.encode(registro.getSenha()));

                String jwt = jwtService.generateToken(registro, 72);

                usuarioService.createUser(registro);

                ResponseCookie cookie = ResponseCookie.from("accessToken", jwt)
                                .httpOnly(true)
                                .secure(true)
                                .path("/")
                                .build();

                response.addHeader("Set-Cookie", cookie.toString());

                return ResponseEntity.ok(usuarioService.createUser(registro));

        }

        /*
         * Esse é o endpoint de logout, que gera um token com um usuário vazio 
         * e que também está expirado. 
         * 
         * Após isso, o token é colocado em um cookie com nome de accessToken,
         * e retornado via header Set-Cookies e finalmente, retorna uma resposta
         * 200.
         */

        @PostMapping("/logout")
        public ResponseEntity<?> logoutUser(HttpServletResponse response) {
                String jwt = jwtService.generateToken(new Usuario(), 72);

                ResponseCookie cookie = ResponseCookie.from("accessToken", jwt)
                                .httpOnly(true)
                                .secure(true)
                                .path("/")
                                .build();
                
                response.addHeader("Set-Cookie", cookie.toString());

                return ResponseEntity.ok("Usuário deslogado com sucessso");

        }

        @PostMapping("/existcheck")
        public ResponseEntity<?> checkUserExists(@RequestBody Map<String, String> requestData) {
            String email = requestData.get("email");
            String username = requestData.get("username");

            boolean emailExists = usuarioService.loadUserByEmail(email) != null;
            boolean usernameExists = usuarioService.loadUserByUsername(username) != null;

            // Se email ou username existe, retornar true, caso contrário, retornar false
            boolean exists = emailExists || usernameExists;

            return ResponseEntity.ok(exists);

        }

        @GetMapping("/checkTokenExp")
        public ResponseEntity<?> checkTokenExpiration(HttpServletRequest request) {

            String token = null;

            for (Cookie cookie : request.getCookies()) {
                if (cookie.getName().equals("accessToken")) {
                    token = cookie.getValue();
                }
            }

            if (token == null){
                ResponseEntity.badRequest().body("Token Invalido");
            }

            try {
                jwtService.isTokenExpired(token);
                return ResponseEntity.ok("Token é valido");
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Token Invalido");
            }
        }

}
