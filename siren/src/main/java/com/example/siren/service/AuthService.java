package com.example.siren.service;

import com.example.siren.dto.MemberRequestDTO;
import com.example.siren.dto.MemberResponseDTO;
import com.example.siren.dto.TokenDTO;
import com.example.siren.entity.Member;
import com.example.siren.entity.Token;
import com.example.siren.jwt.TokenProvider;
import com.example.siren.repository.MemberRepository;
import com.example.siren.repository.TokenRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import javax.transaction.Transactional;
import java.util.Random;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class AuthService {
    private final MemberRepository memberRepository;
    private final TokenRepository tokenRepository;
    private final JavaMailSender mailSender;
    private final AuthenticationManagerBuilder managerBuilder;
    private final PasswordEncoder passwordEncoder;
    private final TokenProvider tokenProvider;

    public MemberResponseDTO signup(MemberRequestDTO requestDTO){
        if(memberRepository.existsByEmail(requestDTO.getEmail())){
            throw new RuntimeException("이미 가입된 유저");
        }
        Member member = requestDTO.toEntity(passwordEncoder);
        return MemberResponseDTO.of(memberRepository.save(member));
        // save 는 저장 뒤 해당 저장된 객체를 반환한다.
    }

    public TokenDTO login(MemberRequestDTO requestDTO){
        // toAuthentication() 은 객체 변환, 이메일과 패스워드가 일치하는지 검증하는 메소드.
        UsernamePasswordAuthenticationToken authenticationToken = requestDTO.toAuthentication();
        
        // 검증을 거친 뒤 해당 변환된 객체 UsernamePasswordAuthenticationToken 을
        // managerBuilder.getObject().authenticate() 로 인증을 수행.
        // 인증이 성공할 때 Authentication 객체 반환
        Authentication authentication = managerBuilder.getObject().authenticate(authenticationToken);
        // 인증된 사용자 정보를 사용해 Token 생성 뒤 해당 객체를 반환해주면 끝
        TokenDTO token = tokenProvider.generateTokenDto(authentication);

        // DB에 사용자 email 의 RefreshToken 저장
        Token tokenEntity = Token.builder()
                .email(requestDTO.getEmail())
                .refreshToken(token.getRefreshToken())
                .build();
        tokenRepository.save(tokenEntity);

        return token;
    }

    public boolean existsEmail(String email){
        try{
            // 이미 있는 메일이면 true 반환
            return memberRepository.existsByEmail(email);
        }catch (Exception e){
            log.error("이메일 확인 중 에러 발생 :" + e);
            return true;
        }
    }

    public boolean existsNickname(String nickname){
        try{
            // 이미 있는 닉네임이면 true 반환
            return memberRepository.existsByEmail(nickname);
        }catch (Exception e){
            log.error("닉네임 확인 중 에러 발생 :" + e);
            return true;
        }
    }

    //메일 발송 뒤 해당 코드 반환
    public String sendMail(String email){
        Random random = new Random();
        int min = 111111;
        int max = 999999;
        String code = String.valueOf(random.nextInt(max - min + 1) + min);
        log.info("인증 번호 : " + code);

        String htmlContent = "<div style=\"text-align: center; display:flex; flex-direction:column; justify-content:center; text-align:center;\">"
                + "<p style=\"font-size:30px; display: block;\">Siren 인증번호 입니다.</p>"
                + "<p></p>"
                + "<p style=\"font-size:16px; display: block;\">아래의 인증 번호를 입력해주세요.</p>"
                + "<p></p>"
                + "<div style=\"font-size:20px; font-style:bold; width: 100%; height:50px; border: 1px solid #c6c6c6; display: block;\">" + code + "</div>"
                + "</div>";

        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "UTF-8");
        try {
            helper.setFrom("siren-_-@naver.com");
            helper.setTo(email);
            helper.setSubject("이메일 인증 번호");
            helper.setText(htmlContent, true);
        } catch (MessagingException e) {
            log.error("메일 전송 중 에러 발생 : " + e);
        }
        mailSender.send(mimeMessage);
        return code;
    }

}
