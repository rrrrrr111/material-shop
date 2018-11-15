package ru.rich.matshop.webapi.api.user.signup;

import ru.rich.matshop.webapi.api.common.rest.RestRequest;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Pattern;

public class SignupRequest extends RestRequest {

    @NotEmpty
    private String firstName;
    @NotEmpty
    @Pattern(regexp = "^[A-z0-9._%+-]+@[A-z0-9.-]+\\.[A-z]{2,6}$")
    private String email;
    @NotEmpty
    private String password;

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public String toString() {
        return "SignupRequest{" +
                "firstName='" + firstName + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                '}';
    }
}
