package ru.javawebinar.topjava.web.handler;

import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;
import ru.javawebinar.topjava.web.dto.ErrorDTO;
import ru.javawebinar.topjava.web.json.JsonUtil;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

/**
 * Created by Dreval Viacheslav on 01.03.2016.
 */
public class MyUrlAuthenticationFailureHandler extends SimpleUrlAuthenticationFailureHandler {


    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception) throws IOException, ServletException {

        PrintWriter writer = response.getWriter();
        response.setStatus(HttpServletResponse.SC_FORBIDDEN);
        response.setContentType("application/json");
        response.setCharacterEncoding("utf-8");
        writer.write(JsonUtil.writeValue(new ErrorDTO(exception.getClass().getSimpleName())));
    }
}
