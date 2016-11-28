package ru.javawebinar.topjava.web.dto;

/**
 * Created by Dreval Viacheslav on 27.11.2016.
 */
public class ErrorDTO {

    private String code;

    public ErrorDTO(String code) {
        this.code = code;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

}
