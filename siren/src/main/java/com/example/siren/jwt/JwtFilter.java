package com.example.siren.jwt;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
@RequiredArgsConstructor
public class JwtFilter extends OncePerRequestFilter{
    // 토큰을 요청 헤더의 Authorization 키에 담아서 전달
    public static final String AUTHORIZATION_HEADER = "Authorization";
    // 토큰 앞에 붙는 문자열
    public static final String BEARER_PREFIX = "Bearer ";
    // 토큰 생성, 토큰 검증을 수행하는 TokenProvider
    private final TokenProvider tokenProvider;

    private String resolveToken(HttpServletRequest request) { // 토큰 요청 헤더에서 꺼내오는 메서드
        String bearerToken = request.getHeader(AUTHORIZATION_HEADER); // 헤더에서 토큰 꺼내오기
        if(bearerToken != null && bearerToken.startsWith(BEARER_PREFIX)) { // 토큰이 존재하고, 토큰 앞에 붙는 문자열이 존재하면
            return bearerToken.substring(7);
        }
        return null;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        // JWT 토큰 추출
        String jwt = resolveToken(request);

        // 토큰 유효성 검증 뒤 ,
        if(StringUtils.hasText(jwt) && tokenProvider.validateToken(jwt)) {
            // JWT 로 부터 인증 객체를 가져와서
            Authentication authentication = tokenProvider.getAuthentication(jwt);
            // SecurityContextHolder 에 인증 객체를 설정하여
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }

        // 다음 필터로 요청 및 응답 객체를 전달.
        // 이 과정을 통해 Spring Security 의 다음 단계 필터들이 실행돼 최종적으로 요청을 처리.
        filterChain.doFilter(request, response);
    }
}
