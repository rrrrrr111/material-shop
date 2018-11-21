package ru.rich.matshop.webapi.api.user.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import ru.rich.matshop.webapi.api.user.model.PersonValidation.WithAgreementChecked;
import ru.rich.matshop.webapi.api.user.model.PersonValidation.WithId;
import ru.rich.matshop.webapi.api.user.model.PersonValidation.WithLastName;
import ru.rich.matshop.webapi.api.user.model.PersonValidation.WithPassword;
import ru.rich.matshop.webapi.api.user.model.PersonValidation.WithPhone;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import java.util.Date;


public class Person {

    @NotNull(groups = {WithId.class})
    private Long id;
    @NotEmpty
    @Pattern(regexp = "^[A-z0-9._%+-]+@[A-z0-9.-]+\\.[A-z]{2,6}$")
    private String email;
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @NotEmpty(groups = {WithPassword.class})
    private String password;
    @NotEmpty(groups = {WithPhone.class})
    private String phone;
    @NotEmpty
    private String firstName;
    @NotEmpty(groups = {WithLastName.class})
    private String lastName;
    private Date dateOfBirth;
    private Sex sex;
    @NotNull
    @NotEmpty(groups = {WithAgreementChecked.class})
    private Boolean agreementChecked;
    private Date editDate;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public Date getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(Date dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public Sex getSex() {
        return sex;
    }

    public void setSex(Sex sex) {
        this.sex = sex;
    }

    public boolean isAgreementChecked() {
        return agreementChecked;
    }

    public void setAgreementChecked(boolean agreementChecked) {
        this.agreementChecked = agreementChecked;
    }

    public Date getEditDate() {
        return editDate;
    }

    public void setEditDate(Date editDate) {
        this.editDate = editDate;
    }

    @Override
    public String toString() {
        return "Person{" +
                "id=" + id +
                ", email='" + email + '\'' +
                ", password=[SECURED]" +
                ", phone='" + phone + '\'' +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", dateOfBirth=" + dateOfBirth +
                ", sex=" + sex +
                ", agreementChecked=" + agreementChecked +
                '}';
    }
}
