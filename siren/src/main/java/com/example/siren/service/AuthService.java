package com.example.siren.service;

import com.example.siren.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
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
    private final JavaMailSender mailSender;
    private final MimeMessage mimeMessage = mailSender.createMimeMessage();

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

        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "UTF-8");
        try {
            helper.setFrom("1103bsj@naver.com");
            helper.setTo(email);
            helper.setSubject("AskMe 이메일 인증 번호");
            helper.setText(htmlContent, true);
        } catch (MessagingException e) {
            e.printStackTrace();
        }
        mailSender.send(mimeMessage);
        return code;
    }

}
