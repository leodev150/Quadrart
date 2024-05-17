package com.quadrart.Services.JwtService;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

import javax.crypto.SecretKey;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Value;

import com.quadrart.Models.Usuario.Usuario;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

/*
 * Código onde há a implementação da interface JwtService.
 * Aqui há a definição da lógica das funções declaradas 
 * na interface JwtService.
 */

@Service
public class JwtServiceImpl implements JwtService {

    /*
     * Define um parametro chamado secretKeyEncoded.
     * A tag @Value pega um valor definido no arquivos properties
     * do projeto. A SecretKey é uma chave que será utilizada
     * para assinar o token JWT.
     */

    @Value("{${secret.signing.key}")
    private String secretKeyEncoded;

    /*
     * Extrai o subject do token JWT através
     * da função extractClaim.
     */

    @Override
    public String extractUsername(String jwt) {
        return extractClaim(jwt, Claims::getSubject);
    }

    /*
     * Gera um token, pegando um objeto usuario, e o valor de horas
     * que define a expiração.
     */

    @Override
    public String generateToken(Usuario usuario, long hours) {
        return generateToken(new HashMap(), usuario, hours);
    }

    /*
     * Define se um token é válido, primeiramente extraindo
     * o username de um token jwt, e verifica se o token
     * é igual ao usuario recebido na função.
     */

    @Override
    public boolean isTokenValid(String jwt, Usuario usuario) {
        final String username = extractUsername(jwt);
        return (username.equals(usuario.getUsername()) && !isTokenExpired(jwt));
    }

    /*
     * Função que efetivamente gerá o token, recebendo um Map, contendo claims
     * adicionais
     * que podem ser adicionadas ao token, o usuário, e o número de horas.
     * 
     * Inicialmente um objeto Jwts é construido, e que recebe as claims, a data de
     * expiração
     * do token, e o momento de sua emissão. O token é então assinado com a chave
     * privada,
     * compactado e retornado.
     */
    private String generateToken(Map<String, Object> extraClaims, Usuario usuario, long hours) {
        return Jwts
                .builder()
                .claims(extraClaims)
                .subject(usuario.getUsername())
                .expiration(new Date(System.currentTimeMillis() + (hours * 1000 * 60 * 60)))
                .issuedAt(new Date())
                .signWith(getVerifyKey(secretKeyEncoded))
                .compact();
    }

    /*
     * Retorna todas as claims que podem estar contidas no Token Jwt.
     * 
     * A função recebe o token Jwt, e a chave privada é necessária para
     * para extrair a informação do token.
     */
    private Claims extractAllClaims(String jwt) {
        return Jwts
                .parser()
                .verifyWith(getVerifyKey(secretKeyEncoded))
                .build()
                .parseSignedClaims(jwt)
                .getPayload();
    }

    /*
     * Retorna apenas uma claim, porém, de qualquer forma, a função extractClaims
     * é chamada.
     */

    private <T> T extractClaim(String jwt, Function<Claims, T> claimsResolvers) {
        final Claims claims = extractAllClaims(jwt);
        System.out.println(claims);
        return claimsResolvers.apply(claims);
    }

    /*
     * Extrai a data de expiração do token.
     */

    private Date extractExpiration(String jwt) {
        return extractClaim(jwt, Claims::getExpiration);
    }

    /*
     * Verifica se o token está expirado, e retorna true or false
     * baseado na resposta.
     */

    @Override
    public boolean isTokenExpired(String jwt) {
        return extractExpiration(jwt).before(new Date());
    }

    /*
     * Pega a string da secretKey, e faz o decode para
     * Base64.
     */

    private SecretKey getVerifyKey(String secretKeyEncoded) {
        byte[] decodedKey = Decoders.BASE64.decode(secretKeyEncoded);
        return Keys.hmacShaKeyFor(decodedKey);
    }

}
