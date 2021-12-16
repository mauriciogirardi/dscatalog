package com.girardi.dscatalog.dto;

import com.girardi.dscatalog.services.validation.UserInsertValid;

@UserInsertValid
public class UserInsertDTO extends UserDTO {
    private static final long serialVersionUID = 1L;

    private String password;

    public UserInsertDTO() {
        super();
    }

    public static long getSerialversionuid() {
        return serialVersionUID;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
