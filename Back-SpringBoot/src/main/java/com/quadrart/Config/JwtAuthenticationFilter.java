package com.quadrart.Config;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.quadrart.Models.Usuario.Usuario;
import com.quadrart.Services.JwtService.JwtService;
import com.quadrart.Services.UsuarioService.UsuarioService;

import io.micrometer.common.util.StringUtils;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

/*
 * Classe filtro JWT, que irá verificar se um token JWT é válido, para permitir requisições.
 */

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter{

    /*
     * Abaixo seguem os objetos que serão utilizados na lógica dos controladores,
     * como
     * por exemplo:
     * - JwtService (Objeto necessário para funções JWT);
     * - UsuarioService (Objeto para comunicação com a tabela usuario do MySQL);
     */

    @Autowired
    private JwtService jwtService;

    @Autowired
    private UsuarioService usuarioService;

    /*
     * Essa função é chamada uma vez em toda as requests. Verificando-se o token da request.
     * 
     * Inicialmente, ela define dois parametros, jwt e username.
     * 
     * Então, é verificado se os cookies enviados na requisição contem o cookie de nome
     * accessToken. Caso ele exista, defina o jwt com esse valor.
     * 
     * Porém caso, o token ainda seja null, a verificação é terminada.
     * 
     * Caso não, o username é extraido do token jwt.
     * 
     * Caso a string de username não esteja vazia, e a autenticação securitycontextholder esteja,
     * um objeto é usuário carregado pelo username.
     * 
     * Após isso, se verifica se o token é válido, passando-se o jwt e o username.
     * 
     * Caso seja, um Contexto de segurança inicial é criado, e um objeto de autenticação
     * é passado para ele. E esse objeto é passado ao SecurityContextHolder.
     * 
     * Após isso, o filtro termina.
     * 
     *  
     */
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        String jwt = null;

        final String username;

        if (request.getCookies() != null){
            for (Cookie cookie : request.getCookies()){
                if(cookie.getName().equals("accessToken")){
                    jwt = cookie.getValue();
                }
            }
        }

        if (jwt == null) {
            filterChain.doFilter(request, response);
            return;
        }

        try{
            username = jwtService.extractUsername(jwt);
        } catch (Exception e){
            filterChain.doFilter(request, response);
            return;
        }

        Usuario usuario = usuarioService.loadUserByUsername(username);

        if(usuario == null){
            filterChain.doFilter(request, response);
            return;
        }

        if (StringUtils.isNotEmpty(username) && SecurityContextHolder.getContext().getAuthentication() == null) {
			if (jwtService.isTokenValid(jwt, usuario)) {
				SecurityContext context = SecurityContextHolder.createEmptyContext(); 
				UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
						usuario, null, usuario.getAuthorities());
				authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
				context.setAuthentication(authToken);
				SecurityContextHolder.setContext(context);
			} 
		}
		filterChain.doFilter(request, response);

    }
    
}
